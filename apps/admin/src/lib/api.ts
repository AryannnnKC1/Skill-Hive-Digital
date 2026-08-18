const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://skill-hive-digital.onrender.com/api';

function ensureApiBase(base: string) {
  const trimmed = base.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

export const API_BASE = ensureApiBase(rawBaseUrl);

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('admin_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Auth
export async function adminLogin(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }
  const data = await res.json();
  if (data.user.role !== 'admin') {
    throw new Error('Access denied. Admin privileges required.');
  }
  localStorage.setItem('admin_token', data.token);
  localStorage.setItem('admin_user', JSON.stringify(data.user));
  return data;
}

export function adminLogout() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
}

export function getAdminUser() {
  const user = localStorage.getItem('admin_user');
  return user ? JSON.parse(user) : null;
}

// Dashboard
export async function fetchDashboardData() {
  const res = await fetch(`${API_BASE}/admin/dashboard`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch dashboard');
  return res.json();
}

// Users
export async function fetchUsers(params?: { search?: string; page?: number; limit?: number; role?: string }) {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.role) queryParams.append('role', params.role);

  const res = await fetch(`${API_BASE}/admin/users?${queryParams}`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(data: { fullName: string; email: string; password: string; role?: string }) {
  const res = await fetch(`${API_BASE}/admin/users`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create user');
  }
  return res.json();
}

export async function updateUser(id: string, data: { fullName?: string; email?: string; role?: string }) {
  const res = await fetch(`${API_BASE}/admin/users/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API_BASE}/admin/users/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
}

// Resources
export async function fetchResources() {
  const res = await fetch(`${API_BASE}/resources`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch resources');
  const data = await res.json();
  return data.resources;
}

export async function createResource(data: any) {
  const res = await fetch(`${API_BASE}/resources`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create resource');
  }
  return res.json();
}

export async function updateResource(id: string, data: any) {
  const res = await fetch(`${API_BASE}/resources/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update resource');
  return res.json();
}

export async function deleteResource(id: string) {
  const res = await fetch(`${API_BASE}/resources/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete resource');
  return res.json();
}

// Assessments
export async function fetchAssessments() {
  const res = await fetch(`${API_BASE}/assessments/all`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch assessments');
  const data = await res.json();
  return data.assessments || [];
}

export async function createAssessment(data: { title: string; questions: any[] }) {
  const res = await fetch(`${API_BASE}/assessments`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create assessment');
  return res.json();
}

export async function updateAssessment(id: string, data: { title?: string; questions?: any[] }) {
  const res = await fetch(`${API_BASE}/assessments/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update assessment');
  return res.json();
}

export async function deleteAssessment(id: string) {
  const res = await fetch(`${API_BASE}/assessments/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete assessment');
  return res.json();
}

// Categories
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/admin/categories`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.categories || [];
}

// Careers
export async function fetchCareers(params?: { search?: string; category?: string }) {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('q', params.search);
  if (params?.category) queryParams.append('category', params.category);

  const res = await fetch(`${API_BASE}/careers/search?${queryParams}`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch careers');
  const data = await res.json();
  return data.careers || [];
}

export async function createCareer(data: any) {
  const res = await fetch(`${API_BASE}/careers`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create career');
  }
  return res.json();
}

export async function updateCareer(id: string, data: any) {
  const res = await fetch(`${API_BASE}/careers/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update career');
  return res.json();
}

export async function deleteCareer(id: string) {
  const res = await fetch(`${API_BASE}/careers/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete career');
  return res.json();
}
