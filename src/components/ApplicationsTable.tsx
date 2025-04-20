const ApplicationsTable = ({
  applications,
  onAdd,
  onEdit,
}: {
  applications: any[];
  onAdd: () => void;
  onEdit: (id: string) => void;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Applications</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Application
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-3 text-left font-bold">Name</th>
            <th className="border border-gray-700 p-3 text-left font-bold">Status</th>
            <th className="border border-gray-700 p-3 text-left font-bold">Type</th>
            <th className="border border-gray-700 p-3 text-left font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-700">
              <td className="border border-gray-700 p-3">{app.name}</td>
              <td className="border border-gray-700 p-3">{app.status}</td>
              <td className="border border-gray-700 p-3">{app.type}</td>
              <td className="border border-gray-700 p-3">
                <button
                  onClick={() => onEdit(app.id)}
                  className="bg-gray-700 text-white px-3 py-1 rounded-lg hover:bg-gray-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;