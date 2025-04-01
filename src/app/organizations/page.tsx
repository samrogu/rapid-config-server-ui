'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const OrganizationsPage = () => {
  const [organizations, setOrganizations] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingOrg, setEditingOrg] = useState(null);

  const API_URL = 'http://localhost:8888/rapid-config-server/api/organizations';

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(API_URL);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Create or update organization
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOrg) {
        // Update organization
        await axios.put(`${API_URL}/${editingOrg.id}`, formData);
      } else {
        // Create organization
        await axios.post(API_URL, formData);
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
      await axios.delete(`${API_URL}/${id}`);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organizaciones</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingOrg ? 'Actualizar' : 'Crear'}
        </button>
        {editingOrg && (
          <button
            type="button"
            onClick={() => {
              setEditingOrg(null);
              setFormData({ name: '', description: '' });
            }}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de organizaciones */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Nombre</th>
            <th className="border border-gray-300 p-2">Descripción</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org: any) => (
            <tr key={org.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{org.name}</td>
              <td className="border border-gray-300 p-2">{org.description}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEdit(org)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(org.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizationsPage;