import React from 'react';
import { User } from '@/types/models'; // Assuming User type is in models.ts
import Table from '@/components/Table'; // Import the generic Table component

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const UserTable = ({ users, onEdit, onDelete, pagination }: UserTableProps) => {
  const columns = [
    {
      key: 'username',
      header: 'Username',
      className: 'px-4 py-2',
    },
    {
      key: 'roles',
      header: 'Roles',
      render: (user: User) => (
        <span className="px-4 py-2">{user.roles.join(', ')}</span>
      ),
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
    },
    {
      label: 'Delete',
      onClick: (user: User) => onDelete(user.id),
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
    },
  ];

  return (
    <Table
      data={users}
      columns={columns}
      actions={actions}
      emptyStateMessage="No users"
      emptyStateDescription="Get started by creating a new user."
      pagination={pagination}
    />
  );
};

export default UserTable;
