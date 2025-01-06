import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/index.jsx', 
                'node_modules/admin-lte/dist/css/adminlte.min.css', 
                'node_modules/@fortawesome/fontawesome-free/css/all.min.css', 
                'node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css',
                
                // DataTables CSS desde AdminLTE
                'node_modules/admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css',
                'node_modules/admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
                'node_modules/admin-lte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css',
                
            ],
            refresh: true,
        }),
    ],
});
