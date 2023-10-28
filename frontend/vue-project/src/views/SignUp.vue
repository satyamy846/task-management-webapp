<template>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="w-100 p-3 bg-light rounded shadow">
        <h1 class="text-center text-primary">Sign Up</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              v-model="formData.name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model="formData.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model="formData.password"
              required
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password:</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              v-model="formData.confirmPassword"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:'sign-up',
    data() {
      return {
        formData: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      };
    },
    methods: {
      async handleSubmit() {
        if (this.formData.password === this.formData.confirmPassword) {
          try {
            const response = await axios.post('http://localhost:4000/signup', {
              name: this.formData.name,
              email: this.formData.email,
              password: this.formData.password,
            });
            console.log('Registration successful');
            console.log(response.data);
            // Assuming your API returns a response with data
            this.$router.push('/sign-in'); // Navigate to the sign-in page
          } catch (error) {
            console.error('Error during registration:', error);
          }
        } else {
          console.log('Password mismatch');
        }
      },
    },
  };
  </script>
  