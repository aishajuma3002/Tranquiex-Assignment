import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, Shield, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password || !mobile) {
            setError('Please fill in all fields');
            return;
        }
        if (mobile.length !== 10 || !/^[6-9]\d{9}$/.test(mobile)) {
            setError('Invalid Indian mobile number (must be 10 digits, starting with 6-9)');
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, mobile }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            const data = await response.json();
            setShowOtpForm(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/users/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'OTP verification failed');
            }
            navigate('/login');
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-2xl">
                        {showOtpForm ? <Shield className="w-8 h-8 text-white" /> : <Sparkles className="w-8 h-8 text-white" />}
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                        {showOtpForm ? 'Verify Account' : 'Join Us Today'}
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {showOtpForm ? 'Enter the OTP sent to your email' : 'Create your account to get started'}
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${!showOtpForm ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-indigo-600/20 border-indigo-600 text-indigo-400'}`}>
                            {!showOtpForm ? <User className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                        </div>
                        <div className={`w-16 h-1 rounded-full transition-all duration-500 ${showOtpForm ? 'bg-indigo-600' : 'bg-white/20'}`}></div>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${showOtpForm ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white/10 border-white/20 text-gray-400'}`}>
                            <Shield className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm animate-shake">
                            <p className="text-red-300 text-center font-medium">{error}</p>
                        </div>
                    )}
                    
                    {!showOtpForm ? (
                        <form onSubmit={handleRegister} className="space-y-6">
                            {/* Name Field */}
                            <div className="group">
                                <label className="block text-gray-300 mb-2 font-medium">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300" />
                                    <input type="text"value={name} onChange={(e) => setName(e.target.value)}  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/10" placeholder="Enter your full name"  required/>
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="group">
                                <label className="block text-gray-300 mb-2 font-medium">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300" />
                                    <input type="email"value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"placeholder="Enter your email"required/>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="group">
                                <label className="block text-gray-300 mb-2 font-medium">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300" />
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/10" placeholder="Create a strong password"required minLength={6}/>
                                </div>
                                <p className="text-gray-500 text-sm mt-1">Minimum 6 characters</p>
                            </div>

                            {/* Mobile Field */}
                            <div className="group">
                                <label className="block text-gray-300 mb-2 font-medium">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-400 transition-colors duration-300" />
                                    <div className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">+91</div>
                                    <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)}className="w-full pl-20 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"placeholder="Enter 10-digit number"required  maxLength={10}pattern="[6-9]{1}[0-9]{9}"/>
                                </div>
                                <p className="text-gray-500 text-sm mt-1">Indian mobile number starting with 6-9</p>
                            </div>

                            {/* Submit Button */}
                            <button  type="submit" className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 flex items-center justify-center"disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            {/* OTP Success Message */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4 shadow-2xl">
                                    <Mail className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Check Your Email</h3>
                                <p className="text-gray-400">We've sent a 6-digit verification code to</p>
                                <p className="text-indigo-300 font-medium">{email}</p>
                            </div>

                            <form onSubmit={handleVerifyOtp} className="space-y-6">
                                {/* OTP Field */}
                                <div className="group">
                                    <label className="block text-gray-300 mb-2 font-medium">Verification Code</label>
                                    <div className="relative">
                                        <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-400 transition-colors duration-300" />
                                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 text-center text-2xl tracking-widest"
                                            placeholder="98765432221"required maxLength={6}/>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">Enter the 6-digit code from your email</p>
                                </div>

                                {/* Verify Button */}
                                <button type="submit" className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-green-500/50 flex items-center justify-center"disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="mr-2 w-5 h-5" />
                                            Verify & Complete
                                        </>
                                    )}
                                </button>
                                {/* Back Button */}
                                <button type="button" onClick={() => setShowOtpForm(false)}className="w-full border-2 border-white/20 text-white py-3 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm flex items-center justify-center" >
                                    <ArrowLeft className="mr-2 w-5 h-5" />
                                    Back to Registration
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Login Link */}
                    {!showOtpForm && (
                        <>
                            <div className="my-8 flex items-center">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                <span className="px-4 text-gray-400 text-sm font-medium">or</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-400 mb-4">Already have an account?</p>
                                <Link  to="/login"className="inline-flex items-center justify-center w-full border-2 border-white/20 text-white py-3 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm" >Sign In Instead
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-medium inline-flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Enhanced CSS */}
            <style>{`
                .bg-dots-pattern {
                    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.4) 2px, transparent 2px);
                    background-size: 50px 50px;
                    background-position: 0 0, 25px 25px;
                }
                
                .bg-dots-pattern::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(168, 85, 247, 0.3) 1.5px, transparent 1.5px);
                    background-size: 30px 30px;
                    background-position: 15px 15px;
                    animation: dotFloat 6s ease-in-out infinite;
                }

                @keyframes dotFloat {
                    0%, 100% { 
                        opacity: 0.3; 
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% { 
                        opacity: 0.6; 
                        transform: translateY(-5px) rotate(180deg);
                    }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }

                /* Enhanced input focus effects */
                .group:focus-within .group-focus-within\\:text-indigo-400 {
                    color: rgb(129 140 248);
                }

                .group:focus-within .group-focus-within\\:text-green-400 {
                    color: rgb(74 222 128);
                }

                /* Smooth backdrop blur */
                .backdrop-blur-xl {
                    backdrop-filter: blur(16px);
                }

                /* Custom scrollbar */
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

                /* Enhanced glow effects */
                .shadow-2xl {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(99, 102, 241, 0.1);
                }

                .hover\\:shadow-indigo-500\\/50:hover {
                    box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.5);
                }

                .hover\\:shadow-green-500\\/50:hover {
                    box-shadow: 0 25px 50px -12px rgba(34, 197, 94, 0.5);
                }
            `}</style>
        </div>
    );
}

export default Register;
