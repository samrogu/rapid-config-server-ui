import React from 'react';
import { Permission, Organization, Application } from '@/types/models'; // Assuming types are in models.ts
import Table from '@/components/Table'; // Import the generic Table component

interface PermissionTableProps {
  permissions: Permission[];
  onEdit: (permission: Permission) => void;
  onDelete: (id: string) => void;
  organizations: Organization[];
  applications: Application[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const PermissionTable = ({ permissions, onEdit, onDelete, organizations, applications, pagination }: PermissionTableProps) => {
  const getOrgName = (id: string) => { // Changed id type to string based on common practice
    const org = organizations.find((o: Organization) => o.id === id);
    return org ? org.name : id;
  };

  const getAppName = (id: string) => { // Changed id type to string based on common practice
    const app = applications.find((a: Application) => a.id === id);
    return app ? app.name : id;
  };

  const columns = [
    {
      key: 'username',
      header: 'User',
      className: 'px-4 py-2',
    },
    {
      key: 'organizationId',
      header: 'Organization',
      render: (permission: Permission) => (
        <span className="px-4 py-2">{getOrgName(permission.organizationId)}</span>
      ),
    },
    {
      key: 'applicationId',
      header: 'Application',
      render: (permission: Permission) => (
        <span className="px-4 py-2">{getAppName(permission.applicationId)}</span>
      ),
    },
    {
      key: 'canRead',
      header: 'Read',
      render: (permission: Permission) => (
        <span className="px-4 py-2 text-center">{permission.canRead ? '✓' : '-'}</span>
      ),
      headerClassName: 'text-center',
    },
    {
      key: 'canCreate',
      header: 'Create',
      render: (permission: Permission) => (
        <span className="px-4 py-2 text-center">{permission.canCreate ? '✓' : '-'}</span>
      ),
      headerClassName: 'text-center',
    },
    {
      key: 'canUpdate',
      header: 'Update',
      render: (permission: Permission) => (
        <span className="px-4 py-2 text-center">{permission.canUpdate ? '✓' : '-'}</span>
      ),
      headerClassName: 'text-center',
    },
    {
      key: 'canDelete',
      header: 'Delete',
      render: (permission: Permission) => (
        <span className="px-4 py-2 text-center">{permission.canDelete ? '✓' : '-'}</span>
      ),
      headerClassName: 'text-center',
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: onEdit,
      className: 'bg-yellow-600 hover:bg-yellow-700',
    },
    {
      label: 'Delete',
      onClick: (permission: Permission) => onDelete(permission.id),
      className: 'bg-red-600 hover:bg-red-700',
    },
  ];

  return (
    <Table
      data={permissions}
      columns={columns}
      actions={actions}
      emptyStateMessage="No permissions"
      emptyStateDescription="Get started by creating a new permission."
      pagination={pagination}
    />
  );
};

export default PermissionTable;