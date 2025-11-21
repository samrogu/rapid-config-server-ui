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
  readOnly?: boolean;
}

const ApplicationForm = ({ formData, setFormData, onSubmit, onCancel, readOnly = false }: ApplicationFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (readOnly) return;

    const target = e.target;
    const { name, value } = target;

    let newValue: string | boolean | number = value;
    if (target.type === 'checkbox') {
      newValue = (target as HTMLInputElement).checked;
    } else if (target.type === 'number') {
      newValue = Number(value);
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

  const vaultSchemaOptions = [
    { value: 'http', label: 'HTTP' },
    { value: 'https', label: 'HTTPS' },
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
          disabled={readOnly}
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
          disabled={readOnly}
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
          disabled={readOnly}
        />

        {/* Campo Profile */}
        <Input
          label="Profile"
          id="profile"
          name="profile"
          placeholder="Enter profile"
          value={formData.profile || ''}
          onChange={handleInputChange}
          disabled={readOnly}
        />

        {/* Campo Label */}
        <Input
          label="Label"
          id="label"
          name="label"
          placeholder="Enter label"
          value={formData.label || ''}
          onChange={handleInputChange}
          disabled={readOnly}
        />

        {/* Campo Enabled */}
        <Checkbox
          label="Enabled"
          id="enabled"
          name="enabled"
          checked={formData.enabled || false}
          onChange={handleInputChange}
          disabled={readOnly}
        />

        {/* Campo Vault Enabled */}
        <Checkbox
          label="Vault Enabled"
          id="vaultEnabled"
          name="vaultEnabled"
          checked={formData.vaultEnabled || false}
          onChange={handleInputChange}
          disabled={readOnly}
        />

        {/* Campos adicionales si Vault está habilitado */}
        {formData.vaultEnabled && (
          <div className="col-span-1 md:col-span-2 mt-6 bg-gray-800/30 p-6 rounded-xl border border-gray-700/50 space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-700/50 pb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Vault Configuration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <Select
                containerClassName="md:col-span-3"
                label="Schema"
                id="vaultSchema"
                name="vaultSchema"
                value={formData.vaultSchema || ''}
                onChange={handleInputChange}
                options={vaultSchemaOptions}
                defaultOptionLabel="Select Schema"
                required
                disabled={readOnly}
              />

              <Input
                containerClassName="md:col-span-7"
                label="Host"
                id="vaultUrl"
                name="vaultUrl"
                placeholder="e.g. vault.example.com"
                value={formData.vaultUrl || ''}
                onChange={handleInputChange}
                required
                disabled={readOnly}
              />

              <Input
                containerClassName="md:col-span-2"
                label="Port"
                id="vaultPort"
                name="vaultPort"
                placeholder="8200"
                value={formData.vaultPort || ''}
                onChange={handleInputChange}
                type="number"
                required
                disabled={readOnly}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Auth Method"
                id="vaultAuthMethod"
                name="vaultAuthMethod"
                value={formData.vaultAuthMethod || ''}
                onChange={handleInputChange}
                options={vaultAuthMethodOptions}
                defaultOptionLabel="Select Auth Method"
                required
                disabled={readOnly}
              />

              <Input
                label="Secret Engine"
                id="secretEngine"
                name="secretEngine"
                placeholder="e.g. secret"
                value={formData.secretEngine || ''}
                onChange={handleInputChange}
                required
                disabled={readOnly}
              />
            </div>

            {/* Dynamic Auth Fields - HIDDEN IN READ ONLY MODE */}
            {!readOnly && (
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30">
                {formData.vaultAuthMethod === 'TOKEN' && (
                  <SecretInput
                    containerClassName="w-full"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="AppRole ID"
                      id="appRoleId"
                      name="appRoleId"
                      placeholder="Enter AppRole ID"
                      value={formData.appRoleId || ''}
                      onChange={handleInputChange}
                      required
                    />
                    <SecretInput
                      label="AppRole Secret"
                      id="appRoleSecret"
                      name="appRoleSecret"
                      placeholder="Enter AppRole Secret"
                      value={formData.appRoleSecret || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {formData.vaultAuthMethod === 'USERPASS' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Vault Username"
                      id="vaultUsername"
                      name="vaultUsername"
                      placeholder="Enter Vault Username"
                      value={formData.vaultUsername || ''}
                      onChange={handleInputChange}
                      required
                    />
                    <SecretInput
                      label="Vault Password"
                      id="vaultPassword"
                      name="vaultPassword"
                      placeholder="Enter Vault Password"
                      value={formData.vaultPassword || ''}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {!formData.vaultAuthMethod && (
                  <div className="text-center text-gray-500 text-sm py-2">
                    Select an authentication method to configure credentials
                  </div>
                )}
              </div>
            )}

            {readOnly && (
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/30 text-center text-gray-400 italic">
                Sensitive credentials are hidden in read-only mode.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="mt-6 flex space-x-4">
        {!readOnly && (
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
          >
            Save
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-800/50 border border-gray-700 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-700/50 transition-all duration-200"
        >
          {readOnly ? 'Close' : 'Cancel'}
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
