const API_BASE_URL = 'http://localhost:8888/rapid-config-server/api';

const apiRoutes = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  applications: {
    base: `${API_BASE_URL}/applications`,
    byOrganization: (organizationId: string) =>
      `${API_BASE_URL}/applications/organization/${organizationId}`,
  },
  organizations: {
    base: `${API_BASE_URL}/organizations`,
  },
};

export default apiRoutes;