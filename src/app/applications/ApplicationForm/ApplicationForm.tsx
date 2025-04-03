'use client';

import { useState } from 'react';

interface ApplicationFormProps {
  selectedOrganization: string;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  selectedOrganization,
  formData,
  setFormData,
  onSubmit,
  onCancel,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {formData.id ? 'Update Application' : 'Create Application'}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="uri"
            placeholder="URI"
            value={formData.uri}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="profile"
            placeholder="Profile"
            value={formData.profile}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="label"
            placeholder="Label"
            value={formData.label}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="text"
            name="vaultUrl"
            placeholder="Vault URL"
            value={formData.vaultUrl}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="secretEngine"
            placeholder="Secret Engine"
            value={formData.secretEngine}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="vaultToken"
            placeholder="Vault Token"
            value={formData.vaultToken}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              name="enabled"
              checked={formData.enabled}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label className="text-gray-900">Enabled</label>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {formData.id ? 'Update' : 'Create'}
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
    </div>
  );
};

export default ApplicationForm;