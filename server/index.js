require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const reposRoutes = require('./routes/repos');
const jobQueue = require('./services/jobQueue');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../project')));

// API routes
app.use('/api/repos', reposRoutes);

// Job status endpoint
app.get('/api/jobs/:id', (req, res) => {
  const job = jobQueue.getJob(req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/ASHVAA%20Editorial.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`ASHVAA API running on http://localhost:${PORT}`);
  console.log(`Landing Page: http://localhost:${PORT}/ASHVAA%20Editorial.html`);
  console.log(`Login entry point: http://localhost:${PORT}/login.html`);
});
