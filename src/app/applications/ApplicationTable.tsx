import React from 'react';

const ApplicationTable = ({ applications, onEdit, onDelete }: any) => {
  return (
    <table className="w-full border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">UID</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Name</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Description</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">URI</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app: any) => (
          <tr key={app.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2 text-gray-900">{app.uid}</td>
            <td className="border border-gray-300 p-2 text-gray-900">{app.name}</td>
            <td className="border border-gray-300 p-2 text-gray-900">{app.description}</td>
            <td className="border border-gray-300 p-2 text-gray-900">{app.uri}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onEdit(app)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(app.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTable;