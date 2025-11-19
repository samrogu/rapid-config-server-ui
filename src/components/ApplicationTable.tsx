import React from 'react';
import { Application } from '@/types/models';
import Table from './Table'; // Import the generic Table component

interface ApplicationTableProps {
  applications: Application[];
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

const ApplicationTable = ({ applications, onEdit, onDelete, pagination }: ApplicationTableProps) => {
  const columns = [
    {
      key: 'name',
      header: 'Application',
      render: (app: Application) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <span className="text-lg font-medium text-blue-400">
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
      key: 'description',
      header: 'Description',
      render: (app: Application) => (
        <div className="text-sm text-gray-300 max-w-xs truncate">
          {app.description || '-'}
        </div>
      ),
    },
    {
      key: 'uri',
      header: 'URI',
      render: (app: Application) => (
        <div className="text-sm text-gray-300">
          <code className="px-2 py-1 bg-gray-700 rounded-md text-xs">
            {app.uri}
          </code>
        </div>
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
      onClick: onDelete,
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
      data={applications}
      columns={columns}
      actions={actions}
      emptyStateMessage="No applications"
      emptyStateDescription="Get started by creating a new application."
      pagination={pagination}
    />
  );
};

export default ApplicationTable;
