'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import ApplicationForm from './ApplicationForm';
import ApplicationTable from './ApplicationTable';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [formData, setFormData] = useState({
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
  const [editingApp, setEditingApp] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const handleCreate = () => {
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
  };

  const handleEdit = (app: any) => {
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
        await axiosInstance.post(apiRoutes.applications.base + "/organization/"+selectedOrganization, formData);
      }
      setShowForm(false);
      fetchApplications(selectedOrganization);
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`${apiRoutes.applications.base}/${id}`);
      fetchApplications(selectedOrganization);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Applications</h1>

      {/* Organization Filter */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-900 mb-2">Filter by Organization</label>
        <select
          name="organizationId"
          value={selectedOrganization}
          onChange={(e) => setSelectedOrganization(e.target.value)}
          className="w-full border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select an organization</option>
          {organizations.map((org: any) => (
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
        <>
          <button
            onClick={handleCreate}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Application
          </button>
          <ApplicationTable
            applications={applications}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default ApplicationsPage;