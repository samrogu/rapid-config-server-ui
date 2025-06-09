'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import PermissionForm from './PermissionForm';
import PermissionTable from './PermissionTable';

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    organizationId: '',
    applicationId: '',
    canRead: false,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
  });
  const [editingPerm, setEditingPerm] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPermissions = async () => {
    try {
      const res = await axiosInstance.get(apiRoutes.userPermissions.base);
      setPermissions(res.data);
    } catch (err) {
      console.error('Error fetching permissions:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get(apiRoutes.users.base);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const res = await axiosInstance.get(apiRoutes.organizations.base);
      setOrganizations(res.data);
    } catch (err) {
      console.error('Error fetching organizations:', err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get(apiRoutes.applications.base);
      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  useEffect(() => {
    fetchPermissions();
    fetchUsers();
    fetchOrganizations();
    fetchApplications();
  }, []);

  const handleCreate = () => {
    setFormData({
      username: '',
      organizationId: '',
      applicationId: '',
      canRead: false,
      canCreate: false,
      canUpdate: false,
      canDelete: false,
    });
    setEditingPerm(null);
    setShowForm(true);
  };

  const handleEdit = (perm: any) => {
    setFormData(perm);
    setEditingPerm(perm);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`${apiRoutes.userPermissions.base}/${id}`);
      fetchPermissions();
    } catch (err) {
      console.error('Error deleting permission:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (editingPerm) {
        await axiosInstance.put(`${apiRoutes.userPermissions.base}/${editingPerm.id}`, formData);
      } else {
        console.log('Creating new permission:', formData);
        console.log('API Route:', apiRoutes.userPermissions.base);
        await axiosInstance.post(apiRoutes.userPermissions.base, formData);
      }
      setShowForm(false);
      setEditingPerm(null);
      fetchPermissions();
    } catch (err) {
      console.error('Error saving permission:', err);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Permissions</h1>
        {!showForm && (
          <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Create Permission
          </button>
        )}
      </div>
      {showForm ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <PermissionForm
            formData={formData}
            setFormData={setFormData}
            users={users}
            organizations={organizations}
            applications={applications}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <PermissionTable
          permissions={permissions}
          organizations={organizations}
          applications={applications}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PermissionsPage;
