'use client';

import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import UserForm from './UserForm';
import apiRoutes from '@/apiRoutes';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // Estado para almacenar los roles
  const [formData, setFormData] = useState({ username: '', password: '', roles: [] });
  const [editingUser, setEditingUser] = useState(null);
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

  // Fetch users
  const fetchUsers = async () => {
    try {
      if (!token) return;
      const response = await axios.get(apiRoutes.users.base, axiosConfig);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
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
    fetchUsers();
    fetchRoles();
  }, [token]);

  const handleCreate = () => {
    setFormData({ username: '', password: '', roles: [] });
    setShowForm(true);
  };

  const handleEdit = (user: any) => {
    setFormData(user);
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiRoutes.users.base}/${id}`, axiosConfig);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update user
        await axios.put(`${apiRoutes.users.base}/${editingUser.id}`, formData, axiosConfig);
      } else {
        // Create user
        await axios.post(apiRoutes.users.base, formData, axiosConfig);
      }
      setShowForm(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Users</h1>
      {showForm ? (
        <UserForm
          formData={formData}
          setFormData={setFormData}
          roles={roles} // Pasar los roles al formulario
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingUser(null);
          }}
        />
      ) : (
        <>
          <button
            onClick={handleCreate}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create User
          </button>
          <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default UsersPage;