## Dribbble-downloader 
A Node.js CLI tool to download images(png & gif) from [Dribbble](https://dribbble.com/).

### Installation
```
npm install -g dribbble-downloader
```
For some of you, you need to be an administrator in order to install global modules, in that case just precede the previous command with ``sudo``.

### Usage 
```
dribbble-downloader <shot-url>

### example : 

dribbble-downloader https://dribbble.com/shots/2487026-Dashboard-Form

``` 
All the downloaded files will be stored automatically inside a folder named after the shot title, so for the previous example all the images are stored in the **./Dashboard - Form** folder.

**Or** we can specify our destination path using the ``-o``(``--output``) flag, here is an example : 
```
dribbble-downloader https://dribbble.com/shots/2487026-Dashboard-Form -o my-folder 
```
