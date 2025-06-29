import React, { useState, useEffect } from 'react';
import './App.css';
import FilterBar from './components/FilterBar';
import Charts from './components/Charts';
import HeroSection from './components/HeroSection';
import axios from 'axios';
import { Container } from '@mui/material';

function App() {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = Object.fromEntries(Object.entries(filters).filter(([k, v]) => v));
      const res = await axios.get('http://localhost:5000/api/data', { params });
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [filters]);

  return (
    <Container maxWidth="lg">
      <HeroSection />
      <FilterBar filters={filters} onFilterChange={setFilters} />
      {loading ? <p>Loading data...</p> : <Charts data={data} />}
    </Container>
  );
}

export default App;
