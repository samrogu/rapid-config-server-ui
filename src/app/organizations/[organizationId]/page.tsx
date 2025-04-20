'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import Breadcrumb from '@/components/Breadcrumb';
import OrganizationHeader from '@/components/OrganizationHeader';
import TabNavigation from '@/components/TabNavigation';
import ApplicationsTable from '@/components/ApplicationsTable';
import UsersTable from '@/components/UsersTable';
import ConfirmModal from '@/components/ConfirmModal';

const OrganizationDetailsPage = () => {
  const { organizationId } = useParams();
  const router = useRouter();

  const [organization, setOrganization] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState<'applications' | 'users'>('applications');
  const [isEditing, setIsEditing] = useState(false); // Estado para el formulario de edición
  const [editFormData, setEditFormData] = useState({ name: '' }); // Datos del formulario de edición
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // Estado para el modal de confirmación

  // Fetch organization details
  const fetchOrganizationDetails = async () => {
    try {
      const response = await axiosInstance.get(`${apiRoutes.organizations.base}/${organizationId}`);
      setOrganization(response.data);
      setApplications(response.data.applications || []);
      setUsers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching organization details:', error);
    }
  };

  useEffect(() => {
    fetchOrganizationDetails();
  }, [organizationId]);

  // Handle Edit Organization
  const handleEditClick = () => {
    setEditFormData({ name: organization?.name || '' });
    setIsEditing(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`${apiRoutes.organizations.base}/${organizationId}`, editFormData);
      setIsEditing(false);
      fetchOrganizationDetails(); // Refrescar los datos de la organización
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  // Handle Delete Organization
  const handleDeleteClick = async () => {
    try {
      await axiosInstance.delete(`${apiRoutes.organizations.base}/${organizationId}`);
      router.push('/organizations'); // Redirigir a la lista de organizaciones
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 p-6 rounded-lg shadow-md">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Organizations', href: '/organizations' },
          { label: organization?.name || 'Loading...' },
        ]}
      />

      {/* Organization Header */}
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            value={editFormData.name}
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <OrganizationHeader
          name={organization?.name}
          onEdit={handleEditClick}
          onDelete={() => setIsConfirmModalOpen(true)} // Abrir el modal de confirmación
        />
      )}

      {/* Tab Navigation */}
      <TabNavigation
        tabs={[
          { label: 'Applications', value: 'applications' },
          { label: 'Users', value: 'users' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      {activeTab === 'applications' ? (
        <ApplicationsTable
          applications={applications}
          onAdd={() => console.log('Add application')}
          onEdit={(id) => console.log(`Edit application ${id}`)}
        />
      ) : (
        <UsersTable
          users={users}
          onAdd={() => console.log('Add user')}
          onRemove={(id) => console.log(`Remove user ${id}`)}
        />
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteClick}
        title="Delete Organization"
        message="Are you sure you want to delete this organization? This action cannot be undone."
      />
    </div>
  );
};

export default OrganizationDetailsPage;