if ($app.env == $env.today) {
    var app = require('scripts/today')
}else if ($app.env == $env.app){
    var app = require('scripts/app')
}