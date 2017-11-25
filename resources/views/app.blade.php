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
        <meta name="csrf-token" content="{{ csrf_token() }}">
   
        <title>What&apos;s In My Freezer?</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id="app"></div>
        {{-- TODO: Versions --}}
        <!-- <script src="{{asset('js/manifest.js')}}" ></script> -->
        <!-- <script src="{{asset('js/vendor.js')}}" ></script> -->
        <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>