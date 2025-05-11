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
    <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-md">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        {!showForm && (
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Role
          </button>
        )}
      </div>

      {/* Contenido */}
      {showForm ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4">
            {editingRole ? 'Edit Role' : 'Create Role'}
          </h2>
          <RoleForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingRole(null);
            }}
          />
        </div>
      ) : (
        <RoleTable roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default RolesPage;