'use client';

import { useState, useEffect, useMemo } from 'react';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import { useLayout } from '@/contexts/LayoutContext';
import { useAuth } from '@/contexts/AuthContext';
import Table from '@/components/Table';
import { Organization } from '@/types/models';
import ConfirmModal from '@/components/ConfirmModal';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | null>(null);
  const [newOrganization, setNewOrganization] = useState({ name: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { canUpdate, canDelete, canCreate } = useAuth();




  const fetchOrganizations = async () => {
    try {
      // Fetch the list of organizations
      const orgsResponse = await axiosInstance.get(apiRoutes.organizations.base);
      const orgs = orgsResponse.data;

      // Fetch details for each organization to get application counts
      const orgsWithCounts = await Promise.all(
        orgs.map(async (org: Organization) => {
          try {
            const detailsResponse = await axiosInstance.get(`${apiRoutes.organizations.base}/${org.id}`);
            const applications = detailsResponse.data.applications || [];
            return {
              ...org,
              applicationsCount: applications.length,
            };
          } catch (error) {
            console.error(`Error fetching details for organization ${org.id}:`, error);
            return {
              ...org,
              applicationsCount: 0,
            };
          }
        })
      );

      setOrganizations(orgsWithCounts);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };


  useEffect(() => {
    fetchOrganizations();
  }, []);



  const handleAddOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(apiRoutes.organizations.base, newOrganization);
      setFormVisible(false);
      setNewOrganization({ name: '' });
      fetchOrganizations();
    } catch (error) {
      console.error('Error adding organization:', error);
    }
  };

  const handleEditOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrganization) return;
    try {
      await axiosInstance.put(`${apiRoutes.organizations.base}/${editingOrganization.id}`, {
        ...editingOrganization,
        name: newOrganization.name,
      });
      setFormVisible(false);
      setEditingOrganization(null);
      fetchOrganizations();
    } catch (error) {
      console.error('Error editing organization:', error);
    }
  };

  const handleDeleteOrganization = async () => {
    if (!organizationToDelete) return;
    try {
      await axiosInstance.delete(`${apiRoutes.organizations.base}/${organizationToDelete.id}`);
      setOrganizationToDelete(null);
      fetchOrganizations();
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  const openEditForm = (org: Organization) => {
    setEditingOrganization(org);
    setNewOrganization({ name: org.name });
    setFormVisible(true);
  };

  const actionButton = useMemo(() => {
    // Solo mostrar el botón si tiene permiso de crear
    if (!canCreate()) return null;

    return (
      <button
        onClick={() => {
          setFormVisible(true);
          setEditingOrganization(null);
          setNewOrganization({ name: '' });
        }}
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
    );
  }, [canCreate]);

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
            <div className="text-sm text-gray-400">UID: {org.uid}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'applications',
      header: 'Applications',
      render: (org: Organization) => (
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-200">
          {org.applicationsCount || 0} apps
        </div>
      ),
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: openEditForm,
      icon: (
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
        </svg>
      ),
      className: 'bg-yellow-500 hover:bg-yellow-600',
      shouldShow: (org: Organization) => {
        // Convertir string id a number para la comparación
        const orgId = typeof org.id === 'string' ? parseInt(org.id) : org.id;
        return canUpdate(orgId);
      },
    },
    {
      label: 'Delete',
      onClick: (org: Organization) => setOrganizationToDelete(org),
      icon: (
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      className: 'bg-red-500 hover:bg-red-600',
      shouldShow: (org: Organization) => {
        // Convertir string id a number para la comparación
        const orgId = typeof org.id === 'string' ? parseInt(org.id) : org.id;
        return canDelete(orgId);
      },
    },
  ];

  return (
    <>
      {formVisible && (
        <div className="mb-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-xl font-bold mb-4">{editingOrganization ? 'Edit Organization' : 'Add Organization'}</h2>
          <form onSubmit={editingOrganization ? handleEditOrganization : handleAddOrganization} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                Organization Name
              </label>
              <input
                type="text"
                id="name"
                value={newOrganization.name}
                onChange={(e) => setNewOrganization({ ...newOrganization, name: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Enter organization name"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
              >
                {editingOrganization ? 'Save Changes' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormVisible(false);
                  setEditingOrganization(null);
                }}
                className="bg-gray-800/50 border border-gray-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-700/50 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!formVisible && (
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
      )}

      {organizationToDelete && (
        <ConfirmModal
          title="Delete Organization"
          message={`Are you sure you want to delete the organization "${organizationToDelete.name}"?`}
          onConfirm={handleDeleteOrganization}
          onCancel={() => setOrganizationToDelete(null)}
        />
      )}
    </>
  );
};

export default OrganizationsPage;