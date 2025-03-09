import api from '@/services/axios'

// Fighter-related endpoints
export const getFighters = () => api.get('/fighters')
export const getFighterById = (id) => api.get(`/fighters/${id}`)
export const createFighter = (data) => api.post('/fighters', data)
export const updateFighter = (id, data) => api.put(`/fighters/${id}`, data)
export const deleteFighter = (id) => api.delete(`/fighters/${id}`)
