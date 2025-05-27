import { api } from '@/lib/axios'

export interface GetPreferencesResponse {
  preferences: {
    notificationPhone: boolean
    notificationEmail: boolean
    notificationBudgets: boolean
    notificationReports: boolean
  }
}

export async function getPreferences(): Promise<GetPreferencesResponse> {
  const response = await api.get('/preferences')
  return response.data
}
