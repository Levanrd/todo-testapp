import { getTasks, getTaskById, createTask, updateTask, deleteTask } from './services/taskServices/'
import authServices from '../../services/authServices'
import Swal from 'sweetalert2'
import { format } from 'date-fns'
import moment from 'moment'

export default {
  data() {
    return {
      drawer: null,
      tasks: [],
      task: {
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        completed: false
      },
      headers: [
        { text: '#', value: 'index' },
        { text: 'Title', value: 'title', width: '400px' },
        { text: 'Due Date', value: 'dueDate' },
        { text: 'Status', value: 'completed' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      taskModal: false,
      viewTaskModal: false,
      isEditMode: false,
      localDueDate: '',
      dueDateMenu: false,
      loading: false,
      activeTab: null
    }
  },
  mounted() {
    this.loadTasks()
  },
  methods: {
    async loadTasks() {
      this.loading = true
      try {
        this.tasks = await getTasks()
      } catch (error) {
        console.error('Error loading tasks:', error)
      } finally {
        this.loading = false
      }
    },

    showAddTaskModal() {
      this.isEditMode = false
      this.task = { 
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        completed: false
      }
      this.localDueDate = ''
      this.taskModal = true
    },

    showEditTaskModal(task) {
      this.isEditMode = true
      this.localDueDate = task.dueDate && moment(task.dueDate).isValid() ? moment(task.dueDate).format('YYYY-MM-DD') : ''
      this.task = { ...task }
      this.taskModal = true
    },

    showViewTaskModal(task) {
      this.task = { ...task }
      this.viewTaskModal = true
    },

    closeTaskModal() {
      this.taskModal = false
    },

    closeViewTaskModal() {
      this.viewTaskModal = false
    },

    async saveTask() {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: this.isEditMode ? 'Do you want to update this task?' : 'Do you want to create this task?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        })

        if (result.isConfirmed) {
          if (this.task.dueDate) {
            this.task.dueDate = moment(this.task.dueDate).toISOString()
          }

          if (this.isEditMode) {
            await updateTask(this.task._id, this.task)
          } else {
            await createTask(this.task)
          }
          this.taskModal = false
          await this.loadTasks()
          Swal.fire('Success', 'Task saved successfully', 'success')
        }
      } catch (error) {
        let errorMessage = error.response.data.error
        Swal.fire('Error', `${errorMessage}`, 'error')
      }
    },

    async deleteTask(id) {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to delete this task?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        })

        if (result.isConfirmed) {
          await deleteTask(id)
          await this.loadTasks()
          Swal.fire('Deleted!', 'Task deleted successfully', 'success')
        }
      } catch (error) {
        let errorMessage = error.response.data.error
        Swal.fire('Error', `${errorMessage}`, 'error')
      }
    },

    updateLocalDueDate(date) {
      if (date && moment(date).isValid()) {
        this.task.dueDate = date
        this.localDueDate = moment(date).format('YYYY-MM-DD')
      } else {
        this.task.dueDate = ''
        this.localDueDate = ''
      }
      this.dueDateMenu = false
    },

    formatDueDate(date) {
      return date && moment(date).isValid() ? moment(date).format('MMM DD, YYYY') : ''
    },

    logout() {
      try {
        this.$store.dispatch('logout')
        this.$router.push('/')
      } catch (e) {
        console.error('Error logging out:', e)
      }
    }
  }
}

