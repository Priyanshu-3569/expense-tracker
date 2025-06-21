import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/expense-tracker/', // ← this must match your repo name
  plugins: [react()],
})

