export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const defaultConfig: RequestInit = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}/api/v1${endpoint}`;
  
  const headers = { ...defaultConfig.headers, ...options.headers };
  
  const res = await fetch(url, {
    ...defaultConfig,
    ...options,
    headers,
    credentials: 'include', // Include HttpOnly cookies
  });

  if (!res.ok) {
    let errorMsg = 'An error occurred';
    try {
      const errData = await res.json();
      errorMsg = errData.detail || errorMsg;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMsg);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export const api = {
  auth: {
    login: (data: any) => fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    logout: () => fetchAPI('/auth/logout', { method: 'POST' }),
    refresh: () => fetchAPI('/auth/refresh', { method: 'POST' }),
    me: () => fetchAPI('/auth/me', { method: 'GET' }),
  },
  donors: {
    list: () => fetchAPI('/donors', { method: 'GET' }),
    get: (id: string) => fetchAPI(`/donors/${id}`, { method: 'GET' }),
  },
  offers: {
    list: () => fetchAPI('/offers', { method: 'GET' }),
    get: (id: string) => fetchAPI(`/offers/${id}`, { method: 'GET' }),
  },
  recipients: {
    list: () => fetchAPI('/recipients', { method: 'GET' }),
    get: (id: string) => fetchAPI(`/recipients/${id}`, { method: 'GET' }),
  },
  labs: {
    getByRecipient: (id: string) => fetchAPI(`/labs/recipient/${id}`, { method: 'GET' }),
    getByDonor: (id: string) => fetchAPI(`/labs/donor/${id}`, { method: 'GET' }),
  },
  matches: {
    runMatch: (offerId: string) => fetchAPI(`/offers/${offerId}/match`, { method: 'POST' }),
    getRun: (id: string) => fetchAPI(`/runs/${id}`, { method: 'GET' }),
    recordDecision: (runId: string, data: any) => fetchAPI(`/runs/${runId}/decisions`, { method: 'POST', body: JSON.stringify(data) }),
  },
  sim: {
    runMatch: (data: any) => fetchAPI('/sim/match', { method: 'POST', body: JSON.stringify(data) }),
  },
  audit: {
    verify: () => fetchAPI('/audit/verify', { method: 'GET' }),
    proof: (seq: number) => fetchAPI(`/audit/proof/${seq}`, { method: 'GET' }),
    replay: (runId: string) => fetchAPI(`/runs/${runId}/replay`, { method: 'POST' }),
  },
  fhir: {
    getBundle: (runId: string) => fetchAPI(`/fhir/runs/${runId}/bundle`, { method: 'GET' }),
  }
};
