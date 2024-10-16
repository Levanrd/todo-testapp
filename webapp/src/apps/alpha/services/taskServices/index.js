import ApiConnector from '../../../../api/ApiConnector'

export const getTasks = async () => {
  try {
    const response = await ApiConnector.get('/tasks')
    return response.data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

export const getTaskById = async (id) => {
  try {
    const response = await ApiConnector.get(`/tasks/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching task:', error)
    throw error
  }
}

export const createTask = async (task) => {
  try {
    const response = await ApiConnector.post('/tasks', task)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateTask = async (id, task) => {
  try {
    const response = await ApiConnector.put(`/tasks/${id}`, task)
    return response.data
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await ApiConnector.delete(`/tasks/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}