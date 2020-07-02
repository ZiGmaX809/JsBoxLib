var wid = $device.info.screen.width
var file = $file.read("Setting.conf")
var holidays = require('scripts/holidays')
var day_clac = (new Date()).toLocaleDateString()
var day_dis = displaydate(day_clac)
var DEFAULT_ = [day_dis, day_clac, "", 0, "#409EF6", "#2C86D9", "#409EF6", "#2C86D9"]
var SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)

//设置缓存
setcache(SETTING_[1])

var text_ = {
  type: "input",
  props: {
    id: "text_",
    type: $kbType.default,
    text: SETTING_[2] === "" ? "" : (SETTING_[2]),
    font: $font("bold", 17),
    textColor: $color("#545455"),
    bgcolor: $color("clear"),
    placeholder: "点击输入事件名称"
  },
  layout: function(make, view) {
    make.top.equalTo(view.super).offset(10)
    make.left.equalTo(view.super).offset(52)
    make.size.equalTo($size(wid - 100, 40))
  },
  events: {
    returned: function(sender) {
      sender.blur()
      pickdate()
      savesetting(2, sender.text)
    }
  }
}

var date_ = {
  type: "label",
  props: {
    id: "date_",
    text: (SETTING_[0] === "" | SETTING_[0] === null ? day_dis : SETTING_[0]),
    font: $font("bold", 17),
    color: $color("#545455"),
    bgcolor:$color("clear")
  },
  layout: function(make, view) {
    make.top.equalTo(view.super).offset(10)
    make.left.equalTo(view.super).offset(62)
    make.size.equalTo($size(wid - 70, 40))
  },
  events: {
    tapped: function() {
      $("text_").blur()
      pickdate()
    }
  }
}
var theme_ = [{
    type: "label",
    props: {
      id: "them_",
      text: "选择主题颜色",
      font: $font("bold", 17),
      color: $color("#545455"),
      bgcolor:$color("clear")
    },
    layout: function(make, view) {
      make.top.equalTo(view.super).offset(10)
      make.left.equalTo(view.super).offset(62)
      make.size.equalTo($size(wid - 70, 40))
    },
    events: {
      tapped: function() {
        themes()
      }
    }
  }, {
    type: "view",
    props: {
      id: "theme_1",
      radius: 5,
      bgcolor: $color(SETTING_[4]),
      circular: true
    },
    layout: function(make, view) {
      make.centerY.equalTo(view.super)
      make.right.equalTo(view.super).offset(-64.5)
      make.size.equalTo($size(20, 20))
    },
    views: [{
      tpye: "view",
      props: {
        id: "theme_2",
        bgcolor: $color(SETTING_[5])
      },
      layout: function(make, view) {
        make.top.equalTo(view.super)
        make.left.equalTo(view.super).offset(10)
        make.size.equalTo($size(10, 20))
      }
    }]
  },
  {
    type: "view",
    props: {
      id: "theme_3",
      radius: 5,
      bgcolor: $color(SETTING_[6]),
      circular: true
    },
    layout: function(make, view) {
      make.centerY.equalTo(view.super)
      make.right.equalTo(view.super).offset(-37.5)
      make.size.equalTo($size(20, 20))
    },
    views: [{
      tpye: "view",
      props: {
        id: "theme_4",
        bgcolor: $color(SETTING_[7])
      },
      layout: function(make, view) {
        make.top.equalTo(view.super)
        make.left.equalTo(view.super).offset(10)
        make.size.equalTo($size(10, 20))
      }
    }]
  }
]

var holidays_ = [{
  type: "label",
  props: {
    id: "them_",
    text: "节假日模式",
    font: $font("bold", 17),
    color: $color("#545455")
  },
  layout: function(make, view) {
    make.top.equalTo(view.super).offset(10)
    make.left.equalTo(view.super).offset(62)
    make.size.equalTo($size(wid - 70, 40))
  }
}, {
  type: "switch",
  props: {
    id: "switch_",
    on: SETTING_[3] === 0 ? false : true,
    onColor: $color(SETTING_[6]),
    thumbColor: $color(SETTING_[7])
  },
  layout: function(make, view) {
    make.centerY.equalTo(view.super)
    make.right.equalTo(view.super).offset(-37.5)
  },
  events: {
    changed: function() {
      var t = (SETTING_[3] + 1) % 2
      savesetting(3, t)
      holidays.getlist()
    }
  }
}]

var save_ = {
  type: "button",
  props: {
    id: "save_",
    title: "保存",
    bgcolor: $color(SETTING_[7])
  },
  layout: function(make, view) {
    make.top.equalTo(view.super).offset(10)
    make.left.equalTo(view.super).offset(50)
    make.size.equalTo($size(wid - 100, 40))
  },
  events: {
    tapped: function() {
      savesetting(0, $("date_").text)
      savesetting(1, $cache.get("data_c")[1])
      savesetting(2, $("text_").text)
      $app.close()
    }
  }
}

