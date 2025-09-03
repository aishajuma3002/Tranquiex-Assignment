import React, { useState, useEffect } from 'react';

function CreateTask({ onSubmit, initialData, onCancel }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setDeadline(new Date(initialData.deadline).toISOString().split('T')[0]);
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await onSubmit({ title, description, deadline });
            if (!initialData) {
                setTitle('');
                setDescription('');
                setDeadline('');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative overflow-hidden">
            {/* Particle Animation Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <div key={i} className={`absolute w-1 h-1 rounded-full opacity-40 animate-pulse ${
                            i % 4 === 0 ? 'bg-blue-400' : i % 4 === 1 ? 'bg-purple-400' : i % 4 === 2 ? 'bg-cyan-400' : 'bg-indigo-400' }`}
                        style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${3 + Math.random() * 2}s` }} /> ))}
                
                {/* Moving particles */}
                {[...Array(8)].map((_, i) => (
                    <div key={`moving-${i}`} className={`absolute w-0.5 h-0.5 rounded-full opacity-30 ${ i % 3 === 0 ? 'bg-blue-300' :  i % 3 === 1 ? 'bg-purple-300' : 'bg-cyan-300'  }`}
                        style={{  top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`, animationDelay: `${Math.random() * 2}s` }} /> ))}
            </div>

            {/* CSS for floating animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-10px) translateX(5px); }
                    50% { transform: translateY(-5px) translateX(-5px); }
                    75% { transform: translateY(-15px) translateX(3px); }
                }
            `}</style>

            {/* Main Form Container */}
            <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-blue-500/10 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-700/50">
                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full shadow-lg"></div>
                        {initialData ? 'Edit Task' : 'Create New Task'}
                    </h2>
                    <p className="text-gray-300 mt-2 text-xs sm:text-sm">
                        {initialData ? 'Update your task details below' : 'Fill in the details to create a new task'}
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                            Task Title
                        </label>
                        <input  type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter a descriptive task title" className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 rounded-xl bg-gray-800/50   text-white placeholder-gray-400 backdrop-blur-sm text-sm sm:text-base  focus:bg-gray-800/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-200 hover:border-gray-500 hover:bg-gray-800/60" required />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                            Description
                        </label>
                        <textarea  value={description} onChange={(e) => setDescription(e.target.value)}  placeholder="Describe what needs to be done..." rows={3} className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 rounded-xl bg-gray-800/50  text-white placeholder-gray-400 backdrop-blur-sm text-sm sm:text-base  focus:bg-gray-800/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20  transition-all duration-200 hover:border-gray-500 hover:bg-gray-800/60 resize-none" required  />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-200 mb-2">
                            Deadline
                        </label>
                        <input type="date"value={deadline} onChange={(e) => setDeadline(e.target.value)}className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-600 rounded-xl bg-gray-800/50 text-white backdrop-blur-sm text-sm sm:text-base focus:bg-gray-800/70 focus:border-blue-400 focus:ring-4 focus:ring-blue-400/20 transition-all duration-200 hover:border-gray-500 hover:bg-gray-800/60"required/>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                        <button  type="submit"  disabled={isSubmitting}className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-200  hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-400/30 active:transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none disabled:hover:translate-y-0 text-sm sm:text-base">
                            <span className="flex items-center justify-center gap-2">
                                {isSubmitting && (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {isSubmitting ? 'Saving...' : (initialData ? 'Update Task' : 'Create Task')}
                            </span>
                        </button>
                        
                        <button type="button"  onClick={onCancel} className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-600 text-gray-300 rounded-xl  font-semibold transition-all duration-200 hover:border-gray-500  hover:bg-gray-800/30 hover:-translate-y-0.5 focus:ring-4 focus:ring-gray-500/30 active:transform active:scale-95 backdrop-blur-sm text-sm sm:text-base">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;