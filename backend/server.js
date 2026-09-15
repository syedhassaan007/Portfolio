require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { verifyConnection } = require('./config/db');
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// --- Core middleware ---
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json({ limit: '2mb' }));

// Serves uploaded assets (avatar, resume PDF, project images, badges).
// Nothing sensitive lives here — just static portfolio media.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API routes ---
app.use('/api', apiRoutes);

// --- 404 + error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[server] API running on http://localhost:${PORT}`);
  verifyConnection();
});
