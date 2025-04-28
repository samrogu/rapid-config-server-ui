import React from 'react';

const OrganizationTable = ({ organizations, onEdit, onDelete }: any) => {
  return (
    <table className="w-full border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">UID</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Nombre</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Descripción</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {organizations.map((org: any) => (
          <tr key={org.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2 text-gray-900">{org.uid}</td>
            <td className="border border-gray-300 p-2 font-bold text-gray-900">{org.name}</td>
            <td className="border border-gray-300 p-2 font-bold text-gray-900">{org.description}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onEdit(org)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(org.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrganizationTable;