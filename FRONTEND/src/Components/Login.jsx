import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-pink-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
            
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-2xl">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Sign in to continue your journey
                    </p>
                </div>

                {/* Login Form */}
                <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm">
                            <p className="text-red-300 text-center font-medium">{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div className="group">
                            <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <label className="block text-gray-300 mb-2 font-medium">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                                    placeholder="Enter your password"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors duration-300 p-1"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link 
                                to="/forgot-password" 
                                className="text-indigo-300 hover:text-indigo-200 text-sm font-medium transition-colors duration-300"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        <span className="px-4 text-gray-400 text-sm font-medium">or</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-gray-400 mb-4">Don't have an account?</p>
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center w-full border-2 border-white/20 text-white py-3 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link 
                        to="/" 
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium inline-flex items-center"
                    >
                        <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Enhanced CSS */}
            <style>{`
                .bg-dots-pattern {
                    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.3) 2px, transparent 2px);
                    background-size: 50px 50px;
                    background-position: 0 0, 25px 25px;
                }
                
                .bg-dots-pattern::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(168, 85, 247, 0.2) 1.5px, transparent 1.5px);
                    background-size: 30px 30px;
                    background-position: 15px 15px;
                    animation: dotFloat 6s ease-in-out infinite;
                }

                @keyframes dotFloat {
                    0%, 100% { 
                        opacity: 0.2; 
                        transform: translateY(0px);
                    }
                    50% { 
                        opacity: 0.4; 
                        transform: translateY(-10px);
                    }
                }

                /* Enhanced input focus effects */
                .group:focus-within .group-focus-within\\:text-indigo-400 {
                    color: rgb(129 140 248);
                }

                /* Smooth backdrop blur */
                .backdrop-blur-xl {
                    backdrop-filter: blur(16px);
                }

                /* Custom scrollbar for better aesthetics */
                ::-webkit-scrollbar {
                    width: 8px;
                }

                ::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.5);
                    border-radius: 4px;
                }

                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.7);
                }
            `}</style>
        </div>
    );
}

export default Login;
