'use client';

import Layout from '@/components/Layout';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  // Datos simulados para el gráfico
  const data = {
    labels: ['Organizaciones', 'Aplicaciones'],
    datasets: [
      {
        label: 'Cantidad',
        data: [10, 25], // Reemplaza estos valores con datos reales
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