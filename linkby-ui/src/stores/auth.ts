import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const userId: Ref<number|null> = ref(null)
  const userName = ref('')

  const isLoggedIn = computed(() => !! token.value)

  async function doLogin({ email, password}: { email: string, password: string }) {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { accessToken, id, name } = await response.json();
        token.value = accessToken;
        userId.value = id;
        userName.value = name;
      } else {
        console.error("Error:", response.status);
      }

    } catch (error) {
      console.error("Error:", error);
    }
  }

  function doLogOut(): void {
    token.value = ''
    userId.value = null
    userName.value = ''
  }

  return { token, userId, userName, isLoggedIn, doLogin, doLogOut }
})
