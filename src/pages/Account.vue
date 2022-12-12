<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

import { supabase } from '../supabase';
const session = ref();
const authUser = useAuthStore();
const router = useRouter();

const loading = ref(true);
const username = ref('');

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    console.log(data.session);
    getProfile();
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});

async function getProfile() {
  try {
    loading.value = true;
    console.log(session.value);

    let { data, error } = await supabase.auth.getUser(
      session.value.access_token
    );

    if (error) throw error;

    if (data.user?.email) {
      authUser.updateUser(data.user);
      username.value = data.user?.email;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    authUser.updatetoken('');
    router.push({ name: 'login' });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="form-widget">
    <div>
      <label class="text-black" for="email">Email</label>
      <input id="email" type="text" :value="authUser.user?.email" disabled />
    </div>
    <div>
      <label class="text-black" for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block text-black"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click.prevent="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>
