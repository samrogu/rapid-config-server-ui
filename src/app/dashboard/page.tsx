'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const [chartData, setChartData] = useState({
    organizationCount: 0,
    applicationCount: 0,
  });
  const [token, setToken] = useState<string | null>(null);

  // Obtener el token de localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Configuración de Axios con el token
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch data for the chart
  const fetchCounts = async () => {
    try {
      if (!token) return; // Verifica que el token esté disponible
      const response = await axiosInstance.get(apiRoutes.organizations.counts, axiosConfig);
      setChartData(response.data); // Actualiza los datos del gráfico
    } catch (error) {
      console.error('Error fetching chart data:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCounts(); // Llama a fetchCounts solo si el token está disponible
    }
  }, [token]);

  // Datos para el gráfico
  const data = {
    labels: ['Organizaciones', 'Aplicaciones'],
    datasets: [
      {
        label: 'Cantidad',
        data: [chartData.organizationCount, chartData.applicationCount],
        backgroundColor: ['#4CAF50', '#2196F3'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite que el gráfico se ajuste al contenedor
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cantidad de Organizaciones y Aplicaciones',
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h1>
      <p className="text-gray-600 mb-6">
        Welcome to the dashboard! Below is a graphical representation of the data for organizations and applications.
      </p>
      {/* Gráfico de barras */}
      <div className="mt-6" style={{ position: 'relative', height: '400px', width: '100%' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}