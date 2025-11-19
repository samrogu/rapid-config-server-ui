import { OrganizationUser } from '@/types/models';

const UsersTable = ({
  users,
  onAdd,
  onRemove,
}: {
  users: OrganizationUser[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users</h2>
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add User
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-700 rounded-lg">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-3 text-left font-bold">Name</th>
            <th className="border border-gray-700 p-3 text-left font-bold">Email</th>
            <th className="border border-gray-700 p-3 text-left font-bold">Role</th>
            <th className="border border-gray-700 p-3 text-left font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-700">
              <td className="border border-gray-700 p-3">{user.name}</td>
              <td className="border border-gray-700 p-3">{user.email}</td>
              <td className="border border-gray-700 p-3">{user.role}</td>
              <td className="border border-gray-700 p-3">
                <button
                  onClick={() => onRemove(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;