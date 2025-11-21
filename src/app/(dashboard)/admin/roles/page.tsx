'use client';

import { useState, useEffect, useMemo } from 'react';
import RoleTable from './RoleTable';
import RoleForm from './RoleForm';
import apiRoutes from '@/apiRoutes';
import axiosInstance from '@/axiosConfig';
import { useLayout } from '@/contexts/LayoutContext';
import { Role } from '@/types/models';

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [formData, setFormData] = useState<Partial<Role>>({ name: '', description: '' });
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.roles.base);
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = () => {
    setFormData({ name: '', editable: true });
    setShowForm(true);
  };

  const handleEdit = (role: Role) => {
    setFormData(role);
    setEditingRole(role);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`${apiRoutes.roles.base}/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingRole) {
        await axiosInstance.put(`${apiRoutes.roles.base}/${editingRole.id}`, formData);
      } else {
        await axiosInstance.post(apiRoutes.roles.base, formData);
      }
      setShowForm(false);
      setEditingRole(null);
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  const actionButton = useMemo(() => (
    <button
      onClick={handleCreate}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Create Role
    </button>
  ), []);

  const { setLayoutInfo } = useLayout();

  useEffect(() => {
    setLayoutInfo("Roles", !showForm ? actionButton : undefined);
  }, [showForm, actionButton, setLayoutInfo]);

  // Pagination logic
  const totalPages = Math.ceil(roles.length / itemsPerPage);
  const paginatedRoles = roles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
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
        <RoleTable
          roles={paginatedRoles}
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

export default RolesPage;