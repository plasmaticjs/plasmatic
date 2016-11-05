<p align="center">
    <img alt="Plasmatic" src="https://s3.amazonaws.com/plasmatic/logo_full.svg" width="510">
</p>

<p align="center">
    <a href="https://coveralls.io/github/plasmaticjs/plasmatic" target="_blank">
        <img src="https://img.shields.io/coveralls/plasmaticjs/plasmatic.svg?style=flat-square">
    </a>
    <a href="https://codeclimate.com/github/plasmaticjs/plasmatic" target="_blank">
        <img src="https://img.shields.io/codeclimate/github/plasmaticjs/plasmatic.svg?style=flat-square">
    </a>
    <a href="https://travis-ci.org/plasmaticjs/plasmatic" target="_blank">
        <img src="https://img.shields.io/travis/plasmaticjs/plasmatic.svg?style=flat-square">
    </a>
    <a href="https://sonarqube.com/dashboard/index/1180785" target="_blank">
        <img src="https://sonarqube.com/api/badges/gate?key=MilosMosovsky%3Ajavascript-plasmatic&template=FLAT">
    </a>
</p>

# Plasmatic [![npm version](https://img.shields.io/npm/v/plasmatic.svg?style=flat-square)](https://www.npmjs.com/package/plasmatic) 
Plasmatic is a full featured framework for polymorphic applications.

## Installation
```
$ yarn add plasmatic babel-plugin-transform-plasmatic-jsx
```

## Quick example

#### index.html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
        <title>Plasmatic App</title>
    </head>
    <body>
        <div pm-component="plasmatic-app"></div>
    </body>
</html>
```
#### index.js
```jsx
import Plasmatic from 'plasmatic'

const App = new Plasmatic.App('plasmatic-app')
App.render(
  <div>
    <h1>Plasmatic Application</h1>
 </div>
)
```

# Authors
* Milos Mosovsky ([@MilosMosovsky](https://github.com/MilosMosovsky))
