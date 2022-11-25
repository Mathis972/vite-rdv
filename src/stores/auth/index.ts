import { User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User>({} as User);
  const accessToken = useStorage('accessToken', '');
  const mail = computed(() => user.value?.email);
  function updateUser(supaUser: User) {
    user.value = supaUser;
  }
  function updatetoken(supaToken: string) {
    accessToken.value = supaToken;
  }

  return { user, accessToken, mail, updateUser, updatetoken };
});
