'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import Breadcrumb from '@/components/Breadcrumb';
import OrganizationHeader from '@/components/OrganizationHeader';
import TabNavigation from '@/components/TabNavigation';
import UsersTable from '@/components/UsersTable';
import ConfirmModal from '@/components/ConfirmModal';
import ApplicationForm from '@/components/ApplicationForm';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import ApplicationTable from '@/components/ApplicationTable';

const OrganizationDetailsPage = () => {
  const { organizationId } = useParams();
  const router = useRouter();

  const [organization, setOrganization] = useState<any>(null);
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState<'applications' | 'users'>('applications');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '' });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [applicationFormData, setApplicationFormData] = useState({ name: '', description: '' });
  const [isAddingApplication, setIsAddingApplication] = useState(false);
  const [isEditingApplication, setIsEditingApplication] = useState(false);
  const [isDeleteApplicationModalOpen, setIsDeleteApplicationModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<any>(null);

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
      fetchOrganizationDetails();
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  // Handle Delete Organization
  const handleDeleteClick = async () => {
    try {
      await axiosInstance.delete(`${apiRoutes.organizations.base}/${organizationId}`);
      router.push('/organizations');
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  // Handle Add Application
  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    try {
      // Enviar la solicitud para agregar la aplicación
      await axiosInstance.post(`${apiRoutes.applications.base}/organization/${organizationId}`, applicationFormData);

      // Actualizar el estado para salir del modo de adición
      setIsAddingApplication(false);

      // Reiniciar el formulario
      setApplicationFormData({ name: '', description: '', uri: '', profile: '', label: '', enabled: false });

      // Refrescar la lista de aplicaciones
      fetchOrganizationDetails();
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  // Handle Edit Application
  const handleEditApplication = (app: any) => {
    console.log('Editing application:', app);

    // Configurar los datos de la aplicación seleccionada directamente
    setApplicationFormData(app);

    // Activar el modo de edición
    setIsEditingApplication(true);
  };

  // Handle Edit Application Submit
  const handleEditApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`${apiRoutes.applications.base}/${applicationFormData.id}`, applicationFormData);
      setIsEditingApplication(false); // Salir del modo de edición
      setApplicationFormData({ name: '', description: '' }); // Reiniciar el formulario
      fetchOrganizationDetails(); // Refrescar la lista de aplicaciones
    } catch (error) {
      console.error('Error editing application:', error);
    }
  };

  // Handle Delete Application
  const handleDeleteApplication = (app: any) => {
    setApplicationToDelete(app);
    setIsDeleteApplicationModalOpen(true);
  };

  // Confirm Delete Application
  const confirmDeleteApplication = async () => {
    try {
      await axiosInstance.delete(`${apiRoutes.applications.base}/${applicationToDelete.id}`);
      setIsDeleteApplicationModalOpen(false);
      setApplicationToDelete(null);
      fetchOrganizationDetails();
    } catch (error) {
      console.error('Error deleting application:', error);
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
        <div className="flex justify-between items-center mb-6">
          <OrganizationHeader name={organization?.name} />
          {/* Kebab Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 rounded-full hover:bg-gray-800">
              <EllipsisVerticalIcon className="h-6 w-6 text-gray-400" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleEditClick}
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-200`}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setIsConfirmModalOpen(true)}
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-200`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
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
        isAddingApplication || isEditingApplication ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">
              {isEditingApplication ? 'Edit Application' : 'Add Application'}
            </h2>
            <ApplicationForm
              formData={applicationFormData}
              setFormData={setApplicationFormData}
              onSubmit={isEditingApplication ? handleEditApplicationSubmit : handleAddApplication}
              onCancel={() => {
                setIsAddingApplication(false);
                setIsEditingApplication(false);
                setApplicationFormData({ name: '', description: '' });
              }}
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Applications</h2>
              <button
                onClick={() => {
                  setIsAddingApplication(true);
                  setApplicationFormData({ name: '', description: '' }); // Reiniciar el formulario
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add Application
              </button>
            </div>
            <ApplicationTable
              applications={applications}
              onEdit={handleEditApplication}
              onDelete={handleDeleteApplication}
            />
          </div>
        )
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
        message="Are you sure you want to delete this organization? This action cannot be undone." confirmText={''} confirmButtonClass={''}      />

      <ConfirmModal
        isOpen={isDeleteApplicationModalOpen}
        onClose={() => {
          setIsDeleteApplicationModalOpen(false);
          setApplicationToDelete(null);
        }}
        onConfirm={confirmDeleteApplication}
        title="Delete Application"
        message={
          <div className="space-y-4">
            <div className="text-gray-300">
              Are you sure you want to delete the application{' '}
              <span className="font-semibold text-white">
                {applicationToDelete?.name}
              </span>
              ?
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
              <div>This action will:</div>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Remove all application configurations</li>
                <li>Delete all associated settings</li>
                <li>Remove access for all users</li>
              </ul>
            </div>
            <div className="text-red-400 text-sm">
              This action cannot be undone.
            </div>
          </div>
        }
        confirmText="Delete Application"
        confirmButtonClass="bg-red-600 hover:bg-red-700 focus:ring-red-500"
      />

      {/* Application Form */}
      {isApplicationFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-white mb-4">Add Application</h2>
            <ApplicationForm
              formData={applicationFormData}
              setFormData={setApplicationFormData}
              onSubmit={handleAddApplication}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationDetailsPage;