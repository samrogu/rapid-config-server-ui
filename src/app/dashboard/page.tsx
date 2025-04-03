'use client';

import Layout from '@/components/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome to the dashboard! Use the navigation menu to explore different sections.
        </p>
      </div>
    </Layout>
  );
}