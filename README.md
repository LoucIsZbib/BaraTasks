# BaraTasks

A (very) simple todo list for personal use.

Data is saved under a simple json file on server side : you can access to your data on every computer with a (modern) webbrowser.

## Installation

Currently, only installation with empty uri is supported : https://todo.example.com will work, https://example.com/todo/ won't work

'www folder' is not the root folder, only web/ folder has to be public. See example_nginx.conf

Front controller concept is used, please configure your web server (see example for nginx and apache)

## Limitations
* No multi-user
* Security is not embedded, it is recommended to add it on web server configuration (SSL, http authentication..)

## Using 
* angularjs
* php
* css + less

## Icons
Icons found on http://ionicons.com/

## Script used :
Angular Moment Picker : https://github.com/indrimuska/angular-moment-picker

