<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head data-token="{{ Session::has('token') && Session::get('token') }}">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="keywords" content="freezer,inventory,Freezer,What's In My Freezer"/>
        <meta name="description" content="What's in my Freezer? -- A simple inventory app"/>
        <meta name="author" content="Andy Hill"/>
        <meta name="copyright" content="{{ date('Y') }}, wimf.space"/>
        <link rel="manifest" href="{{ asset('manifest.json') }}">
        <meta name="theme-color" content="#FFFFFF"/>
        <link href="/images/touch/wimf_48x48.png" rel="shortcut icon" type="image/png"/>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <script type="text/javascript">
            if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js');
            });
            }
        </script>

        <title>What&apos;s In My Freezer?</title>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
