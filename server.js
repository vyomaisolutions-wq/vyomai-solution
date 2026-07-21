/**
 * VyomAi Solutions Pvt Ltd - Professional Website Server
 * Node.js + Express application serving the company website
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); // Serve root files like logo

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/technologies', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'technologies.html'));
});

app.get('/industries', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'industries.html'));
});

app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'portfolio.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal server error');
});

// Start server
function startServer(port) {
  const server = app.listen(port, HOST, () => {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  VyomAi Solutions - Website Server');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`  🚀 Server running at: http://${HOST}:${port}`);
    console.log(`  📅 Started: ${new Date().toLocaleString()}`);
    console.log('═══════════════════════════════════════════════════════');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  process.exit(0);
});