$ui.render({
  views: [{
    type: "view",
    props: {
      bgcolor: $color("#F9F9F9"),
      radius: 5,
      borderWidth: 1,
      borderColor: $color("#C1C1C0")
    },
    layout: function(make, view) {
      make.top.equalTo(view.super).offset(20)
      make.centerX.equalTo(view.super)
      make.size.equalTo($size(wid - 30, 240))
    },
    views: [{
        //icon
        type: "button",
        props: {
          icon: $icon("057", $color("#C1C1C0"),$size(25,25)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(18)
          make.left.equalTo(view.super).offset(10)
        }
      }, {
        //事件输入
        type: "view",
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(0)
          make.size.equalTo($size(wid, 60))
        },
        views: [text_]
      },
      {
        //line
        type: "view",
        props: {
          bgcolor: $color("#C1C1C0")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(60)
          make.size.equalTo($size(wid, 1))
        }
      },
      {
        //icon
        type: "button",
        props: {
          icon: $icon("125", $color("#C1C1C0"),$size(25,25)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(78)
          make.left.equalTo(view.super).offset(10)
        }
      },
      {
        //时间选择
        type: "view",
        props:{
          bgcolor:$color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(60)
          make.size.equalTo($size(wid, 60))
        },
        views: [date_]
      }, {
        //line
        type: "view",
        props: {
          bgcolor: $color("#C1C1C0")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(120)
          make.size.equalTo($size(wid, 1))
        }
      },
      {
        //icon
        type: "button",
        props: {
          icon: $icon("151", $color("#C1C1C0"),$size(25,25)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(138)
          make.left.equalTo(view.super).offset(10)
        }
      }, {
        type: "view",
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(120)
          make.size.equalTo($size(wid, 60))
        },
        views: theme_
      }, {
        //line
        type: "view",
        props: {
          bgcolor: $color("#C1C1C0")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(180)
          make.size.equalTo($size(wid, 1))
        }
      },
      {
        //icon
        type: "button",
        props: {
          icon: $icon("134", $color("#C1C1C0"),$size(25,25)),
          bgcolor: $color("clear")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(198)
          make.left.equalTo(view.super).offset(10)
        }
      }, {
        type: "view",
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(180)
          make.size.equalTo($size(wid, 60))
        },
        views: holidays_
      }
    ]
  }, {
    //TIPS
    type: "label",
    props: {
      text: "*事件名称请尽量简洁明了。由于系统限制，日期选择区间将限制为1700-2099年，天数为99999天。\n*主题色可以分别选择过去(左侧)和将来(右侧)的颜色。\n*节假日模式是指自动显示为下一个法定节假日，不再显示自定义事件。",
      lines: 5,
      font: $font(14),
      color: $color("gray")
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev.bottom).offset(15)
      make.centerX.equalTo(view.super)
      make.width.equalTo(wid - 60)
    }
  }, {
    //保存按钮
    type: "view",
    layout: function(make, view) {
      make.top.equalTo(view.prev.bottom).offset(5)
      make.size.equalTo($size(wid, 60))
    },
    views: [save_]
  }]
})

//选择日期并写入缓存:
function pickdate() {
  $pick.date({
    props: {
      mode: 1,
      min: new Date("1700/1/1"),
      max: new Date("2099/12/31"),
      date: new Date($cache.get("data_c")[1])
    },
    handler: function(sender) {
      var dis_date = displaydate(sender)
      var clc_date = (sender).toLocaleDateString()
      $("date_").text = dis_date
      $cache.set("data_c", {
        "0": dis_date,
        "1": clc_date
      })
    }
  })
}

//将日期显示为自然语言格式
function displaydate(date) {
  var regex = /\b.*?\s.*?\s/
  var date_ = $detector.date(date)
  var date = regex.exec(date_)[0]
  return date
}

//保存设置
function savesetting(section, value) {
  SETTING_[section] = value
  $file.write({
    data: $data({ string: JSON.stringify(SETTING_) }),
    path: "Setting.conf"
  })
}

//设置缓存以实时更新DatePicker
function setcache(date) {
  $cache.set("data_c", {
    "1": new Date(date)
  })
}

//主题选择
function themes() {
  $pick.data({
    props: {
      items: [
        ["蓝·Blue", "橙·Orange", "紫·Purple", "绿·Green", "黑·Black", "粉·Pink"],
        ["蓝·Blue", "橙·Orange", "紫·Purple", "绿·Green", "黑·Black", "粉·Pink"]
      ]
    },
    handler: function(data) {
      var colors = []
      for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
          colors.push(picktheme(data[i])[j])
        }
      }

      for (m = 0; m < 4; m++) {
        savesetting(m + 4, colors[m])
      }

      $("theme_1").bgcolor = $color(colors[0])
      $("theme_2").bgcolor = $color(colors[1])
      $("theme_3").bgcolor = $color(colors[2])
      $("theme_4").bgcolor = $color(colors[3])
      $("switch_").onColor = $color(colors[2])
      $("switch_").thumbColor = $color(colors[3])
      $("save_").bgcolor = $color(colors[3])
    }
  })
}

function picktheme(data) {
  n = data
  if (n === "蓝·Blue") {
    return ["#409EF6", "#2C86D9"]
  } else if (n === "橙·Orange") {
    return ["#FF9F01", "#FA8D01"]
  } else if (n === "紫·Purple") {
    return ["#D847FF", "#BF00F2"]
  } else if (n === "绿·Green") {
    return ["#289157", "#227447"]
  } else if (n === "黑·Black") {
    return ["#666666", "#494949"]
  } else if (n === "粉·Pink") {
    return ["#E076B2", "#D8459F"]
  }
}

//更新
var updateURL = "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Days_Pro/Days%20Pro.box"
$http.get({
  url: "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Days_Pro/version",
  handler: function(resp) {
    var data = resp.data
    var v = 1.04
    if (data > v) {
      $ui.action({
        title: '更新提示',
        message: '发现新版本, 是否更新 ?',
        actions: [{
          title: '更新',
          handler: () => {
            $app.openURL(updateURL)
            $ui.toast('正在安装更新...')
          }
        }]
      })
    }
  }
})
