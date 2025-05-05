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
    <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Organizations</h1>
          <p className="text-gray-400 mt-1">Manage your organization list</p>
        </div>
        <button
          onClick={() => setFormVisible(true)}
          className="group relative inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-150 ease-in-out"
        >
          <span className="relative flex items-center gap-2">
            <svg 
              className="w-5 h-5 transform group-hover:rotate-180 transition-transform duration-150" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="relative">Add Organization</span>
          </span>
          <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
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

      {/* Enhanced Table */}
      <div className="mt-4 bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-800 text-gray-300">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Organization Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                  Applications
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {organizations.map((org: any) => (
                <tr
                  key={org.id}
                  className="hover:bg-gray-700/50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-300">
                          {org.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{org.name}</div>
                        <div className="text-sm text-gray-400">UID: {org.uid}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
                      {org.applicationsCount || 0} apps
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewApplications(org.id)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out"
                    >
                      <svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {organizations.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-400">No organizations</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new organization.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationsPage;