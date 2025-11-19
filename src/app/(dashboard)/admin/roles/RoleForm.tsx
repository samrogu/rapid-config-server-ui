import React from 'react';
import Input from '@/components/Input';
import { Role } from '@/types/models'; // Import the generic Input component



interface RoleFormProps {
  formData: Partial<Role>;
  setFormData: (data: Partial<Role>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const RoleForm = ({ formData, setFormData, onSubmit, onCancel }: RoleFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Campo Name */}
      <Input
        label="Role Name"
        id="name"
        name="name"
        placeholder="Enter role name"
        value={formData.name || ''}
        onChange={handleInputChange}
        required
      />

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

export default RoleForm;
