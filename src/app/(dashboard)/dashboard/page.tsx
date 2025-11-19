'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import { useLayout } from '@/contexts/LayoutContext';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
    const [chartData, setChartData] = useState({
        organizationCount: 0,
        applicationCount: 0,
    });

    const { setLayoutInfo } = useLayout();

    useEffect(() => {
        setLayoutInfo("Analítica", undefined);
    }, [setLayoutInfo]);

    // Fetch data for the chart
    const fetchCounts = async () => {
        try {
            const response = await axiosInstance.get(apiRoutes.organizations.counts);
            setChartData(response.data);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    useEffect(() => {
        fetchCounts();
    }, []);

    // Configuración actualizada para el tema oscuro
    const data = {
        labels: ['Organizations', 'Applications'],
        datasets: [
            {
                label: 'Total Count',
                data: [chartData.organizationCount, chartData.applicationCount],
                backgroundColor: ['rgba(59, 130, 246, 0.5)', 'rgba(16, 185, 129, 0.5)'],
                borderColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#E5E7EB',
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: 'Organization & Application Overview',
                color: '#F3F4F6',
                font: {
                    size: 16,
                    weight: 'bold'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(107, 114, 128, 0.1)',
                },
                ticks: {
                    color: '#9CA3AF',
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#9CA3AF',
                }
            }
        }
    };

    return (
        <>
            {/* Header Section */}
            <div className="mb-8">
                <p className="text-gray-400">
                    Welcome to your dashboard. Here&apos;s an overview of your system&apos;s current status.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Organizations</p>
                            <h2 className="text-3xl font-bold text-blue-400">{chartData.organizationCount}</h2>
                        </div>
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-400">Total Applications</p>
                            <h2 className="text-3xl font-bold text-green-400">{chartData.applicationCount}</h2>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="h-[400px]">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    <Bar data={data} options={options as any} />
                </div>
            </div>
        </>
    );
}
