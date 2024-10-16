import ApiConnector from '../../api/ApiConnector'

const authServices = {
  async login(email, password) {
    try {
      const response = await ApiConnector.post('/auth/login', { email, password })
      return response.data
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  },

  async register(username, firstName, lastName, email, password, role) {
    try {
      const response = await ApiConnector.post('/auth/register', { username, firstName, lastName, email, password, role })
      return response.data
    } catch (error) {
      console.error('Error registering:', error)
      throw error
    }
  },

  async logout() {
    localStorage.removeItem('token')
  }
}

export default authServices