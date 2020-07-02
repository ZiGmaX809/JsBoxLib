if ($app.env == $env.action) {
  var app = require('scripts/action')
} else if ($app.env == $env.app) {
  var app = require('scripts/app')
} else if ($app.env == $env.today) {
  var app = require('scripts/today')
}