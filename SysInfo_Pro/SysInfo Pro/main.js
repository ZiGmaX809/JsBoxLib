var cache = $cache.get("page_") || 0
var item = module(cache)
var view = item[cache].page_
var wid = $device.info.screen.width
var speed = {
  type: "view",
  layout: $layout.fill,
  views: [{
      type: "view",
      props: {
        bgcolor: $color("gray"),
        alpha: 0.3
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super)
        make.left.equalTo(view.super).offset(120)
        make.width.equalTo(1)
        make.height.equalTo(75)
      }
    },{
      type: "label",
      props: {
        id: "u",
        text: "0 B/s",
        font: $font(12),
        align: $align.right
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(-20)
        make.right.equalTo(view.prev).offset(-10)
      }
    }, {
      type: "label",
      props: {
        id: "d",
        text: "0 B/s",
        font: $font(12),
        align: $align.right
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(20)
        make.right.equalTo(view.prev)
      }
    }, {
      type: "label",
      props: {
        text: "↗",
        font: $font("SourceCodePro-It", 22),
        color: $color("#FE4A4A"),
        align: $align.left
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(-22)
        make.left.equalTo(view.super).inset(20)
      }
    },
    {
      type: "label",
      props: {
        text: "↙",
        font: $font("SourceCodePro-It", 22),
        color: $color("#1F87FF"),
        align: $align.left
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(18)
        make.left.equalTo(view.prev)
      }
    }
  ]
}

$ui.render({
  views: [{
      type: "view",
      props: {

      },
      layout: $layout.fill,
      views: [speed]
    },
    {
      type: "view",
      props: {
        id: "main",
//        bgcolor:$color("gray")
      },
      layout: function (make,view){
        make.size.equalTo($size(wid-145,110))
        make.right.equalTo(view.super)
        make.centerY.equalTo(view.super)
      },
      views: [view],
      events: {
        tapped: function(sender) {
          var sub = sender.views[0]
          var idx = sub.info
          $device.taptic(0)
          toggle(sub, idx)
          $cache.set("page_", (idx + 1) % 2)
        }
      }
    }
  ]
})

function upText(n) {
  $cache.getAsync({
    key: "tu",
    handler: function(temp) {
      $cache.set("tu", n)
      let d = n - temp
      let t = d >= 1048576 ? (d / 1048576).toFixed(1) + " MB/s" : (d >= 1024 ? (d / 1024).toFixed(1) + " KB/s" : d + " B/s")
      $("u").text = t
    }
  })
}

function downText(n) {
  $cache.getAsync({
    key: "td",
    handler: function(temp) {
      $cache.set("td", n)
      let d = n - temp
      let t = d >= 1048576 ? (d / 1048576).toFixed(1) + " MB/s" : (d >= 1024 ? (d / 1024).toFixed(1) + " KB/s" : d + " B/s")
      $("d").text = t
    }
  })
}

function toggle(subview, index) {
  var nextIndex = (index + 1) % 2
  if (!item[nextIndex]) {
    item = module(nextIndex, item)
  }
  var nextView = item[nextIndex].page_
  nextView.props.alpha = 0
  $("main").add(nextView)

  $ui.animate({
    duration: 0.2,
    animation: function() {
      subview.alpha = 0
    },
    completion: function() {
      subview.remove()
      $ui.animate({
        duration: 0.2,
        animation: function() {
          $("main").views[0].alpha = 1
        }
      })
    }
  })
}

var speed = $timer.schedule({
  interval: 1,
  handler: function() {
    var type = $device.networkType
    var ifa_data = $network.ifa_data
    switch (type) {
      case 0:
        break;
      case 1:
        upText(ifa_data.en0.sent)
        downText(ifa_data.en0.received)
        break;
      case 2:
        upText(ifa_data.pdp_ip0.sent)
        downText(ifa_data.pdp_ip0.received)
        break;
    }
  }
})

function module(index, item = []) {
  switch (index) {
    case 0:
      item[0] = require("scripts/net")
      $timer.schedule({
        interval: 1,
        handler: function() {
          var type = $device.networkType
          switch (type) {
            case 0:
              $("n").text = "无网络"
              $("Lip").text = "Null"
              $("Wip").text = "Null"
              break;
            case 1:
              $("n").text = $device.ssid.SSID
              $("Lip").text = $device.wlanAddress
              item[0].getip()
              break;
            case 2:
              $("n").text = "蜂窝网络"
              $("Lip").text = "Null"
              item[0].getip()
              break;
          }
        }
      })
      break
    case 1:
      item[1] = require("scripts/sys")
      var timer_1 = $timer.schedule({
        interval: 1,
        handler: function() {
          item[1].getspace()
        }
      })
      break
  }
  return item
}