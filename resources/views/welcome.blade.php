<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infraestructura Rec - ECCI</title>

    <!-- AdminLTE y otros estilos necesarios -->
    @vite('node_modules/admin-lte/dist/css/adminlte.min.css')
    @vite('node_modules/@fortawesome/fontawesome-free/css/all.min.css')
    @vite('node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css')

    <!-- DataTables CSS -->
    @vite('node_modules/admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')
    @vite('node_modules/admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css')
    @vite('node_modules/admin-lte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css')
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <script>
        @if(!empty($message))
            localStorage.setItem('error', "{{ $message }}");
        @else
            localStorage.removeItem('error');
        @endif
    </script>

    <div id="root">

    </div>


    @viteReactRefresh
    @vite('resources/js/index.jsx')
</body>

</html>