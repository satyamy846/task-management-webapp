<template>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="w-100 p-3 bg-light rounded shadow">
        <h1 class="text-center text-primary">Sign In</h1>
        <form @submit.prevent="handleSubmit">
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
          <button type="submit" class="btn btn-primary w-100">Sign In</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:'sign-in',
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
      };
    },
    methods: {
      async handleSubmit() {
        try {
            const response = await axios.post('http://localhost:4000/login', {
            email:this.formData.email,
            password: this.formData.password,
          }, {withCredentials: true});
          console.log(response);
          console.log('Sign-in successful');
        //   localStorage.setItem('token',response.data.token);
          this.$router.push('/dashboard'); // Placeholder for successful sign-in logic
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  