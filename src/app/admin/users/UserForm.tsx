import React from 'react';

const UserForm = ({ formData, setFormData, roles, onSubmit, onCancel }: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedRoles = checked
      ? [...formData.roles, value]
      : formData.roles.filter((role: string) => role !== value);
    setFormData({ ...formData, roles: updatedRoles });
  };

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <div className="col-span-2">
          <label className="block text-sm font-bold text-gray-900 mb-2">Roles</label>
          <div className="flex flex-wrap gap-4">
            {roles.map((role: any) => (
              <label key={role.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={role.name}
                  checked={formData.roles.includes(role.name)}
                  onChange={handleRolesChange}
                  className="mr-2"
                />
                {role.name}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UserForm;