// Debug script to check API responses
const API_BASE_URL = 'http://localhost:8888/rapid-config-server/api';

async function checkAPIs() {
    try {
        console.log('Fetching organizations...');
        const orgsResponse = await fetch(`${API_BASE_URL}/organizations`);
        const orgs = await orgsResponse.json();
        console.log('Organizations:', JSON.stringify(orgs, null, 2));

        console.log('\nFetching counts...');
        const countsResponse = await fetch(`${API_BASE_URL}/organizations/counts`);
        const counts = await countsResponse.json();
        console.log('Counts:', JSON.stringify(counts, null, 2));

        console.log('\nMerging data...');
        const orgsWithCounts = orgs.map(org => ({
            ...org,
            applicationsCount: counts[org.id] || 0,
        }));
        console.log('Organizations with counts:', JSON.stringify(orgsWithCounts, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

checkAPIs();
