import React from 'react';

const PermissionTable = ({ permissions, onEdit, onDelete, organizations, applications }: any) => {
  const getOrgName = (id: number) => {
    const org = organizations.find((o: any) => o.id === id);
    return org ? org.name : id;
  };

  const getAppName = (id: number) => {
    const app = applications.find((a: any) => a.id === id);
    return app ? app.name : id;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Organization</th>
            <th className="px-4 py-2 text-left">Application</th>
            <th className="px-4 py-2 text-center">Read</th>
            <th className="px-4 py-2 text-center">Create</th>
            <th className="px-4 py-2 text-center">Update</th>
            <th className="px-4 py-2 text-center">Delete</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm: any) => (
            <tr key={perm.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="px-4 py-2">{perm.username}</td>
              <td className="px-4 py-2">{getOrgName(perm.organizationId)}</td>
              <td className="px-4 py-2">{getAppName(perm.applicationId)}</td>
              <td className="px-4 py-2 text-center">{perm.canRead ? '✓' : '-'}</td>
              <td className="px-4 py-2 text-center">{perm.canCreate ? '✓' : '-'}</td>
              <td className="px-4 py-2 text-center">{perm.canUpdate ? '✓' : '-'}</td>
              <td className="px-4 py-2 text-center">{perm.canDelete ? '✓' : '-'}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onEdit(perm)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(perm.id)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionTable;
