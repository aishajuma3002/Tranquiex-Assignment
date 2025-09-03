import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen overflow-hidden">
            {/* Background Dot Grid */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-dots-pattern opacity-30"></div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 z-10"></div>

            {/* Hero Section */}
            <section className="relative z-20 py-32 px-4">
                <div className="container mx-auto text-center">
                    <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl">
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-fade-in-up">
                            Task Manager
                        </h1>
                        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300 leading-relaxed animate-fade-in-up-delayed">
                            Transform your productivity with our intelligent task management platform. 
                            Organize, prioritize, and accomplish more than ever before.
                        </p>
                        <Link
                            to={isLoggedIn ? '/dashboard' : '/login'}
                            className="group inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/50 border border-indigo-400/50 animate-fade-in-up-delayed"
                        >
                            {isLoggedIn ? 'Go to Dashboard' : 'Start Your Journey'}
                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-20 py-20 px-4">
                <div className="container mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                        Powerful Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Smart Organization",
                                description: "AI-powered task categorization and priority suggestions that adapt to your workflow patterns.",
                                gradient: "from-blue-500 to-cyan-500"
                            },
                            {
                                title: "Real-time Collaboration",
                                description: "Seamless team coordination with instant updates, comments, and progress tracking.",
                                gradient: "from-purple-500 to-pink-500"
                            },
                            {
                                title: "Advanced Analytics",
                                description: "Detailed insights into your productivity patterns with beautiful charts and reports.",
                                gradient: "from-green-500 to-emerald-500"
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-stagger"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 flex items-center justify-center shadow-lg`}>
                                    <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative z-20 py-20 px-4">
                <div className="container mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent">
                        Loved by Thousands
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                text: "This platform revolutionized our team's productivity. The intuitive design and powerful features make task management a breeze.",
                                author: "Aman Gupta",
                                role: "Full Stack Developer",
                                rating: 5
                            },
                            {
                                text: "Finally, a task manager that actually understands how teams work. The collaboration features are game-changing.",
                                author: "Himanshu Gupta",
                                role: "Mern Stack Developer",
                                rating: 5
                            },
                            {
                                text: "Clean interface, powerful features, and excellent support. Everything we needed in one perfect package.",
                                author: "Anshu Kumari",
                                role: "Frontend Developer",
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="backdrop-blur-sm bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-stagger"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 text-lg mb-6 italic leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                                <div className="border-t border-white/10 pt-4">
                                    <p className="font-semibold text-white text-lg">{testimonial.author}</p>
                                    <p className="text-indigo-300">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-20 py-24 px-4">
                <div className="container mx-auto text-center">
                    <div className="backdrop-blur-sm bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl p-12 border border-white/20 shadow-2xl">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Ready to Transform Your Workflow?
                        </h2>
                        <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-300 leading-relaxed">
                            Join the productivity revolution. Start organizing your tasks like never before.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to={isLoggedIn ? '/dashboard' : '/register'}
                                className="group inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-indigo-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/50"
                            >
                                {isLoggedIn ? 'View Dashboard' : 'Get Started Free'}
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            {!isLoggedIn && (
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced CSS */}
            <style>{`
                .bg-dots-pattern {
                    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.4) 2px, transparent 2px);
                    background-size: 60px 60px;
                    background-position: 0 0, 30px 30px;
                    filter: blur(0.5px);
                }
                
                .bg-dots-pattern::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(168, 85, 247, 0.3) 1.5px, transparent 1.5px);
                    background-size: 40px 40px;
                    background-position: 20px 20px;
                    animation: dotPulse 4s ease-in-out infinite;
                }

                @keyframes dotPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-fade-in-up-delayed {
                    animation: fadeInUp 0.8s ease-out 0.3s forwards;
                    opacity: 0;
                }

                .animate-fade-in-stagger {
                    animation: fadeInStagger 0.8s ease-out forwards;
                    opacity: 0;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInStagger {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Enhanced scroll effects */
                .backdrop-blur-sm {
                    backdrop-filter: blur(8px);
                }

                /* Custom glow effects */
                .shadow-glow {
                    box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
                }

                .hover\\:shadow-glow-intense:hover {
                    box-shadow: 0 0 40px rgba(99, 102, 241, 0.5);
                }

                /* Improved button hover states */
                .group:hover .group-hover\\:animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                /* Background decoration */
                body {
                    background-attachment: fixed;
                }
            `}</style>
        </div>
    );
}

export default Home;
