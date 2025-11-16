import api from '../../api'
import type { ILoginResponse, IUser } from './auth.types'

export default {
  login: (credentials: {
    email: string
    password: string
  }): Promise<{
    access_token: string
    refresh_token: string
  }> => api('/auth/login').post(credentials),

  getUserProfile: (token: ILoginResponse['access_token']): Promise<IUser> => {
    const profileApi = api('/auth/profile')
    profileApi.options.headers.Authorization = 'Bearer ' + token
    return profileApi.get()
  },
}
