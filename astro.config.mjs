import { defineConfig } from 'astro/config';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import vue from "@astrojs/vue";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  vite: {
    css: {
        preprocessorOptions: {
            // подключение глобальных миксинов
            stylus: {
              additionalData: `
                @import "${path.resolve(__dirname, 'src/styles/mixins.styl')}"`
            }
        }
    }
},
  // локально старт на 3001 порту
  server: {
    port: 3001,
    host: true
  }
});