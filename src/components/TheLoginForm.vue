<script setup lang="ts"></script>

<template>
  <form class="border rounded-md">
    <h3 class="bg-sky-700 text-white text-center px-3 py-2">Login</h3>
    <div class="flex flex-col px-3 py-2">
      <input
        type="text"
        placeholder="Login"
        class="border border-sky-700 hover:ring ring-sky-700 rounded-sm p-1 mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        class="border border-sky-700 hover:ring ring-sky-700 rounded-sm p-1 mb-2"
      />
      <button
        class="border rounded-full bg-emerald-400 hover:bg-emerald-500 border-emerald-400 text-white w-fit px-4 py-1 self-center"
        type="submit"
      >
        Send
      </button>
    </div>
  </form>
</template>

<style>
@import 'tailwindcss';
</style>
