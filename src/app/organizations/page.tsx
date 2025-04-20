'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosConfig'; // Importa la configuración de Axios
import apiRoutes from '@/apiRoutes';
import { useRouter } from 'next/navigation';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newOrganization, setNewOrganization] = useState({ name: '' }); // Estado para el formulario
  const router = useRouter();

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.organizations.base);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleViewApplications = (organizationId: string) => {
    router.push(`/organizations/${organizationId}`);
  };

  const handleAddOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(apiRoutes.organizations.base, newOrganization);
      setFormVisible(false); // Ocultar el formulario
      setNewOrganization({ name: '' }); // Reiniciar el formulario
      fetchOrganizations(); // Refrescar la lista de organizaciones
    } catch (error) {
      console.error('Error adding organization:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <button
          onClick={() => setFormVisible(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add organization
        </button>
      </div>

      {/* Add Organization Form */}
      {formVisible && (
        <div className="mb-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Add Organization</h2>
          <form onSubmit={handleAddOrganization} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                Organization Name
              </label>
              <input
                type="text"
                id="name"
                value={newOrganization.name}
                onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setFormVisible(false)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 p-3 text-left font-bold">Name</th>
              <th className="border border-gray-700 p-3 text-left font-bold">Applications</th>
              <th className="border border-gray-700 p-3 text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org: any) => (
              <tr key={org.id} className="hover:bg-gray-700">
                <td className="border border-gray-700 p-3">{org.name}</td>
                <td className="border border-gray-700 p-3">{org.applicationsCount || 0}</td>
                <td className="border border-gray-700 p-3">
                  <button
                    onClick={() => handleViewApplications(org.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizationsPage;