import axios from 'axios'
import type {
  Assessment,
  AssessmentAnswer,
  Career,
  CareerRoadmap,
  RecommendationsResponse,
  Resource,
  SavedCareerRecord,
} from './types'

const rawBase = import.meta.env.VITE_API_URL || 'https://skill-hive-digital.onrender.com'

function ensureApiBase(base: string) {
  const trimmed = base.replace(/\/+$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

export const API_BASE = ensureApiBase(rawBase)

const api = axios.create({
  baseURL: API_BASE,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function fetchSavedCareers() {
  const response = await api.get<{ savedCareers: SavedCareerRecord[] }>('/careers/saved')
  return response.data.savedCareers
}

export async function saveCareer(careerId: string) {
  const response = await api.post<{ saved: SavedCareerRecord }>('/careers/saved', {
    careerId,
  })
  return response.data.saved
}

export async function removeSavedCareer(careerId: string) {
  const response = await api.delete<{ removed: boolean; careerId: string }>(
    `/careers/saved/${careerId}`
  )
  return response.data
}

export async function fetchCareerById(careerId: string) {
  const response = await api.get<{ career: Career }>(`/careers/${careerId}`)
  return response.data.career
}

export async function fetchCareerRoadmap(careerId: string): Promise<CareerRoadmap | null> {
  const career = await fetchCareerById(careerId)
  return career.roadmap ?? null
}

export async function fetchResources(params?: {
  careerField?: string
  skill?: string
  type?: string
  difficulty?: string
  search?: string
}) {
  const response = await api.get<{ resources: Resource[] }>('/resources', {
    params,
  })

  return response.data.resources
}

export async function fetchResourceById(resourceId: string) {
  const response = await api.get<{ resource: Resource }>(
    `/resources/${resourceId}`
  )

  return response.data.resource
}

export async function fetchActiveAssessment() {
  const response = await api.get<{ assessment: Assessment }>('/assessments/active')
  return response.data.assessment
}

export async function submitAssessment(assessmentId: string, answers: AssessmentAnswer[]) {
  const response = await api.post<
    RecommendationsResponse & { submissionId: string }
  >('/assessments/submit', { assessmentId, answers })
  return response.data
}

export async function fetchLatestRecommendations() {
  const response = await api.get<RecommendationsResponse>('/assessments/recommendations')
  return response.data
}

export async function fetchAssessmentStatus(): Promise<{
  hasSubmitted: boolean
  submittedAt: string | null
  assessmentId: string | null
}> {
  const response = await api.get('/assessments/status')
  return response.data
}

export default api
