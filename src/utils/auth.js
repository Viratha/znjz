import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const time = new Date(new Date() * 1 + 7 * 24 * 60 * 60 * 1000)
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: time })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
