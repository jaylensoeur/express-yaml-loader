##Yaml with Import
[![CircleCI](https://circleci.com/gh/jaylensoeur/yaml-with-import/tree/master.svg?style=svg)](https://circleci.com/gh/jaylensoeur/yaml-with-import/tree/master)
- Supports nested yaml import(s)
- Supports multiple imports
- Supports overriding with deep copying  

## Install
````
npm i @jaylensoeur/yaml-with-import --save
````

##Example

file1.yml

````
imports:
  - {resource: file2.yml}

database: mongoDB

route:
  blogs: /
  defaults: {controller: Blog:index}
````

file2.yml
````
route:
  blogs: /blogs
  defaults: {controller: Blog:list}
  methods: [post, put]

````

yaml.read('file1.yml');

Expected results:

````
database: mongoDB

route:
  blogs: /
  defaults: {controller: Blog:index}
  methods: [post, put]
````

##Usage:

es6

````
import Yaml from '@jaylensoeur/yaml-with-import';

const yaml = new Yaml();
yaml.read('file.yml');
````

es5
````
var Yaml = require('@jaylensoeur/yaml-with-import').default;

var yaml = new Yaml();
yaml.read('file.yml');
````

