import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasToken = Boolean(request.cookies.get('access_token'));
  const userRole =
    request.cookies.get('user_role')?.value ||
    request.cookies.get('user-role')?.value;

  /* =================================================
     👑 SUPER_ADMIN → ABSOLUTELY NO RESTRICTIONS
     (after login or even without token)
  ================================================== */
  if (userRole === 'MASTER_ADMIN') {
    return NextResponse.next();
  }

  /* =========================
     🌍 PUBLIC ROUTES
  ========================== */
  if (
    pathname === '/' ||
    pathname === '/admin' ||          // ✅ landing page
    pathname.startsWith('/login') ||
    pathname.startsWith('/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  /* =========================
     🔐 DASHBOARD PROTECTION
     (NON–SUPER-ADMIN USERS)
  ========================== */
  if (pathname.startsWith('/dashboard')) {
    // Not logged in → send to /admin (NOT /login)
    if (!hasToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // ADMIN → access all dashboards
    if (userRole === 'ADMIN') {
      return NextResponse.next();
    }

    // Role-based dashboard access
    const match = pathname.match(/^\/dashboard\/([^\/]+)/);
    const dashboardType = match?.[1]?.toLowerCase();

    const roleDashboardMap: Record<string, string[]> = {
      consumer: ['consumer'],
      lender: ['lender'],
      broker: ['BROKERAGE'],
      sales: ['sales'],
      realtor: ['realtor'],
      institutional: ['institutional'],
      firm: ['firm'],
    };

    const allowed = roleDashboardMap[userRole?.toLowerCase() || ''];

    if (dashboardType && allowed?.includes(dashboardType)) {
      return NextResponse.next();
    }

    // Wrong dashboard → back to /admin
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};