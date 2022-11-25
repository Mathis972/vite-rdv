<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { supabase } from '../supabase';
const session = ref();

const loading = ref(true);
const username = ref('');
const website = ref('');
const avatar_url = ref('');

onMounted(() => {
  console.log('mount');
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    console.log('SEC', session.value);
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    console.log('auth ch');
    session.value = _session;
  });
  getProfile();
});

async function getProfile() {
  console.log('prof');

  try {
    loading.value = true;
    const { user } = session?.value;

    let { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const { user } = session?.value;

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);

    if (error) throw error;
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
    if (error) throw error;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="website" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</template>