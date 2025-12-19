'use client'
import React, { useEffect, useState } from 'react';
import { Crown, Lock, Mail, Eye, EyeOff, Shield, Zap, Globe, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { log } from 'node:console';

export default function Admin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const data = { email, password }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        setTimeout(() => {
            const setAuth = (role: string, token: string, redirectTo: string) => {
                localStorage.setItem('adminToken', token);
                localStorage.setItem('adminUser', JSON.stringify({ email, role }));

                // Used by existing /super-admin route guard
                if (role === 'MASTER_ADMIN') {
                    localStorage.setItem('auth', 'super-admin');
                } else {
                    localStorage.removeItem('auth');
                }

                // Used by Next.js middleware (server side)
                document.cookie = `adminToken=${token}; path=/; max-age=86400; SameSite=Lax`;
                document.cookie = `user_role=${role}; path=/; max-age=86400; SameSite=Lax`;

                router.push(redirectTo);
            };

            // Super Admin (existing dummy)
            if (email === 'admin@axistrademarket.ai' && password === 'Temp123!') {
                setAuth('MASTER_ADMIN', 'super-admin-token', '/super-admin');
            }
            // Admin (requested dummy)
            else if (email === 'admin@gmail.com' && password === '12345678') {
                setAuth('ADMIN', 'admin-token', '/dashboard');
            }
            else {
                setError('Invalid credentials. Access denied.');
            }

            setIsLoading(false);
        }, 1500);

    };

    const login = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/auth/login",
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const { access_token, user } = res.data;

            console.log(access_token);
            
            localStorage.setItem("accessToken", access_token);

            
            localStorage.setItem("user", JSON.stringify(user));

            console.log("Token saved:", access_token);
            return res.data;
        } catch (error: any) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    login();


    return (

        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#00D4D4]/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, rgba(0, 212, 212, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 212, 212, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>

            {/* Content */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

                    {/* Left Side - Branding */}
                    <div className="hidden lg:block space-y-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#00D4D4]/30 blur-2xl rounded-full"></div>
                                <div className="relative w-16 h-16 bg-gradient-to-br from-[#00D4D4] to-[#00A8A8] rounded-2xl flex items-center justify-center">
                                    <Crown className="w-8 h-8 text-black" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    <span className="text-white">AXIS</span>
                                    <span className="text-[#00D4D4]">TRADE</span>
                                </h1>
                                <p className="text-gray-500 text-sm font-mono tracking-wider">MARKET AI</p>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D4D4]/10 border border-[#00D4D4]/30 rounded-full">
                                <Shield className="w-4 h-4 text-[#00D4D4]" />
                                <span className="text-sm font-medium text-[#00D4D4]">Super Admin Access</span>
                            </div>

                            <h2 className="text-5xl font-bold leading-tight">
                                Master Control
                                <span className="block mt-2 bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] bg-clip-text text-transparent">
                                    Panel Login
                                </span>
                            </h2>

                            <p className="text-xl text-gray-400 leading-relaxed">
                                Enterprise-grade administrative access with full system control and monitoring capabilities.
                            </p>
                        </div>

                        {/* Features */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#00D4D4]/10 rounded-lg flex items-center justify-center border border-[#00D4D4]/30">
                                    <Zap className="w-5 h-5 text-[#00D4D4]" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Real-Time Monitoring</div>
                                    <div className="text-sm text-gray-500">Track all system activities instantly</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center border border-purple-500/30">
                                    <Globe className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Global Dashboard Access</div>
                                    <div className="text-sm text-gray-500">Control all 6 enterprise dashboards</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/30">
                                    <Shield className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="font-semibold text-white">Enterprise Security</div>
                                    <div className="text-sm text-gray-500">Military-grade encryption & compliance</div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-6 pt-6 border-t border-gray-800">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">99.99%</div>
                                <div className="text-xs text-gray-500">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">SOC 2</div>
                                <div className="text-xs text-gray-500">Certified</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">256-bit</div>
                                <div className="text-xs text-gray-500">Encryption</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full">
                        <div className="relative">
                            {/* Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4D4]/20 to-purple-500/20 rounded-3xl blur-xl"></div>

                            {/* Card */}
                            <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-8 shadow-2xl">

                                {/* Mobile Logo */}
                                <div className="lg:hidden flex justify-center mb-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#00D4D4]/20 blur-2xl rounded-full"></div>
                                        <div className="relative w-16 h-16 bg-gradient-to-br from-[#00D4D4] to-[#00A8A8] rounded-2xl flex items-center justify-center">
                                            <Crown className="w-8 h-8 text-black" />
                                        </div>
                                    </div>
                                </div>

                                {/* Header */}
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D4D4]/10 border border-[#00D4D4]/30 rounded-full mb-4">
                                        <Crown className="w-4 h-4 text-[#00d4d4d3]" />
                                        <span className="text-sm font-medium text-[#00D4D4]">Admin Portal</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                                    <p className="text-gray-400">Enter your credentials to access the control panel</p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-red-300">{error}</div>
                                    </div>
                                )}

                                {/* Login Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Admin Email
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#00D4D4] transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:border-[#00D4D4] focus:outline-none focus:ring-2 focus:ring-[#00D4D4]/20 transition-all"
                                                placeholder="admin@axistrademarket.ai"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-2">
                                            Password
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-[#00D4D4] transition-colors">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-500 focus:border-[#00D4D4] focus:outline-none focus:ring-2 focus:ring-[#00D4D4]/20 transition-all"
                                                placeholder="Enter your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4] focus:ring-[#00D4D4] focus:ring-offset-0"
                                            />
                                            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                                Remember me
                                            </span>
                                        </label>
                                        <a href="/admin/forgot-password" className="text-sm text-[#00D4D4] hover:text-[#00BCC9] transition-colors">
                                            Forgot password?
                                        </a>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full relative group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] rounded-lg"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00BCC9] to-[#008E8E] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative px-6 py-3 flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                                    <span className="font-bold text-black">Authenticating...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="w-5 h-5 text-black" />
                                                    <span className="font-bold text-black">Access Control Panel</span>
                                                    <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                    </button>
                                </form>

                                {/* Security Notice */}
                                <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-[#00D4D4] flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-gray-400">
                                            This is a restricted area. All login attempts are monitored and logged.
                                            Unauthorized access is strictly prohibited.
                                        </div>
                                    </div>
                                </div>

                                {/* Demo Credentials (Remove in production) */}
                                {/* <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-xs font-semibold text-blue-400 mb-2">Demo Credentials:</div>
                  <div className="text-xs text-blue-300 font-mono space-y-1">
                    <div>Email: admin@axistrademarket.ai</div>
                    <div>Password: admin123</div>
                  </div>
                </div> */}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center text-sm text-gray-500">
                            <a href="/terms" className="hover:text-gray-300 transition-colors">Terms</a>
                            <span className="mx-3">•</span>
                            <a href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</a>
                            <span className="mx-3">•</span>
                            <a href="/support" className="hover:text-gray-300 transition-colors">Support</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-[#00D4D4]/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-700"></div>
        </div>
    );
}