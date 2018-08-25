$ui.render({
  props: {
    bgcolor: $color("white")
  },
  views: [{
    type: "gradient",
    props: {
      id: "bg",
      locations: [0.0, 1.0],
      startPoint: $point(0, 1),
      endPoint: $point(1, 1)
    },
    layout: function(make, view) {
      make.center.equalTo(view.super)
      make.size.equalTo($size(300, 300 / 760 * 460))
    }
  }, {
    type: "image",
    props: {
      src: "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Other/Gradient/1.png",
      bgcolor: $color("clear"),
      alpha: 1
    },
    layout: function(make, view) {
      make.centerY.equalTo(view.super)
      make.centerX.equalTo(view.super)
      make.size.equalTo($size(300, 300 / 760 * 460))
    }
  }]
})

var ss = 100
var vv = 100

$cache.set("time", 0)
var timer = $timer.schedule({
  interval: 0.05,
  handler: function() {
    //let i = parseInt($("text").text)
    let i = $cache.get("time")
    let j = i + 60
    const right = HSV2HEX(i, ss, vv)
    const left = HSV2HEX(j > 360 ? j - 360 : j, ss, vv)
    $("bg").colors = [$color(left), $color(right)]
    //    $("text").text = i > 360 ? 0 : i + 5
    $cache.set("time", i > 360 ? 0 : i + 5)
  }
})

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