'use client';

import { useState, useEffect, useMemo } from 'react';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import { useLayout } from '@/contexts/LayoutContext';
import Table from '@/components/Table';
import { Application, Organization } from '@/types/models';
import ConfirmModal from '@/components/ConfirmModal';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);
  const [newApplication, setNewApplication] = useState({ name: '', description: '', organizationId: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.applications.base);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.organizations.base);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchOrganizations();
  }, []);

  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(apiRoutes.applications.base, newApplication);
      setFormVisible(false);
      setNewApplication({ name: '', description: '', organizationId: '' });
      fetchApplications();
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const handleEditApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApplication) return;
    try {
      await axiosInstance.put(`${apiRoutes.applications.base}/${editingApplication.id}`, editingApplication);
      setFormVisible(false);
      setEditingApplication(null);
      fetchApplications();
    } catch (error) {
      console.error('Error editing application:', error);
    }
  };

  const handleDeleteApplication = async () => {
    if (!applicationToDelete) return;
    try {
      await axiosInstance.delete(`${apiRoutes.applications.base}/${applicationToDelete.id}`);
      setApplicationToDelete(null);
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const openEditForm = (app: Application) => {
    setEditingApplication(app);
    setNewApplication({ name: app.name, description: app.description, organizationId: app.organizationId });
    setFormVisible(true);
  };

  const organizationMap = useMemo(() => {
    return organizations.reduce((acc, org) => {
      acc[org.id] = org.name;
      return acc;
    }, {} as Record<string, string>);
  }, [organizations]);

  const actionButton = useMemo(() => (
    <button
      onClick={() => {
        setFormVisible(true);
        setEditingApplication(null);
        setNewApplication({ name: '', description: '', organizationId: '' });
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
        <span className="relative">Add Application</span>
      </span>
      <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
    </button>
  ), []);

  const { setLayoutInfo } = useLayout();

  useEffect(() => {
    setLayoutInfo("Applications", !formVisible ? actionButton : undefined);
  }, [formVisible, actionButton, setLayoutInfo]);

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      key: 'name',
      header: 'Application Name',
      render: (app: Application) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-lg font-medium text-gray-300">
              {app.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{app.name}</div>
            <div className="text-sm text-gray-400">UID: {app.uid}</div>
          </div>
        </div>
      ),
    },
    {
        key: 'organization',
        header: 'Organization',
        render: (app: Application) => (
            <div className="text-sm text-gray-400">{organizationMap[app.organizationId]}</div>
        )
    }
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
    },
    {
      label: 'Delete',
      onClick: (app: Application) => setApplicationToDelete(app),
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
    },
  ];

  return (
    <>
      {formVisible && (
        <div className="mb-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">{editingApplication ? 'Edit Application' : 'Add Application'}</h2>
          <form onSubmit={editingApplication ? handleEditApplication : handleAddApplication} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold mb-2">
                Application Name
              </label>
              <input
                type="text"
                id="name"
                value={newApplication.name}
                onChange={(e) => setNewApplication({ ...newApplication, name: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={newApplication.description}
                onChange={(e) => setNewApplication({ ...newApplication, description: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm font-bold mb-2">
                Organization
              </label>
              <select
                id="organization"
                value={newApplication.organizationId}
                onChange={(e) => setNewApplication({ ...newApplication, organizationId: e.target.value })}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an organization</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {editingApplication ? 'Save Changes' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormVisible(false);
                  setEditingApplication(null);
                }}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <Table
        data={paginatedApplications}
        columns={columns}
        actions={actions}
        emptyStateMessage="No applications"
        emptyStateDescription="Get started by creating a new application."
        pagination={{
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
        }}
      />

      {applicationToDelete && (
        <ConfirmModal
          title="Delete Application"
          message={`Are you sure you want to delete the application "${applicationToDelete.name}"?`}
          onConfirm={handleDeleteApplication}
          onCancel={() => setApplicationToDelete(null)}
        />
      )}
    </>
  );
};

export default ApplicationsPage;