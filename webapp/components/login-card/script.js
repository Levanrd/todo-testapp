export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', { email: this.form.email, password: this.form.password })
        this.$router.push('/alpha')
      } catch (error) {
        alert('Invalid email or password')
      }
    }
  }
}