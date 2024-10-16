import LoginCard from '../components/login-card/index.vue'

export default {
  name: 'App',
  components: {
    LoginCard
  },
  data() {
    return {
      isAuthenticated: false
    }
  },
  computed: {
    showLoginModal() {
      return this.$route.path === '/'
    }
  }
}