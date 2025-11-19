import React from 'react';
import Checkbox from '@/components/Checkbox';
import Select from '@/components/Select';
import { User, Organization, Application } from '@/types/models';

interface PermissionFormData {
  username: string;
  organizationId: string;
  applicationId: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

interface PermissionFormProps {
  formData: PermissionFormData;
  setFormData: (data: PermissionFormData) => void;
  users: User[];
  organizations: Organization[];
  applications: Application[];
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const PermissionForm = ({
  formData,
  setFormData,
  users,
  organizations,
  applications,
  onSubmit,
  onCancel,
}: PermissionFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const userOptions = users.map(user => ({ value: user.username, label: user.username }));
  const organizationOptions = organizations.map(org => ({ value: org.id, label: org.name }));
  const applicationOptions = applications.map(app => ({ value: app.id, label: app.name }));

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Select
        label="User"
        id="username"
        name="username"
        value={formData.username || ''}
        onChange={handleChange}
        options={userOptions}
        defaultOptionLabel="Select user"
        required
      />
      <Select
        label="Organization"
        id="organizationId"
        name="organizationId"
        value={formData.organizationId || ''}
        onChange={handleChange}
        options={organizationOptions}
        defaultOptionLabel="Select organization"
        required
      />
      <Select
        label="Application"
        id="applicationId"
        name="applicationId"
        value={formData.applicationId || ''}
        onChange={handleChange}
        options={applicationOptions}
        defaultOptionLabel="Select application"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Checkbox
          label="Read"
          id="canRead"
          name="canRead"
          checked={formData.canRead || false}
          onChange={handleChange}
        />
        <Checkbox
          label="Create"
          id="canCreate"
          name="canCreate"
          checked={formData.canCreate || false}
          onChange={handleChange}
        />
        <Checkbox
          label="Update"
          id="canUpdate"
          name="canUpdate"
          checked={formData.canUpdate || false}
          onChange={handleChange}
        />
        <Checkbox
          label="Delete"
          id="canDelete"
          name="canDelete"
          checked={formData.canDelete || false}
          onChange={handleChange}
        />
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