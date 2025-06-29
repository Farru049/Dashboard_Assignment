import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Grid, Card, CardContent, CardHeader } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function aggregateByField(data, field) {
  const result = {};
  data.forEach(item => {
    const key = item[field] || 'Unknown';
    result[key] = (result[key] || 0) + 1;
  });
  return result;
}

function sumByField(data, groupField, sumField) {
  const result = {};
  data.forEach(item => {
    const key = item[groupField] || 'Unknown';
    result[key] = (result[key] || 0) + (item[sumField] || 0);
  });
  return result;
}

const chartCardStyle = { height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 6, borderRadius: 3 };

const Charts = ({ data }) => {
  const intensityByYear = sumByField(data, 'end_year', 'intensity');
  const likelihoodByCountry = sumByField(data, 'country', 'likelihood');
  const relevanceByTopic = sumByField(data, 'topic', 'relevance');
  const countByRegion = aggregateByField(data, 'region');
  const countByCity = aggregateByField(data, 'city');

  if (!data || data.length === 0) {
    return <p style={{ textAlign: 'center', width: '100%' }}>No data available for the selected filters.</p>;
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={chartCardStyle}>
          <CardHeader title="Intensity by End Year"/>
          <CardContent>
            <Bar
              data={{
                labels: Object.keys(intensityByYear),
                datasets: [{
                  label: 'Total Intensity',
                  data: Object.values(intensityByYear),
                  backgroundColor: 'rgba(75,192,192,0.6)'
                }]
              }}
              options={{ plugins: { legend: { display: false } } }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={chartCardStyle}>
          <CardHeader title="Likelihood by Country"/>
          <CardContent>
            <Pie
              data={{
                labels: Object.keys(likelihoodByCountry),
                datasets: [{
                  label: 'Likelihood',
                  data: Object.values(likelihoodByCountry),
                  backgroundColor: [
                    'rgba(255,99,132,0.6)',
                    'rgba(54,162,235,0.6)',
                    'rgba(255,206,86,0.6)',
                    'rgba(75,192,192,0.6)',
                    'rgba(153,102,255,0.6)',
                    'rgba(255,159,64,0.6)'
                  ]
                }]
              }}
              options={{ plugins: { legend: { position: 'bottom' } } }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={chartCardStyle}>
          <CardHeader title="Relevance by Topic"/>
          <CardContent>
            <Bar
              data={{
                labels: Object.keys(relevanceByTopic),
                datasets: [{
                  label: 'Relevance',
                  data: Object.values(relevanceByTopic),
                  backgroundColor: 'rgba(153,102,255,0.6)'
                }]
              }}
              options={{ plugins: { legend: { display: false } } }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={chartCardStyle}>
          <CardHeader title="Data Count by Region"/>
          <CardContent>
            <Pie
              data={{
                labels: Object.keys(countByRegion),
                datasets: [{
                  label: 'Count',
                  data: Object.values(countByRegion),
                  backgroundColor: [
                    'rgba(255,99,132,0.6)',
                    'rgba(54,162,235,0.6)',
                    'rgba(255,206,86,0.6)',
                    'rgba(75,192,192,0.6)',
                    'rgba(153,102,255,0.6)',
                    'rgba(255,159,64,0.6)'
                  ]
                }]
              }}
              options={{ plugins: { legend: { position: 'bottom' } } }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={chartCardStyle}>
          <CardHeader title="Data Count by City (Top 10)"/>
          <CardContent>
            <Bar
              data={{
                labels: Object.keys(countByCity).slice(0, 10),
                datasets: [{
                  label: 'Count',
                  data: Object.values(countByCity).slice(0, 10),
                  backgroundColor: 'rgba(255,206,86,0.6)'
                }]
              }}
              options={{ plugins: { legend: { display: false } } }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
