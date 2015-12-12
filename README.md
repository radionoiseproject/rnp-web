Radio Noise Project (web interface)
===================================

This is the main client for the Radio Noise Project, implemented in
HTML and JavaScript. It is intended to be hosted from a static web server.

To Build
--------

Make sure you have npm (node.js) and gulp installed on your system.

Install the local npm packages to get the build system and deps:

```
npm install
```

Then use gulp to build the browser libraries and css:

```
gulp
```

To Serve
--------

Serve the directory `/pub` somewhere with a good static webserver. May I
recommend [nginx](http://nginx.org/)?
