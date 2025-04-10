'use client';

import { useState, useEffect } from 'react';
import RoleTable from './RoleTable';
import RoleForm from './RoleForm';
import apiRoutes from '@/apiRoutes';
import axios from 'axios';

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({ name: '' });
  const [editingRole, setEditingRole] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Obtener el token de localStorage
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

  // Fetch roles
  const fetchRoles = async () => {
    try {
      if (!token) return;
      const response = await axios.get(apiRoutes.roles.base, axiosConfig);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [token]);

  const handleCreate = () => {
    setFormData({ name: '' });
    setShowForm(true);
  };

  const handleEdit = (role: any) => {
    setFormData(role);
    setEditingRole(role);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiRoutes.roles.base}/${id}`, axiosConfig);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRole) {
        // Update role
        await axios.put(`${apiRoutes.roles.base}/${editingRole.id}`, formData, axiosConfig);
      } else {
        // Create role
        await axios.post(apiRoutes.roles.base, formData, axiosConfig);
      }
      setShowForm(false);
      setEditingRole(null);
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Roles</h1>
      {showForm ? (
        <RoleForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingRole(null);
          }}
        />
      ) : (
        <>
          <button
            onClick={handleCreate}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Role
          </button>
          <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default RolesPage;