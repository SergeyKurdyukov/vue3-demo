<script setup lang="ts">
import { useAuthStore } from '@/stores/auth/auth'

const authStore = useAuthStore()
authStore.getUser()
</script>

<template>
  <div class="my-profile">
    <h1 class="text-xl font-bold my-4">MyProfileView</h1>

    <p v-if="!authStore.currentUser">No user data</p>
    <div v-else class="flex">
      <img :src="authStore.currentUser.avatar" alt="User photo" class="w-40" />
      <div class="px-4">
        <p>Name: {{ authStore.currentUser.name }}</p>
        <p>Email: {{ authStore.currentUser.email }}</p>
        <p>Registration date: {{ authStore.currentUser.creationAt }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
