import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		global: "window",
	},
	optimizeDeps: {
		disabled: false,
		// NOTE: workaround,  react-cropper is my nest deps
		include: ['dynamic-import-pkg > react-cropper'],
	  }
});
