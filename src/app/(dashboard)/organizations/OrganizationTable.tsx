import React from 'react';
import { Organization } from '@/types/models'; // Assuming Organization type is in models.ts
import Table from '@/components/Table'; // Import the generic Table component

interface OrganizationTableProps {
  organizations: Organization[];
  onEdit: (org: Organization) => void;
  onDelete: (id: string) => void;
}

const OrganizationTable = ({ organizations, onEdit, onDelete }: OrganizationTableProps) => {
  const columns = [
    {
      key: 'uid',
      header: 'UID',
      className: 'text-gray-900',
    },
    {
      key: 'name',
      header: 'Nombre',
      className: 'font-bold text-gray-900',
    },
    {
      key: 'description',
      header: 'Descripción',
      className: 'font-bold text-gray-900',
    },
  ];

  const actions = [
    {
      label: 'Editar',
      onClick: onEdit,
      className: 'bg-yellow-500 hover:bg-yellow-600',
    },
    {
      label: 'Eliminar',
      onClick: (org: Organization) => onDelete(org.id),
      className: 'bg-red-500 hover:bg-red-600',
    },
  ];

  return (
    <Table
      data={organizations}
      columns={columns}
      actions={actions}
      emptyStateMessage="No organizations"
      emptyStateDescription="Get started by creating a new organization."
    />
  );
};

export default OrganizationTable;