# yaml-scraper [![Build Status](https://travis-ci.org/segurvita/yaml-scraper.svg?branch=master)](https://travis-ci.org/segurvita/yaml-scraper)
<div style="text-align:right">Language: <i>English</i> | <a href="README_JA.md">日本語</a></div>

Delete or empry specified items to lighten your YAML document.



# Purpose

The purpose of this module is to avoid capacity limit errors that occur when importing a swagger file into Amazon API Gateway.



# Usage

This module require npm. If npm has already been installed, you can install the library with the following command.

```bash
npm install yaml-scraper
```

Please call the module as following.

```javascript
// import package
const fs = require('fs');
const scraper = require('yaml-scraper');

// read yaml file
const input = fs.readFileSync('./sample.yaml', 'utf8');

// delete example and empty description and delete parent of deprecated
const output = scraper(input)
  .delete('example')
  .empty('description')
  .deleteParent('deprecated')
  .toString();

// display result
console.log(output);
```



# API

### scraper(input)

Parses `input` as YAML format. Please call this function first, and then connect method chains below.

### delete(target)

Delete the item whose key is `target`. It can be used for method chain.

### empty(target)

Replace the value of `target` with `''` . It can be used for method chain.

### deleteParent(target)

Delete the element whose child has `target`. It can be used for method chain.

### toString()

Generate a YAML format string based on the current data and return it.



# Development

If you edit this project, you can clone it from the repository and build the development environment with the following command.

```bash
# Install required packages
npm install

# Run the test
npm test
```