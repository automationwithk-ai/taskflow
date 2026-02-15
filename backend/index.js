const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory task store
let tasks = [
  { id: 1, title: 'Setup CI/CD pipeline', status: 'done', priority: 'high', assignee: 'kshitij' },
  { id: 2, title: 'Write unit tests', status: 'in-progress', priority: 'medium', assignee: 'dev1' },
  { id: 3, title: 'Fix memory leak in auth service', status: 'open', priority: 'critical', assignee: 'dev2' },
  { id: 4, title: 'Update dependencies', status: 'open', priority: 'low', assignee: 'kshitij' },
  { id: 5, title: 'Deploy to production', status: 'open', priority: 'high', assignee: 'dev1' },
];

let nextId = 6;

// BUG #1: No input validation - allows empty titles
app.post('/api/tasks', (req, res) => {
  const { title, priority, assignee } = req.body;
  // Missing: if (!title) return res.status(400).json({ error: 'Title required' });
  
  const task = {
    id: nextId++,
    title,
    status: 'open',
    priority: priority || 'medium',
    assignee: assignee || 'unassigned',
    createdAt: new Date().toISOString()
  };
  
  tasks.push(task);
  res.status(201).json(task);
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const { status, priority } = req.query;
  let filtered = tasks;
  
  if (status) filtered = filtered.filter(t => t.status === status);
  if (priority) filtered = filtered.filter(t => t.priority === priority);
  
  res.json(filtered);
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  // BUG #2: parseInt not used - string comparison fails
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  //const task = tasks.find(t => t.id === req.params.id); // should be parseInt(req.params.id)
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// UPDATE task
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  
  tasks[index] = { ...tasks[index], ...req.body, id };
  res.json(tasks[index]);
});

// BUG #3: DELETE doesn't verify task exists before deleting
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  // Missing: check if task existed, return 404 if not
  res.json({ message: 'Deleted' }); // always returns success even if task didn't exist
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    total: tasks.length,
    open: tasks.filter(t => t.status === 'open').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    critical: tasks.filter(t => t.priority === 'critical').length,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
