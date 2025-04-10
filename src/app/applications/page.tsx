'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import apiRoutes from '@/apiRoutes'; // Importa las rutas de la API
import ApplicationForm from '@/app/applications/ApplicationForm/ApplicationForm';

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
    organizationId: '',
  });
  const [editingApp, setEditingApp] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [token, setToken] = useState<string | null>(null); // Estado para almacenar el token

  // Obtener el token de localStorage en el cliente
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  // Configuración de Axios con el token
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      if (!token) return; // Espera a que el token esté disponible
      const response = await axios.get(apiRoutes.organizations.base, axiosConfig);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  // Fetch applications
  const fetchApplications = async (organizationId: string) => {
    try {
      if (!token) return; // Espera a que el token esté disponible
      const response = await axios.get(
        apiRoutes.applications.byOrganization(organizationId),
        axiosConfig
      );
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [token]); // Ejecuta fetchOrganizations cuando el token esté disponible

  useEffect(() => {
    if (selectedOrganization) {
      fetchApplications(selectedOrganization);
    } else {
      setApplications([]);
    }
  }, [selectedOrganization, token]); // Ejecuta fetchApplications cuando cambie la organización o el token

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
      organizationId: selectedOrganization,
    });
    setShowForm(true);
  };

  const handleEdit = (app: any) => {
    setFormData(app);
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
        // Update application
        await axios.put(
          `${apiRoutes.applications.base}/${editingApp.id}`,
          formData,
          axiosConfig
        );
      } else {
        // Create application
        await axios.post(apiRoutes.applications.base, formData, axiosConfig);
      }
      setShowForm(false);
      fetchApplications(selectedOrganization);
    } catch (error) {
      console.error('Error saving application:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${apiRoutes.applications.base}/${id}`, axiosConfig);
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
          selectedOrganization={selectedOrganization}
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
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Name</th>
                <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Description</th>
                <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">URI</th>
                <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app: any) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-gray-900">{app.name}</td>
                  <td className="border border-gray-300 p-2 text-gray-900">{app.description}</td>
                  <td className="border border-gray-300 p-2 text-gray-900">{app.uri}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleEdit(app)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ApplicationsPage;