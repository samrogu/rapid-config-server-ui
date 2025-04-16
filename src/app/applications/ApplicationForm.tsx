import React from 'react';

const ApplicationForm = ({ formData, setFormData, onSubmit, onCancel }: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ''}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description || ''}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="uri"
          placeholder="URI"
          value={formData.uri || ''}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="profile"
          placeholder="Profile"
          value={formData.profile || ''}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          name="label"
          placeholder="Label"
          value={formData.label || ''}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="enabled"
            checked={formData.enabled || false}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-gray-900">Enabled</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="vaultEnabled"
            checked={formData.vaultEnabled || false}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-gray-900">Vault Enabled</label>
        </div>
        {formData.vaultEnabled && (
          <>
            <select
              name="vaultAuthMethod"
              value={formData.vaultAuthMethod || ''}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Vault Auth Method</option>
              <option value="TOKEN">Token</option>
              <option value="APPROLE">AppRole</option>
              <option value="USERPASS">UserPass</option>
            </select>
            <input
              type="text"
              name="secretEngine"
              placeholder="Secret Engine"
              value={formData.secretEngine || ''}
              onChange={handleInputChange}
              className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {formData.vaultAuthMethod === 'TOKEN' && (
              <input
                type="text"
                name="vaultToken"
                placeholder="Vault Token"
                value={formData.vaultToken || ''}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            )}
            {formData.vaultAuthMethod === 'APPROLE' && (
              <>
                <input
                  type="text"
                  name="appRoleId"
                  placeholder="App Role ID"
                  value={formData.appRoleId || ''}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="text"
                  name="appRoleSecret"
                  placeholder="App Role Secret"
                  value={formData.appRoleSecret || ''}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </>
            )}
            {formData.vaultAuthMethod === 'USERPASS' && (
              <>
                <input
                  type="text"
                  name="vaultUsername"
                  placeholder="Vault Username"
                  value={formData.vaultUsername || ''}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <input
                  type="password"
                  name="vaultPassword"
                  placeholder="Vault Password"
                  value={formData.vaultPassword || ''}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </>
            )}
          </>
        )}
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

export default ApplicationForm;