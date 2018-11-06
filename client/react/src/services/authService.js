import { httpService } from './httpService'

const updateToken = (token) => localStorage.setItem('TOKEN', token)

const login = user =>
  httpService.postNotAuthenticated('/token', user)
    .then(res => {
      updateToken(res.token)
      return httpService.get('/account')
    }).catch(err => { throw err })

const logout = () => updateToken(null)

export const authService = {
  logout,
  login
}