import type { App } from 'vue';
import { resize } from "../plugins/directivies";

export default (app: App) => {
  // директивы
  app.directive('resize', resize);
};
