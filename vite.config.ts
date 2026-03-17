import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    federation({
      name: 'vue3-demo',
      remotes: {
        'vue3-counter': {
          type: 'module',
          name: 'vue3-counter',
          // entry: 'https://github.com/SergeyKurdyukov/vue3-counter/remoteEntry.js',
          entry: 'http://localhost:5174/remoteEntry.js',
          entryGlobalName: 'vue3-counter',
          shareScope: 'default',
        },
      },
      filename: 'remoteEntry.js',
      shared: ['vue'],
      // Optional parameter that controls where the host initialization script is injected.
      // By default, it is injected into the index.html file.
      // You can set this to "entry" to inject it into the entry script instead.
      // Useful if your application does not load from index.html.
      hostInitInjectLocation: 'html', // or "entry"
      // Controls whether all CSS assets from the bundle should be added to every exposed module.
      // When false (default), the plugin will not process any CSS assets.
      // When true, all CSS assets are bundled into every exposed module.
      bundleAllCSS: false, // or true
      // Timeout for parsing modules in seconds.
      // Defaults to 10 seconds.
      moduleParseTimeout: 10,
      // Idle timeout for parsing modules in seconds. When set, the timeout
      // resets on every parsed module and only fires when there has been no
      // module activity for the configured duration. Prefer this over
      // moduleParseTimeout for large codebases where total build time may
      // exceed the fixed timeout value.
      moduleParseIdleTimeout: 10,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
