require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DataPoint = require('./models/DataPoint');


const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Helper: Build filter object from query params
function buildFilters(query) {
  const filters = {};
  if (query.end_year) filters.end_year = query.end_year;
  if (query.topic) filters.topic = query.topic;
  if (query.sector) filters.sector = query.sector;
  if (query.region) filters.region = query.region;
  if (query.pestle) filters.pestle = query.pestle;
  if (query.source) filters.source = query.source;
  if (query.swot) filters.swot = query.swot;
  if (query.country) filters.country = query.country;
  if (query.city) filters.city = query.city;
  // Add more filters as needed
  return filters;
}

// GET /api/data - Get data with filters
app.get('/api/data', async (req, res) => {
  try {
    const filters = buildFilters(req.query);
    const data = await DataPoint.find(filters).limit(1000); // Limit for performance
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/filters/:field - Get unique values for a field
app.get('/api/filters/:field', async (req, res) => {
  try {
    const field = req.params.field;
    const values = await DataPoint.distinct(field);
    res.json(values.filter(v => v !== undefined && v !== null && v !== ''));
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 