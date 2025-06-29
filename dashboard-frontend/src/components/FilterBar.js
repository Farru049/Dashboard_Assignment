import React, { useEffect, useState } from 'react';
import axios from 'axios';

const filterFields = [
  { key: 'end_year', label: 'End Year' },
  { key: 'topic', label: 'Topic' },
  { key: 'sector', label: 'Sector' },
  { key: 'region', label: 'Region' },
  { key: 'pestle', label: 'PEST' },
  { key: 'source', label: 'Source' },
  { key: 'country', label: 'Country' },
  { key: 'city', label: 'City' },
  // Add more filters as needed
];

const FilterBar = ({ filters, onFilterChange }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    filterFields.forEach(async (field) => {
      const res = await axios.get(`http://localhost:5000/api/filters/${field.key}`);
      setOptions((prev) => ({ ...prev, [field.key]: res.data.sort() }));
    });
  }, []);

  const handleChange = (e) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', background: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px #e0e7ef' }}>
      {filterFields.map((field) => (
        <select
          key={field.key}
          name={field.key}
          value={filters[field.key] || ''}
          onChange={handleChange}
          style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f7faff', fontSize: '1rem', minWidth: '140px' }}
        >
          <option value=''>All {field.label}</option>
          {options[field.key] && options[field.key].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default FilterBar; 