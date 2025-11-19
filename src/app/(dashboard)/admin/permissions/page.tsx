'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import PermissionForm from './PermissionForm';
import PermissionTable from './PermissionTable';
import { useLayout } from '@/contexts/LayoutContext';
import { Permission, User, Organization, Application } from '@/types/models';

interface PermissionFormData {
  username: string;
  organizationId: string;
  applicationId: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [formData, setFormData] = useState<PermissionFormData>({
    username: '',
    organizationId: '',
    applicationId: '',
    canRead: false,
    canCreate: false,
    canUpdate: false,
    canDelete: false,
  });
  const [editingPerm, setEditingPerm] = useState<Permission | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleCreate = useCallback(() => {
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
  }, []);

  const handleEdit = (perm: Permission) => {
    setFormData({
      username: perm.name, // Assuming name maps to username or similar logic needed
      organizationId: perm.organizationId,
      applicationId: perm.applicationId,
      canRead: perm.canRead,
      canCreate: perm.canCreate,
      canUpdate: perm.canUpdate,
      canDelete: perm.canDelete,
    });
    setEditingPerm(perm);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`${apiRoutes.userPermissions.base}/${id}`);
      fetchPermissions();
    } catch (err) {
      console.error('Error deleting permission:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPerm) {
        await axiosInstance.put(`${apiRoutes.userPermissions.base}/${editingPerm.id}`, formData);
      } else {
        await axiosInstance.post(`${apiRoutes.userPermissions.base}/create`, formData);
      }
      setShowForm(false);
      setEditingPerm(null);
      fetchPermissions();
    } catch (err) {
      console.error('Error saving permission:', err);
    }
  };

  const actionButton = useMemo(() => (
    <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
      Create Permission
    </button>
  ), [handleCreate]);

  const { setLayoutInfo } = useLayout();

  useEffect(() => {
    setLayoutInfo("Permissions", !showForm ? actionButton : undefined);
  }, [showForm, actionButton, setLayoutInfo]);

  // Pagination logic
  const totalPages = Math.ceil(permissions.length / itemsPerPage);
  const paginatedPermissions = permissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
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
          permissions={paginatedPermissions}
          organizations={organizations}
          applications={applications}
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

export default PermissionsPage;
