'use client';

import { useState, useEffect, useMemo } from 'react';
import axiosInstance from '@/axiosConfig'; // Importa la configuración de Axios
import apiRoutes from '@/apiRoutes';
import { useRouter } from 'next/navigation';
import { useLayout } from '@/contexts/LayoutContext';
import Table from '@/components/Table';
import { Organization } from '@/types/models';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newOrganization, setNewOrganization] = useState({ name: '' }); // Estado para el formulario
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const actionButton = useMemo(() => (
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
  ), []);

  const { setLayoutInfo } = useLayout();

  useEffect(() => {
    setLayoutInfo("Organizations", !formVisible ? actionButton : undefined);
  }, [formVisible, actionButton, setLayoutInfo]);

  // Pagination logic
  const totalPages = Math.ceil(organizations.length / itemsPerPage);
  const paginatedOrganizations = organizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      key: 'name',
      header: 'Organization Name',
      render: (org: Organization) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-lg font-medium text-gray-300">
              {org.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{org.name}</div>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <div className="text-sm text-gray-400">UID: {(org as any).uid}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'applications',
      header: 'Applications',
      render: (org: Organization) => (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(org as any).applicationsCount || 0} apps
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: 'View Details',
      onClick: (org: Organization) => handleViewApplications(org.id),
      icon: (
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
  ];

  return (
    <>
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

      <Table
        data={paginatedOrganizations}
        columns={columns}
        actions={actions}
        emptyStateMessage="No organizations"
        emptyStateDescription="Get started by creating a new organization."
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
        }}
      />
    </>
  );
};

export default OrganizationsPage;