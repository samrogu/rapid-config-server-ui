const API_BASE_URL = 'http://localhost:8888/rapid-config-server/api';

const apiRoutes = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  users: {
    base: `${API_BASE_URL}/users`,
  },
  roles: {
    base: `${API_BASE_URL}/roles`,
  },
  organizations: {
    base: `${API_BASE_URL}/organizations`,
    counts: `${API_BASE_URL}/organizations/counts`, // Ruta para counts
  },
  applications: {
    base: `${API_BASE_URL}/applications`,
    byOrganization: (organizationId: string) =>
      `${API_BASE_URL}/applications/organization/${organizationId}`,
  },
  userPermissions: {
    base: `${API_BASE_URL}/user-permissions`,
  },
};

export default apiRoutes;