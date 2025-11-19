'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import UserTable from './UserTable';
import UserForm from './UserForm';
import apiRoutes from '@/apiRoutes';
import axiosInstance from '@/axiosConfig';
import { useLayout } from '@/contexts/LayoutContext';
import { User } from '@/types/models';

interface UserFormData {
  username: string;
  password?: string;
  roles: string[];
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState<UserFormData>({ username: '', password: '', roles: [] });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.users.base);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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
    fetchUsers();
    fetchRoles();
  }, []);

  const handleCreate = useCallback(() => {
    setFormData({ username: '', password: '', roles: [] });
    setFormVisible(true);
  }, []);

  const handleEdit = (user: User) => {
    setFormData({
      username: user.username,
      roles: user.roles,
      password: '', // Password is not fetched, so leave empty or handle accordingly
    });
    setEditingUser(user);
    setFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`${apiRoutes.users.base}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axiosInstance.put(`${apiRoutes.users.base}/${editingUser.id}`, formData);
      } else {
        await axiosInstance.post(apiRoutes.users.base, formData);
      }
      setFormVisible(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };



  const { setLayoutInfo } = useLayout();

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const actionButton = useMemo(() => (
    <button
      onClick={handleCreate}
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
        <span className="relative">Add User</span>
      </span>
      <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
    </button>
  ), [handleCreate]);

  useEffect(() => {
    setLayoutInfo("Users", !formVisible ? actionButton : undefined);
  }, [formVisible, actionButton, setLayoutInfo]);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {formVisible ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4">
            {editingUser ? 'Edit User' : 'Create User'}
          </h2>
          <UserForm
            formData={formData}
            setFormData={setFormData}
            roles={roles}
            onSubmit={handleSubmit}
            onCancel={() => {
              setFormVisible(false);
              setEditingUser(null);
            }}
          />
        </div>
      ) : (
        <UserTable
          users={paginatedUsers}
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

export default UsersPage;