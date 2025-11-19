import React from 'react';
import Input from './Input';
import Select from './Select';
import Checkbox from './Checkbox';
import SecretInput from './SecretInput';

import { Application } from '@/types/models';

interface ApplicationFormProps {
  formData: Partial<Application>;
  setFormData: (data: Partial<Application>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const ApplicationForm = ({ formData, setFormData, onSubmit, onCancel }: ApplicationFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;

    let newValue: string | boolean = value;
    if (target.type === 'checkbox') {
      newValue = (target as HTMLInputElement).checked;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const vaultAuthMethodOptions = [
    { value: 'TOKEN', label: 'Token' },
    { value: 'APPROLE', label: 'AppRole' },
    { value: 'USERPASS', label: 'UserPass' },
  ];

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Name */}
        <Input
          label="Name"
          id="name"
          name="name"
          placeholder="Enter application name"
          value={formData.name || ''}
          onChange={handleInputChange}
          required
        />

        {/* Campo Description */}
        <Input
          label="Description"
          id="description"
          name="description"
          placeholder="Enter application description"
          value={formData.description || ''}
          onChange={handleInputChange}
          required
        />

        {/* Campo URI */}
        <Input
          label="URI"
          id="uri"
          name="uri"
          placeholder="Enter application URI"
          value={formData.uri || ''}
          onChange={handleInputChange}
          required
        />

        {/* Campo Profile */}
        <Input
          label="Profile"
          id="profile"
          name="profile"
          placeholder="Enter profile"
          value={formData.profile || ''}
          onChange={handleInputChange}
        />

        {/* Campo Label */}
        <Input
          label="Label"
          id="label"
          name="label"
          placeholder="Enter label"
          value={formData.label || ''}
          onChange={handleInputChange}
        />

        {/* Campo Enabled */}
        <Checkbox
          label="Enabled"
          id="enabled"
          name="enabled"
          checked={formData.enabled || false}
          onChange={handleInputChange}
        />

        {/* Campo Vault Enabled */}
        <Checkbox
          label="Vault Enabled"
          id="vaultEnabled"
          name="vaultEnabled"
          checked={formData.vaultEnabled || false}
          onChange={handleInputChange}
        />

        {/* Campos adicionales si Vault está habilitado */}
        {formData.vaultEnabled && (
          <>
            {/* Campo Vault URL */}
            <Input
              label="Vault URL"
              id="vaultUrl"
              name="vaultUrl"
              placeholder="Enter Vault URL"
              value={formData.vaultUrl || ''}
              onChange={handleInputChange}
              required
            />

            <Select
              label="Vault Auth Method"
              id="vaultAuthMethod"
              name="vaultAuthMethod"
              value={formData.vaultAuthMethod || ''}
              onChange={handleInputChange}
              options={vaultAuthMethodOptions}
              defaultOptionLabel="Select Vault Auth Method"
              required
            />

            <Input
              label="Secret Engine"
              id="secretEngine"
              name="secretEngine"
              placeholder="Enter secret engine"
              value={formData.secretEngine || ''}
              onChange={handleInputChange}
              required
            />

            {/* Campos condicionales según el método de autenticación */}
            {formData.vaultAuthMethod === 'TOKEN' && (
              <SecretInput
                label="Vault Token"
                id="vaultToken"
                name="vaultToken"
                placeholder="Enter vault token"
                value={formData.vaultToken || ''}
                onChange={handleInputChange}
                required
              />
            )}

            {formData.vaultAuthMethod === 'APPROLE' && (
              <>
                <Input
                  label="AppRole ID"
                  id="appRoleId"
                  name="appRoleId"
                  placeholder="Enter AppRole ID"
                  value={formData.appRoleId || ''}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="AppRole Secret"
                  id="appRoleSecret"
                  name="appRoleSecret"
                  placeholder="Enter AppRole Secret"
                  value={formData.appRoleSecret || ''}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {formData.vaultAuthMethod === 'USERPASS' && (
              <>
                <Input
                  label="Vault Username"
                  id="vaultUsername"
                  name="vaultUsername"
                  placeholder="Enter Vault Username"
                  value={formData.vaultUsername || ''}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Vault Password"
                  id="vaultPassword"
                  name="vaultPassword"
                  placeholder="Enter Vault Password"
                  value={formData.vaultPassword || ''}
                  onChange={handleInputChange}
                  type="password" // Explicitly set type for password input
                  required
                />
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
