// 'use client'
// import React, { useState } from 'react';
// import Image from 'next/image';
// import { Globe, Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     setError('');
//     console.log('Login submitted:', { email, password, rememberMe });

//     const setAuth = (role: string, token: string, defaultRedirectTo: string) => {
//       localStorage.setItem('adminToken', token);
//       localStorage.setItem('adminUser', JSON.stringify({ email, role }));

//       if (role === 'MASTER_ADMIN') {
//         localStorage.setItem('auth', 'super-admin');
//       } else {
//         localStorage.removeItem('auth');
//       }

//       document.cookie = `adminToken=${token}; path=/; max-age=86400; SameSite=Lax`;
//       document.cookie = `user_role=${role}; path=/; max-age=86400; SameSite=Lax`;

//       const redirectParam = typeof window !== 'undefined'
//         ? new URLSearchParams(window.location.search).get('redirect')
//         : null;
//       const redirectTo = redirectParam && redirectParam.startsWith('/') ? redirectParam : defaultRedirectTo;
//       router.push(redirectTo);
//     };

//     if (email === 'admin@gmail.com' && password === '12345678') {
//       setAuth('ADMIN', 'admin-token', '/dashboard');
//       return;
//     }

//     if (email === 'admin@axistrademarket.ai' && password === 'Temp123!') {
//       setAuth('MASTER_ADMIN', 'super-admin-token', '/super-admin');
//       return;
//     }

//     setError('Invalid credentials. Access denied.');
//   };

//   return (
//     <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <div className="relative">
//             <div className="absolute inset-0 bg-[#00D4D4]/20 blur-3xl text-center rounded-full"></div>
//             <Image
//               src="/axis-trade-market.jpeg"
//               alt="Axis Trade Market Logo"
//               width={80}
//               height={80}
//               className="relative rounded-full border border-gray-400/20"
//             />
//             <h1 className="font-bold tracking-tight">
//               <span className="text-white">AXIS</span>
//               <span className="text-[#00D4D4]">TRADE</span>
//             </h1>
//           </div>
//         </div>

//         {/* Login Card */}
//         <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold mb-2">Institutional Login</h1>
//             <p className="text-gray-400">Access your verified intelligence platform</p>
//           </div>

//           {error && (
//             <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
//               <div className="text-sm text-red-300">{error}</div>
//             </div>
//           )}

//           {/* Login Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Email Field */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
//                   <Mail className="w-5 h-5" />
//                 </div>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#00D4D4] focus:outline-none transition-colors"
//                   placeholder="your@company.com"
//                 />
//               </div>
//             </div>

//             {/* Password Field */}
//             <div>
//               <label className="block text-sm font-medium text-white mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
//                   <Lock className="w-5 h-5" />
//                 </div>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white focus:border-[#00D4D4] focus:outline-none transition-colors"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me & Forgot Password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4] focus:ring-[#00D4D4] focus:ring-offset-0"
//                 />
//                 <span className="text-sm text-gray-400">Remember me</span>
//               </label>
//               <a href="/forgot-password" className="text-sm text-[#00D4D4] hover:underline">
//                 Forgot password?
//               </a>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full px-6 py-3 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-all flex items-center justify-center gap-2"
//             >
//               <Lock className="w-5 h-5" />
//               Login to Platform
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-800"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-gray-900 text-gray-500">New to Axis Trade?</span>
//             </div>
//           </div>

//           {/* Request Access Link */}
//           <div className="text-center">
//             <a
//               href="/access"
//               className="text-[#00D4D4] hover:underline font-medium"
//             >
//               Request Institutional Access →
//             </a>
//           </div>
//         </div>

//         {/* Security Notice */}
//         <div className="mt-8 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
//           <div className="flex items-start gap-3">
//             <Shield className="w-5 h-5 text-[#00D4D4] flex-shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm text-gray-400">
//                 Your connection is secured with enterprise-grade encryption. 
//                 This platform is for authorized institutional users only.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Footer Links */}
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <a href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
//           <span className="mx-3">•</span>
//           <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
//           <span className="mx-3">•</span>
//           <a href="/support" className="hover:text-gray-300 transition-colors">Support</a>
//         </div>

//         {/* Brand */}
//         <div className="mt-8 text-center">
//           <h2 className="text-xl font-bold tracking-tight">
//             <span className="text-white">AXIS</span>
//             <span className="text-[#00D4D4]">TRADE</span>
//           </h2>
//           <p className="text-gray-500 text-xs font-mono mt-1 tracking-wider">MARKET AI</p>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { Globe, Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks/reducerHooks';
import { clearError, loginUser } from '@/utils/store/Slices/authSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(clearError());

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      const role = result.payload.user?.role;
      const redirectParam = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('redirect')
        : null;

      if (redirectParam && redirectParam.startsWith('/')) {
        router.push(redirectParam);
        return;
      }

      if (role === 'SUPER_ADMIN' || role === 'MASTER_ADMIN') {
        router.push('/super-admin');
        return;
      }
      if (role === 'ADMIN') {
        router.push('/dashboard');
        return;
      }
      if (role) {
        router.push(`/dashboard/${role.toLowerCase()}`);
        return;
      }
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#00D4D4]/20 blur-3xl text-center rounded-full"></div>
            <Image
              src="/axis-trade-market.jpeg"
              alt="Axis Trade Market Logo"
              width={80}
              height={80}
              className="relative rounded-full border border-gray-400/20"
            />
            <h1 className="font-bold tracking-tight">
              <span className="text-white">AXIS</span>
              <span className="text-[#00D4D4]">TRADE</span>
            </h1>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Institutional Login</h1>
            <p className="text-gray-400">Access your verified intelligence platform</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <div className="text-sm text-red-300">{error}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#00D4D4] focus:outline-none transition-colors"
                  placeholder="your@company.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white focus:border-[#00D4D4] focus:outline-none transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4] focus:ring-[#00D4D4] focus:ring-offset-0"
                />
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-[#00D4D4] hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              {loading ? 'Logging in...' : 'Login to Platform'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">New to Axis Trade?</span>
            </div>
          </div>

          {/* Request Access Link */}
          <div className="text-center">
            <a
              href="/access"
              className="text-[#00D4D4] hover:underline font-medium"
            >
              Request Institutional Access →
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#00D4D4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">
                Your connection is secured with enterprise-grade encryption. 
                This platform is for authorized institutional users only.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <a href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          <span className="mx-3">•</span>
          <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <span className="mx-3">•</span>
          <a href="/support" className="hover:text-gray-300 transition-colors">Support</a>
        </div>

        {/* Brand */}
        <div className="mt-8 text-center">
          <h2 className="text-xl font-bold tracking-tight">
            <span className="text-white">AXIS</span>
            <span className="text-[#00D4D4]">TRADE</span>
          </h2>
          <p className="text-gray-500 text-xs font-mono mt-1 tracking-wider">MARKET AI</p>
        </div>
      </div>
    </div>
  );
}