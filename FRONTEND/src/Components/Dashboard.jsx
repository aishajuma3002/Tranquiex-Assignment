import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, Calendar, Clock, CheckCircle, Circle, Edit3,  Trash2,  Filter, AlertTriangle, User } from 'lucide-react';
import CreateTask from './CreateTask';

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [editingTask, setEditingTask] = useState(null);
    const [error, setError] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        if (!user || !token) {
            navigate('/login');
            return;
        }
        fetchTasks();
    }, [navigate, user, token]);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch tasks');
            }
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddOrUpdateTask = async (taskData) => {
        try {
            const method = editingTask ? 'PUT' : 'POST';
            const url = editingTask ? `http://localhost:5000/api/tasks/${editingTask._id}` : 'http://localhost:5000/api/tasks';
            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save task');
            }
            setEditingTask(null);
            setIsFormVisible(false);
            fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete task');
            }
            fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleToggleStatus = async (id, currentStatus, deadline) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        try {
            const response = await fetch(`http://localhost:5000/api/tasks/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus, deadline }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update status');
            }
            fetchTasks();
        } catch (err) {
            setError(err.message);
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.status === filter;
    });

    const isOverdue = (deadline, status) => {
        return new Date(deadline) < new Date() && status === 'pending';
    };

    const getTaskStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(task => task.status === 'completed').length;
        const pending = tasks.filter(task => task.status === 'pending').length;
        const overdue = tasks.filter(task => isOverdue(task.deadline, task.status)).length;
        
        return { total, completed, pending, overdue };
    };

    const stats = getTaskStats();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                                    Welcome back, {user.name}
                                </h1>
                                <p className="text-gray-600 text-xs sm:text-sm lg:text-base">{user.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                navigate('/login');
                            }} className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base" >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">Total</p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-800">{stats.total}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">Done</p>
                                <p className="text-lg sm:text-2xl font-bold text-green-600">{stats.completed}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">Pending</p>
                                <p className="text-lg sm:text-2xl font-bold text-orange-600">{stats.pending}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-600 font-medium">Overdue</p>
                                <p className="text-lg sm:text-2xl font-bold text-red-600">{stats.overdue}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {/* Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <button
                            onClick={() => {
                                setEditingTask(null);
                                setIsFormVisible(true);
                            }}  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md font-medium" >
                            <Plus className="w-5 h-5" />
                            <span>Add New Task</span>
                        </button>
                        
                        <div className="w-full sm:w-auto flex items-center space-x-2 bg-gray-50 rounded-xl p-1">
                            <Filter className="w-4 h-4 text-gray-500 ml-3" />
                            <select value={filter}  onChange={(e) => setFilter(e.target.value)}  className="bg-transparent border-none outline-none text-gray-700 font-medium pr-4 py-2 w-full sm:w-auto" >
                                <option value="all">All Tasks</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Create Task Form */}
                {isFormVisible && (
                    <div className="mb-6 sm:mb-8">
                        <CreateTask onSubmit={handleAddOrUpdateTask} initialData={editingTask}  onCancel={() => setIsFormVisible(false)} />
                    </div>
                )}

                {/* Tasks Grid */}
                {filteredTasks.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No tasks found</h3>
                        <p className="text-gray-500 text-sm sm:text-base">
                            {filter === 'all'  ? "You haven't created any tasks yet. Click 'Add New Task' to get started!" : `No ${filter} tasks found. Try changing your filter.` }
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredTasks.map(task => (
                            <div   key={task._id} className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${ isOverdue(task.deadline, task.status) ? 'border-red-200 bg-red-50' : task.status === 'completed' ? 'border-green-200 bg-green-50' : 'border-gray-100' }`} >
                                <div className="p-4 sm:p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight pr-2">
                                            {task.title}
                                        </h3>
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                            task.status === 'completed' ? 'bg-green-500' : isOverdue(task.deadline, task.status) ? 'bg-red-500' : 'bg-orange-500' }`} />
                                    </div>
                                    
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                        {task.description}
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm mb-4">
                                        <div className="flex items-center space-x-1 text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>{new Date(task.deadline).toLocaleDateString()}</span>
                                        </div>
                                        {isOverdue(task.deadline, task.status) && (
                                            <div className="flex items-center space-x-1 text-red-600">
                                                <AlertTriangle className="w-4 h-4" />
                                                <span className="font-medium">Overdue</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 sm:mb-6 ${ task.status === 'completed'  ? 'bg-green-100 text-green-800'  : 'bg-orange-100 text-orange-800' }`}>
                                        {task.status === 'completed' ? (
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                        ) : (
                                            <Circle className="w-3 h-3 mr-1" />
                                        )}
                                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        <button onClick={() => {  setEditingTask(task);  setIsFormVisible(true); }}
                                            className="flex-1 flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium" >
                                            <Edit3 className="w-4 h-4" />
                                            <span className="hidden sm:inline">Edit</span>
                                        </button>
                                        <button  onClick={() => handleToggleStatus(task._id, task.status, task.deadline)} className="flex-1 flex items-center justify-center space-x-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium" > {task.status === 'completed' ? <Circle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />} <span className="hidden sm:inline">{task.status === 'completed' ? 'Undo' : 'Done'}</span>
                                        </button>
                                        <button onClick={() => handleDeleteTask(task._id)}  className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;