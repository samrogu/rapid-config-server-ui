'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosConfig'; // Importa la configuración de Axios
import apiRoutes from '@/apiRoutes';
import OrganizationForm from './OrganizationForm';
import OrganizationTable from './OrganizationTable';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingOrg, setEditingOrg] = useState(null);

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

  // Create or update organization
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOrg) {
        // Update organization
        await axiosInstance.put(
          `${apiRoutes.organizations.base}/${editingOrg.id}`,
          formData
        );
      } else {
        // Create organization
        await axiosInstance.post(apiRoutes.organizations.base, formData);
      }
      setFormData({ name: '', description: '' });
      setEditingOrg(null);
      fetchOrganizations();
    } catch (error) {
      console.error('Error saving organization:', error);
    }
  };

  // Delete organization
  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`${apiRoutes.organizations.base}/${id}`);
      fetchOrganizations();
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  // Set organization for editing
  const handleEdit = (org: any) => {
    setEditingOrg(org);
    setFormData({ name: org.name, description: org.description });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Organizaciones</h1>

      {/* Formulario */}
      <OrganizationForm
        formData={formData}
        setFormData={setFormData}
        editingOrg={editingOrg}
        setEditingOrg={setEditingOrg}
        onSubmit={handleSubmit}
      />

      {/* Tabla */}
      <OrganizationTable
        organizations={organizations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrganizationsPage;