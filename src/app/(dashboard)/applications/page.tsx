'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import ApplicationForm from '@/components/ApplicationForm';
import ApplicationTable from '@/components/ApplicationTable';
import { Application, Organization } from '@/types/models';
import { useLayout } from '@/contexts/LayoutContext';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [formData, setFormData] = useState<Partial<Application>>({
    name: '',
    description: '',
    uri: '',
    profile: '',
    label: '',
    enabled: false,
    vaultUrl: '',
    secretEngine: '',
    vaultToken: '',
    appRoleId: '',
    appRoleSecret: '',
    vaultEnabled: false,
    organizationId: '',
  });
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.organizations.base);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  // Fetch applications
  const fetchApplications = async (organizationId: string) => {
    try {
      const response = await axiosInstance.get(
        apiRoutes.applications.byOrganization(organizationId)
      );
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (selectedOrganization) {
      fetchApplications(selectedOrganization);
    } else {
      setApplications([]);
    }
  }, [selectedOrganization]);

  const handleCreate = useCallback(() => {
    if (!selectedOrganization) {
      alert('Please select an organization before creating an application.');
      return;
    }
    setFormData({
      name: '',
      description: '',
      uri: '',
      profile: '',
      label: '',
      enabled: false,
      vaultUrl: '',
      secretEngine: '',
      vaultToken: '',
      appRoleId: '',
      appRoleSecret: '',
      vaultEnabled: false,
      organizationId: selectedOrganization,
    });
    setShowForm(true);
  }, [selectedOrganization]);

  const handleEdit = (app: Application) => {
    setFormData(app);
    setEditingApp(app);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingApp(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingApp) {
        await axiosInstance.put(
          `${apiRoutes.applications.base}/${editingApp.id}`,
          formData
        );
      } else {
        await axiosInstance.post(apiRoutes.applications.base + "/organization/" + selectedOrganization, formData);
      }
      setShowForm(false);
      fetchApplications(selectedOrganization);
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  const handleDelete = async (app: Application) => {
    try {
      await axiosInstance.delete(`${apiRoutes.applications.base}/${app.id}`);
      fetchApplications(selectedOrganization);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const actionButton = useMemo(() => (
    <button
      onClick={handleCreate}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      Nueva Aplicación
    </button>
  ), [handleCreate]);

  const { setLayoutInfo } = useLayout();

  useEffect(() => {
    setLayoutInfo("Applications", !showForm ? actionButton : undefined);
  }, [showForm, actionButton, setLayoutInfo]);

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* Organization Filter */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-300 mb-2">Filter by Organization</label>
        <select
          name="organizationId"
          value={selectedOrganization}
          onChange={(e) => setSelectedOrganization(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an organization</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
        </select>
      </div>

      {/* Show Form or Table */}
      {showForm ? (
        <ApplicationForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : (
        <ApplicationTable
          applications={paginatedApplications}
          onEdit={handleEdit}
          onDelete={handleDelete}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          }}
        />
      )}
    </>
  );
};

export default ApplicationsPage;
