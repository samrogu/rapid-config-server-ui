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
        {/* Campo Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter application name"
            value={formData.name || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter application description"
            value={formData.description || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo URI */}
        <div>
          <label htmlFor="uri" className="block text-sm font-medium text-gray-300 mb-1">
            URI
          </label>
          <input
            type="text"
            id="uri"
            name="uri"
            placeholder="Enter application URI"
            value={formData.uri || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Campo Profile */}
        <div>
          <label htmlFor="profile" className="block text-sm font-medium text-gray-300 mb-1">
            Profile
          </label>
          <input
            type="text"
            id="profile"
            name="profile"
            placeholder="Enter profile"
            value={formData.profile || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Label */}
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-300 mb-1">
            Label
          </label>
          <input
            type="text"
            id="label"
            name="label"
            placeholder="Enter label"
            value={formData.label || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo Enabled */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enabled"
            name="enabled"
            checked={formData.enabled || false}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="enabled" className="text-gray-300">
            Enabled
          </label>
        </div>

        {/* Campo Vault Enabled */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="vaultEnabled"
            name="vaultEnabled"
            checked={formData.vaultEnabled || false}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label htmlFor="vaultEnabled" className="text-gray-300">
            Vault Enabled
          </label>
        </div>

        {/* Campos adicionales si Vault está habilitado */}
        {formData.vaultEnabled && (
          <>
            <div>
              <label htmlFor="vaultAuthMethod" className="block text-sm font-medium text-gray-300 mb-1">
                Vault Auth Method
              </label>
              <select
                id="vaultAuthMethod"
                name="vaultAuthMethod"
                value={formData.vaultAuthMethod || ''}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Vault Auth Method</option>
                <option value="TOKEN">Token</option>
                <option value="APPROLE">AppRole</option>
                <option value="USERPASS">UserPass</option>
              </select>
            </div>

            <div>
              <label htmlFor="secretEngine" className="block text-sm font-medium text-gray-300 mb-1">
                Secret Engine
              </label>
              <input
                type="text"
                id="secretEngine"
                name="secretEngine"
                placeholder="Enter secret engine"
                value={formData.secretEngine || ''}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Campos condicionales según el método de autenticación */}
            {formData.vaultAuthMethod === 'TOKEN' && (
              <div>
                <label htmlFor="vaultToken" className="block text-sm font-medium text-gray-300 mb-1">
                  Vault Token
                </label>
                <input
                  type="text"
                  id="vaultToken"
                  name="vaultToken"
                  placeholder="Enter vault token"
                  value={formData.vaultToken || ''}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {formData.vaultAuthMethod === 'APPROLE' && (
              <>
                <div>
                  <label htmlFor="appRoleId" className="block text-sm font-medium text-gray-300 mb-1">
                    AppRole ID
                  </label>
                  <input
                    type="text"
                    id="appRoleId"
                    name="appRoleId"
                    placeholder="Enter AppRole ID"
                    value={formData.appRoleId || ''}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="appRoleSecret" className="block text-sm font-medium text-gray-300 mb-1">
                    AppRole Secret
                  </label>
                  <input
                    type="text"
                    id="appRoleSecret"
                    name="appRoleSecret"
                    placeholder="Enter AppRole Secret"
                    value={formData.appRoleSecret || ''}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
            )}

            {formData.vaultAuthMethod === 'USERPASS' && (
              <>
                <div>
                  <label htmlFor="vaultUsername" className="block text-sm font-medium text-gray-300 mb-1">
                    Vault Username
                  </label>
                  <input
                    type="text"
                    id="vaultUsername"
                    name="vaultUsername"
                    placeholder="Enter Vault Username"
                    value={formData.vaultUsername || ''}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vaultPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Vault Password
                  </label>
                  <input
                    type="password"
                    id="vaultPassword"
                    name="vaultPassword"
                    placeholder="Enter Vault Password"
                    value={formData.vaultPassword || ''}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Botones de acción */}
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