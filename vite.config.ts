import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Doc App',
        short_name: 'DocApp',
        description: 'une appli PWA',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
