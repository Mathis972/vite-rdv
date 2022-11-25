<script setup lang="ts">
import { User } from '@supabase/gotrue-js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../supabase';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const user = ref<User | null>(null);
const router = useRouter();

const register = async () => {
  if (
    email.value &&
    password.value &&
    confirmPassword.value &&
    confirmPassword.value === password.value
  ) {
    try {
      console.log('trying');
      const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });
      user.value = data.user;
      router.push({ name: 'account' });
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<template>
  <!-- component -->
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div
      class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
    >
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
        <!-- <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="fullname"
          placeholder="Full Name"
        /> -->

        <input
          type="text"
          v-model="email"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
        />

        <input
          type="password"
          v-model="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
        />
        <input
          type="password"
          v-model="confirmPassword"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="confirm_password"
          placeholder="Confirm Password"
        />

        <button
          type="submit"
          @click="register"
          class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Create Account
        </button>

        <div class="text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the
          <a
            class="no-underline border-b border-grey-dark text-grey-dark"
            href="#"
          >
            Terms of Service
          </a>
          and
          <a
            class="no-underline border-b border-grey-dark text-grey-dark"
            href="#"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      <div class="text-grey-dark mt-6">
        Already have an account?
        <router-link
          class="no-underline border-b border-blue text-blue"
          to="/login"
          >Log in.</router-link
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
