import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@admin-rights", replacement: "/src/pages/admin-rights" },
      { find: "@student-rights", replacement: "/src/pages/student-rights" },
      { find: "@components", replacement: "/src/components" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@validation", replacement: "/src/utils/validation" },
    ]
  }
})
