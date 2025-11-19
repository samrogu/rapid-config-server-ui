import React, { useState, useEffect } from 'react';
import Input from '@/components/Input';
import { Organization } from '@/types/models';

interface OrganizationFormProps {
  organization?: Organization;
  onSubmit: (data: Partial<Organization>) => void;
  onCancel: () => void;
}

const OrganizationForm = ({ organization, onSubmit, onCancel }: OrganizationFormProps) => {
  const [formData, setFormData] = useState<Partial<Organization>>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (organization) {
      setFormData(organization);
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [organization]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name || ''}
          onChange={handleInputChange}
          required
        />
        <Input
          label="Description"
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {organization ? 'Update' : 'Create'}
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

export default OrganizationForm;
