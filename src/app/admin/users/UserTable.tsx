import React from 'react';

const UserTable = ({ users, onEdit, onDelete }: any) => {
  return (
    <table className="w-full border-collapse border border-gray-300 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Username</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Roles</th>
          <th className="border border-gray-300 p-2 text-left font-bold text-gray-900">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user: any) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2 text-gray-900">{user.username}</td>
            <td className="border border-gray-300 p-2 text-gray-900">{user.roles.join(', ')}</td>
            <td className="border border-gray-300 p-2">
              <button
                onClick={() => onEdit(user)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
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

export default UserTable;