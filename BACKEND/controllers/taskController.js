const Task = require('../models/Task');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const createTask = async (req, res) => {
    const { title, description, deadline } = req.body;
    const userId = req.user.id;

    try {
        if (!title || !description || !deadline) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const task = new Task({ title, description, deadline, user: userId });
        await task.save();

        const user = await User.findById(userId);
        await sendEmail(user.email, 'New Task Created', `Task "${title}" has been created with deadline ${new Date(deadline).toLocaleDateString()}.`);

        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTasks = async (req, res) => {
    const userId = req.user.id;
    try {
        const tasks = await Task.find({ user: userId });
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, deadline } = req.body;
    const userId = req.user.id;

    try {
        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.deadline = deadline || task.deadline;
        await task.save();

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await task.deleteOne();
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const toggleStatus = async (req, res) => {
    const { id } = req.params;
    const { status, deadline } = req.body;
    const userId = req.user.id;

    try {
        let task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        task.status = status;
        await task.save();

        const user = await User.findById(userId);
        let emailSubject = 'Task Status Updated';
        let emailText = `Task "${task.title}" status updated to ${status}.`;
        if (status === 'completed') {
            const isLate = new Date(deadline) < new Date();
            emailText += isLate ? ' (Completed late)' : ' (Completed on time)';
        }

        await sendEmail(user.email, emailSubject, emailText);

        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, toggleStatus };