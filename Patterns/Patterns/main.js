if ($app.env == $env.keyboard) {
  $keyboard.barHidden = true
  $keyboard.height = 267
  var app = require('scripts/keyboard')
} else {
  var app = require('scripts/app')
}
