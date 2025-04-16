import React from 'react';

const OrganizationForm = ({
  formData,
  setFormData,
  editingOrg,
  setEditingOrg,
  onSubmit,
}: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleInputChange}
          className="border border-gray-400 rounded-lg p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editingOrg ? 'Actualizar' : 'Crear'}
        </button>
        {editingOrg && (
          <button
            type="button"
            onClick={() => {
              setEditingOrg(null);
              setFormData({ name: '', description: '' });
            }}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default OrganizationForm;