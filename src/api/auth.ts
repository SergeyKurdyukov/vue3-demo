import api from '.'

const auth = api('/auth/login')

export default {
  login: (credentials: {
    email: string
    password: string
  }): Promise<{
    access_token: string
    refresh_token: string
  }> => auth.post(credentials),
}
