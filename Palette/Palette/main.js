var rgb = require('scripts/rgb')
var hsv = require('scripts/hsv')
var calc = require('scripts/calc')
var cover = require('scripts/cover')
var wid = $device.info.screen.width
var hig = $device.info.screen.height
var file = $file.read("setting.conf")
var SETTING_ = JSON.parse(file.string)

$ui.render({
  props:{
    id:"main"
  },
  layout: $layout.fill,
  views: [{
    //预览框
    type: "view",
    props: {
      id: "pview",
      radius: 10,
      bgcolor: $color(SETTING_[3])
    },
    layout: function(make, view) {
      make.top.equalTo(view.super).offset(10)
      make.centerX.equalTo(view.super)
      make.size.equalTo($size(wid - 20, hig*0.565))
    }
  }, {
    type: "label",
    props: {
      id: "hex_v",
      text: SETTING_[3],
      font: $font("ArialRoundedMTBold", 20)
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev.bottom).offset(10)
      make.left.equalTo(view.super).offset(40)
    },
    events: {
      tapped: function(sender) {
        $clipboard.text = $("hex_v").text
        $ui.toast("已复制当前颜色HEX值")
      }
    }
  }, {
    type: "label",
    props: {
      id: "rgb_v",
      text: SETTING_[4],
      font: $font("ArialRoundedMTBold", 20),
      align: $align.right
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev)
      make.right.equalTo(view.super).offset(-40)
    },
    events: {
      tapped: function (sender) {
        $clipboard.text = $("rgb_v").text
        $ui.toast("已复制当前颜色RGB值")
      }
    }
  }, {
    type: "tab",
    props: {
      items: ["HSV", "RGB"]
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev).offset(35)
      make.centerX.equalTo(view.super)
    },
    events: {
      changed: function(sender) {
        if (sender.index === 0) {
          $("slider_1").alpha = 1
          $("slider_2").alpha = 0
          rgb.sethsvvalue()
        } else if (sender.index === 1) {
          $("slider_1").alpha = 0
          $("slider_2").alpha = 1
          setrgbvalue()
          cover.rgb_cover()
        } 
      }
    }
  }, {
    type: "view",
    props: {
      id: "slider_1",
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev.bottom).offset(10)
      make.centerX.equalTo(view.super)
      make.size.equalTo($size(wid, 140))
    },
    views: [hsv.HSV]
  }, {
    type: "view",
    props: {
      id: "slider_2",
      alpha: 0
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev)
      make.centerX.equalTo(view.super)
      make.size.equalTo($size(wid, 140))
    },
    views: [rgb.RGB]
    }
  ]
})

function savesetting(section, value) {
  SETTING_[section] = value
  $file.write({
    data: $data({ string: JSON.stringify(SETTING_) }),
    path: "setting.conf"
  })
}

function setrgbvalue() {
  let reg = /\d{1,3}/g
  let c = ($("rgb_v").text).match(reg)
  $cache.set("r", c[0])
  $("r_v").text = c[0]
  $("r_slider").value = c[0] / 255
  $cache.set("g", c[1])
  $("g_v").text = c[1]
  $("g_slider").value = c[1] / 255
  $cache.set("b", c[2])
  $("b_v").text = c[2]
  $("b_slider").value = c[2] / 255
}

$app.listen({
  exit: function() {
    //保存设置
    savesetting(0, $("h_v").text)
    savesetting(1, $("s_v").text)
    savesetting(2, $("v_v").text)
    savesetting(3, $("hex_v").text)
    savesetting(4, $("rgb_v").text)
    $cache.clear()
  }
})