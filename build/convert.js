'use strict'

const YAML = require('js-yaml')
const FS = require('fs')

let obj = YAML.safeLoad(FS.readFileSync('./list.yml', 'utf8'), {
  json: true
})

FS.writeFileSync('./list.json', JSON.stringify(obj), 'utf8')
