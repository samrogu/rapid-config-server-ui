import React from 'react';
import { Role } from '@/types/models'; // Assuming Role type is in models.ts
import Table from '@/components/Table'; // Import the generic Table component

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const RoleTable = ({ roles, onEdit, onDelete, pagination }: RoleTableProps) => {
  const columns = [
    {
      key: 'name',
      header: 'Role Name',
      className: 'px-4 py-2',
    },
  ];

  const actions = [
    {
      label: 'Edit',
      onClick: onEdit,
      icon: (
        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      className: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      shouldShow: (role: Role) => role.editable !== false, // Mostrar solo si editable es true o undefined
    },
    {
      label: 'Delete',
      onClick: (role: Role) => onDelete(role.id),
      icon: (
        <svg
          className="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      className: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      shouldShow: (role: Role) => role.editable !== false, // Mostrar solo si editable es true o undefined
    },
  ];

  return (
    <Table
      data={roles}
      columns={columns}
      actions={actions}
      emptyStateMessage="No roles"
      emptyStateDescription="Get started by creating a new role."
      pagination={pagination}
    />
  );
};

export default RoleTable;
