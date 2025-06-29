require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const DataPoint = require('./models/DataPoint');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard'; // Supports .env or defaults to local

async function importData() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const dataPath = path.join(__dirname, 'jsondata.json');
    const rawData = fs.readFileSync(dataPath);
    const jsonData = JSON.parse(rawData);

    // Optional: Clear existing data
    await DataPoint.deleteMany({});
    console.log('Existing data cleared');

    await DataPoint.insertMany(jsonData);
    console.log('Data imported successfully');
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
}

importData(); 