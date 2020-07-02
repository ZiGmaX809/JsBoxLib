var file = $file.read("Setting.conf")
var DEFAULT_ = ["0", "0", "0", "#007AFF"]
var SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)

function ramp() {
  $cache.set("time", SETTING_[0] === "1" ? 240 : Math.floor(Math.random() * 12)*30)
  $timer.schedule({
    interval: 0.05,
    handler: function() {
      let i = $cache.get("time")
      let j = i + 60
      let right = HSV2HEX(i,60, 100)
      let left = HSV2HEX(j > 360 ? j - 360 : j, 60, 100)
      $("title_grad").colors = [$color(left), $color(right)]
      $cache.set("time", i > 360 ? 0 : i + 5)
    }
  })
}

function HSV2HEX(h, s, v) {
  var h = h > 359 ? 0 : h
  var s = s / 100
  var v = v / 100

  h1 = Math.floor(h / 60) % 6
  f = h / 60 - h1
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)

  if (h1 === 0) {
    r = v
    g = t
    b = p
  } else if (h1 === 1) {
    r = q
    g = v
    b = p
  } else if (h1 === 2) {
    r = p
    g = v
    b = t
  } else if (h1 === 3) {
    r = p
    g = q
    b = v
  } else if (h1 === 4) {
    r = t
    g = p
    b = v
  } else if (h1 === 5) {
    r = v
    g = p
    b = q
  }
  r = r * 255
  g = g * 255
  b = b * 255
  RGB = [Math.ceil(r), Math.ceil(g), Math.ceil(b)]
  HEX = "#" + RGB2HEX(r, g, b)

  return HEX
}

function RGB2HEX(r, g, b) {
  r_ = Math.ceil(r).toString(16)
  g_ = Math.ceil(g).toString(16)
  b_ = Math.ceil(b).toString(16)
  h = r_.length < 2 ? "0" + r_ : r_
  e = g_.length < 2 ? "0" + g_ : g_
  x = b_.length < 2 ? "0" + b_ : b_

  HEX = (h.toUpperCase() + e.toUpperCase() + x.toUpperCase())
  return HEX
}

module.exports = {
  ramp: ramp
}