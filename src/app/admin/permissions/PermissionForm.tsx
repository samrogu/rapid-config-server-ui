import React from 'react';

const PermissionForm = ({ formData, setFormData, users, organizations, applications, onSubmit, onCancel }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
          User
        </label>
        <select
          id="username"
          name="username"
          value={formData.username || ''}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select user</option>
          {users.map((u: any) => (
            <option key={u.username} value={u.username}>
              {u.username}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="organizationId" className="block text-sm font-medium text-gray-300 mb-1">
          Organization
        </label>
        <select
          id="organizationId"
          name="organizationId"
          value={formData.organizationId || ''}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select organization</option>
          {organizations.map((o: any) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="applicationId" className="block text-sm font-medium text-gray-300 mb-1">
          Application
        </label>
        <select
          id="applicationId"
          name="applicationId"
          value={formData.applicationId || ''}
          onChange={handleChange}
          className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select application</option>
          {applications.map((a: any) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center">
          <input type="checkbox" name="canRead" checked={formData.canRead || false} onChange={handleChange} className="mr-2" />
          Read
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="canCreate" checked={formData.canCreate || false} onChange={handleChange} className="mr-2" />
          Create
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="canUpdate" checked={formData.canUpdate || false} onChange={handleChange} className="mr-2" />
          Update
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="canDelete" checked={formData.canDelete || false} onChange={handleChange} className="mr-2" />
          Delete
        </label>
      </div>
      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
          Save
        </button>
      </div>
    </form>
  );
};

export default PermissionForm;
