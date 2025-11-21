'use client';

import { useState, useEffect, useMemo } from 'react';
import axiosInstance from '@/axiosConfig';
import apiRoutes from '@/apiRoutes';
import { useLayout } from '@/contexts/LayoutContext';
import { useAuth } from '@/contexts/AuthContext';
import Table from '@/components/Table';
import { Application, Organization } from '@/types/models';
import ConfirmModal from '@/components/ConfirmModal';
import ApplicationForm from '@/components/ApplicationForm';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [viewingApplication, setViewingApplication] = useState<Application | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { canUpdate, canDelete, canCreate, canRead } = useAuth();

  // Initial form data with all fields
  const initialApplicationFormData: Partial<Application> = {
    id: undefined,
    name: '',
    description: '',
    uri: '',
    profile: '',
    label: '',
    enabled: false,
    vaultEnabled: false,
    vaultUrl: '',
    vaultAuthMethod: '',
    secretEngine: '',
    vaultToken: '',
    appRoleId: '',
    appRoleSecret: '',
    vaultUsername: '',
    vaultPassword: '',
    organizationId: '',
    vaultSchema: '',
    vaultPort: 0,
  };

  const [applicationFormData, setApplicationFormData] = useState<Partial<Application>>(initialApplicationFormData);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.applications.base);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const response = await axiosInstance.get(apiRoutes.organizations.base);
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchOrganizations();
  }, []);

  const handleAddApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, organizationId, ...rest } = applicationFormData;
      if (!organizationId) {
        console.error('Organization ID is required to create an application');
        return;
      }
      await axiosInstance.post(apiRoutes.applications.byOrganization(organizationId), rest);
      setFormVisible(false);
      setApplicationFormData(initialApplicationFormData);
      fetchApplications();
    } catch (error) {
      console.error('Error adding application:', error);
    }
  };

  const handleEditApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationFormData.id) return;
    try {
      await axiosInstance.put(`${apiRoutes.applications.base}/${applicationFormData.id}`, applicationFormData);
      setFormVisible(false);
      setEditingApplication(null);
      setApplicationFormData(initialApplicationFormData);
      fetchApplications();
    } catch (error) {
      console.error('Error editing application:', error);
    }
  };

  const handleDeleteApplication = async () => {
    if (!applicationToDelete) return;
    try {
      await axiosInstance.delete(`${apiRoutes.applications.base}/${applicationToDelete.id}`);
      setApplicationToDelete(null);
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const openEditForm = (app: Application) => {
    setEditingApplication(app);
    setApplicationFormData(app);
    setFormVisible(true);
  };

  const openViewForm = (app: Application) => {
    setViewingApplication(app);
    setApplicationFormData(app);
    setFormVisible(true);
  };

  const organizationMap = useMemo(() => {
    return organizations.reduce((acc, org) => {
      acc[org.id] = org.name;
      return acc;
    }, {} as Record<string, string>);
  }, [organizations]);

  const organizationUidMap = useMemo(() => {
    return organizations.reduce((acc, org) => {
      acc[org.id] = org.uid;
      return acc;
    }, {} as Record<string, string>);
  }, [organizations]);

  const actionButton = useMemo(() => {
    // Solo mostrar el botón si tiene permiso de crear
    if (!canCreate()) return null;

    return (
      <button
        onClick={() => {
          setFormVisible(true);
          setEditingApplication(null);
          setApplicationFormData(initialApplicationFormData);
        }}
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
          <span className="relative">Add Application</span>
        </span>
        <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
      </button>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canCreate]);

  const { setLayoutInfo } = useLayout();

  useEffect(() => {
    setLayoutInfo("Applications", !formVisible ? actionButton : undefined);
  }, [formVisible, actionButton, setLayoutInfo]);

  // Pagination logic
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      key: 'name',
      header: 'Application Name',
      render: (app: Application) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-lg font-medium text-gray-300">
              {app.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{app.name}</div>
            <div className="text-sm text-gray-400">UID: {app.uid}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'organization',
      header: 'Organization',
      render: (app: Application) => (
        <div className="text-sm text-gray-400">{organizationMap[app.organizationId]}</div>
      )
    },
    {
      key: 'consumptionUrl',
      header: 'Consumption URL',
      render: (app: Application) => (
        <div className="text-sm text-gray-400">{`${window.location.origin}/config/v1/${organizationUidMap[app.organizationId]}/${app.uid}`}</div>
      )
    }
  ];

  const actions = [
    {
      label: 'View',
      onClick: openViewForm,
      icon: (
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      className: 'bg-blue-500 hover:bg-blue-600',
      shouldShow: (app: Application) => {
        const orgId = typeof app.organizationId === 'string' ? parseInt(app.organizationId) : app.organizationId;
        const appId = typeof app.id === 'string' ? parseInt(app.id) : app.id;
        // Mostrar View si puede leer PERO NO puede actualizar
        return canRead(orgId, appId) && !canUpdate(orgId, appId);
      },
    },
    {
      label: 'Edit',
      onClick: openEditForm,
      icon: (
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
        </svg>
      ),
      className: 'bg-yellow-500 hover:bg-yellow-600',
      shouldShow: (app: Application) => {
        // Convertir string id a number para la comparación
        const orgId = typeof app.organizationId === 'string' ? parseInt(app.organizationId) : app.organizationId;
        const appId = typeof app.id === 'string' ? parseInt(app.id) : app.id;
        return canUpdate(orgId, appId);
      },
    },
    {
      label: 'Delete',
      onClick: (app: Application) => setApplicationToDelete(app),
      icon: (
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      className: 'bg-red-500 hover:bg-red-600',
      shouldShow: (app: Application) => {
        // Convertir string id a number para la comparación
        const orgId = typeof app.organizationId === 'string' ? parseInt(app.organizationId) : app.organizationId;
        const appId = typeof app.id === 'string' ? parseInt(app.id) : app.id;
        return canDelete(orgId, appId);
      },
    },
  ];

  return (
    <>
      {formVisible && (
        <div className="mb-6 bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            {viewingApplication ? 'View Application' : (editingApplication ? 'Edit Application' : 'Add Application')}
          </h2>

          {/* Organization Selector - Only show when adding new application */}
          {!editingApplication && !viewingApplication && (
            <div className="mb-4">
              <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                Organization
              </label>
              <select
                id="organization"
                value={applicationFormData.organizationId || ''}
                onChange={(e) => setApplicationFormData({ ...applicationFormData, organizationId: e.target.value })}
                className="w-full bg-gray-800/50 border border-gray-700 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              >
                <option value="">Select an organization</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </select>
            </div>
          )}

          <ApplicationForm
            formData={applicationFormData}
            setFormData={setApplicationFormData}
            onSubmit={editingApplication ? handleEditApplication : handleAddApplication}
            onCancel={() => {
              setFormVisible(false);
              setEditingApplication(null);
              setViewingApplication(null);
              setApplicationFormData(initialApplicationFormData);
            }}
            readOnly={!!viewingApplication}
          />
        </div>
      )}

      {!formVisible && (
        <Table
          data={paginatedApplications}
          columns={columns}
          actions={actions}
          emptyStateMessage="No applications"
          emptyStateDescription="Get started by creating a new application."
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
          }}
        />
      )}

      {applicationToDelete && (
        <ConfirmModal
          isOpen={true}
          onClose={() => setApplicationToDelete(null)}
          onConfirm={handleDeleteApplication}
          title="Delete Application"
          message={
            <div className="space-y-4">
              <div className="text-gray-300">
                Are you sure you want to delete the application{' '}
                <span className="font-semibold text-white">
                  {applicationToDelete.name}
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
      )}
    </>
  );
};

export default ApplicationsPage;