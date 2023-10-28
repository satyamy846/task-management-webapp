<template>
    <Navbar/>
    <div class="flex">
      <div class="flex-1 container mx-auto p-4">
        <!--
        <h1 class="text-4xl font-extrabold text-blue-600 mb-6">Task Manager</h1>
        -->
        <div class="mb-4 d-flex align-items-center">
          <input
            type="text"
            placeholder="Add a new task"
            class="form-control w-75 rounded-left"
            v-model="task"
          />
          <input
            type="text"
            placeholder="Add a new description"
            class="form-control w-75 rounded-left"
            v-model="description"
          />
          <button class="btn btn-primary ml-2 rounded-right" @click="addTask">
            Add Task
          </button>
        </div>
        <table class="table table-bordered table-responsive">
          <thead>
            <tr>
              <th class="bg-gray-100 p-2">ID</th>
              <th class="bg-gray-100 p-2">Task</th>
              <th class="bg-gray-100 p-2">Status</th>
              <th class="bg-gray-100 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id" class="text-center">
              <td class="p-2">{{ task._id }}</td>
              <td class="p-2">{{ task.name }}</td>
              <td class="p-2">{{ task.status }}</td>
              <td class="p-2">
                <button
                  class="btn btn-success ml-2"
                  @click="updateTaskStatus(task._id, 'completed')"
                >
                  <i class="bi bi-check-circle"></i>
                </button>
                <button
                  class="btn btn-danger ml-2"
                  @click="updateTaskStatus(task._id, 'pending')"
                >
                  <i class="bi bi-arrow-counterclockwise"></i>
                </button>
                <button
                  class="btn btn-danger ml-2"
                  @click="deleteTask(task._id)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Bootstrap Toast container for notifications -->
        <div class="position-absolute top-0 end-0 p-3">
          <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="me-auto">Notification</strong>
            </div>
            <div class="toast-body">
              {{ toastMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
//   import Sidebar from './Sidebar'; // Make sure to import your Sidebar component
  import Navbar from '../components/Navbar.vue';
  import axios from 'axios';
  export default {
    components:{
        Navbar,
    },
    data() {
      return {
        task: '',
        description: '',
        tasks: [],
        toastMessage: '',
      };
    },
    methods: {
      async fetchTasks() {
        // Replace 'userId' with the actual user ID or pass it as a prop
        const userId = 'userId';
  
        try {
            const token = Cookies.get('token');
          const response = await axios.get(`http://localhost:4000/fetch-taskByUserId`, { headers: { Authorization: token }});
          this.tasks = response.data.task;
        console.log(response);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      },
      async addTask() {
        if (this.task.trim() !== '') {
          const newTask = { name: this.task, description: this.description, status: 'To Do' };
  
          // Send the new task to the server
          try {


            const token = Cookies.get('token');
            const response = await axios.post('http://localhost:4000/add-task', newTask,{ headers: { Authorization: token }});
            console.log('response', response);
            // Refresh the task list after adding
            // this.task = '';
  
            // Show a notification when a task is added
            this.toastMessage = 'Task added!';
          } catch (error) {
            console.error('Error adding task:', error);
          }
        }
      },
      async updateTaskStatus(taskId, newStatus) {
        const updatedTask = this.tasks.find((task) => task.id === taskId);
        if (updatedTask) {
          updatedTask.status = newStatus;
  
          // Send the updated task to the server
          try {
            await axios.put(`http://localhost:4000/update-status/${taskId}`, updatedTask);
            // Refresh the task list after updating
            this.fetchTasks();
  
            // Show a notification when a task status is updated
            this.toastMessage = `Task marked as ${newStatus}!`;
          } catch (error) {
            console.error('Error updating task status:', error);
          }
        }
      },
      deleteTask(taskId) {
        // Send a request to delete the task
        axios.delete(`http://localhost:4000/delete-task/${taskId}`)
          .then(() => {
            // Refresh the task list after deleting
            this.fetchTasks();
  
            // Show a notification when a task is deleted
            this.toastMessage = 'Task deleted!';
          })
          .catch((error) => {
            console.error('Error deleting task:', error);
          });
      },
    },
    mounted(){
        this.fetchTasks();
    }
  };
  </script>
  