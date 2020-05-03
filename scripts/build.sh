#!/bin/bash

cp resources/views/app-template.blade.php public/index.html
react-scripts build
cp -rf build/* public
mv public/index.html resources/views/app.blade.php
