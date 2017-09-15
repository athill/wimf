<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Laravel</title>
        <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div id="example"></div>
{{--         <script src="/js/manifest.js"></script>
        <script src="/js/vendor.js"></script>
        <script src="/js/app.js"></script> --}}
        <script src="{{mix('js/manifest.js')}}" ></script>
        <script src="{{mix('js/vendor.js')}}" ></script>
        <script src="{{mix('js/app.js')}}" ></script>
    </body>
</html>