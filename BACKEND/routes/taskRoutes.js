const express = require('express');
const auth = require('../middleware/auth');
const { createTask, getTasks, updateTask, deleteTask, toggleStatus } = require('../controllers/taskController');

const router = express.Router();

router.use(auth);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', toggleStatus);

module.exports = router;