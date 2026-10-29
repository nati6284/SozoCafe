import { API_BASE } from './config'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}), ...options.headers },
    ...options,
  })
  const text = await response.text()
  const data = text ? (() => { try { return JSON.parse(text) } catch { return text } })() : null
  if (!response.ok) throw new Error(data?.message || data?.error || `Request failed (${response.status})`)
  return data
}
export const api = {
  menu: () => request('/menu'),
  adminLogin: payload => request('/admin/login', { method: 'POST', body: JSON.stringify(payload) }),
  createMenuItem: (payload, token) => request('/admin/menu', { method: 'POST', token, body: JSON.stringify(payload) }),
  updateMenuItem: (id, payload, token) => request(`/admin/menu/${id}`, { method: 'PUT', token, body: JSON.stringify(payload) }),
  deleteMenuItem: (id, token) => request(`/admin/menu/${id}`, { method: 'DELETE', token }),
}
