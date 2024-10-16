<template>
  <v-container>
    <v-form @submit.prevent="login">
      <v-text-field
        v-model="form.email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        label="Password"
        type="password"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script src="./script.js"></script>

<style lang="scss">
@import "./style.scss";
</style>