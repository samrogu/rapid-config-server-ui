import React from 'react';
import Input from '@/components/Input';

import { Role } from '@/types/models'; // Assuming types are in models.ts

interface UserFormData {
  username: string;
  password?: string;
  roles: string[];
}

interface UserFormProps {
  formData: UserFormData;
  setFormData: (data: UserFormData) => void;
  roles: Role[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const UserForm = ({ formData, setFormData, roles, onSubmit, onCancel }: UserFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Campo Username */}
      <Input
        label="Username"
        id="username"
        name="username"
        placeholder="Enter username"
        value={formData.username || ''}
        onChange={handleInputChange}
        required
      />

      {/* Campo Password */}
      <Input
        label="Password"
        id="password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={formData.password || ''}
        onChange={handleInputChange}
        required
      />

      {/* Campo Roles */}
      {/* Campo Roles */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Roles</label>
        <div className="space-y-2">
          {roles.map((role) => (
            <div key={role.id} className="flex items-center">
              <input
                type="checkbox"
                id={`role-${role.id}`}
                name="roles"
                value={role.name}
                checked={formData.roles.includes(role.name)}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  const currentRoles = formData.roles;
                  if (checked) {
                    setFormData({ ...formData, roles: [...currentRoles, value] });
                  } else {
                    setFormData({ ...formData, roles: currentRoles.filter((r) => r !== value) });
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`role-${role.id}`} className="ml-2 block text-sm text-gray-300">
                {role.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default UserForm;
