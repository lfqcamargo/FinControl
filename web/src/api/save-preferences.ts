import { api } from '@/lib/axios'

export interface SavePreferencesRequest {
  notificationPhone: boolean
  notificationEmail: boolean
  notificationBudgets: boolean
  notificationReports: boolean
}

export interface SavePreferencesResponse {
  preferences: {
    notificationPhone: boolean
    notificationEmail: boolean
    notificationBudgets: boolean
    notificationReports: boolean
  }
}

export async function savePreferences(
  data: SavePreferencesRequest,
): Promise<SavePreferencesResponse> {
  const response = await api.put('/preferences', data)
  return response.data
}
