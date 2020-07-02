var wid = $device.info.screen.width
var file = $file.read("Setting.conf")
var holidays = require('scripts/holidays')
var day_clac = (new Date()).toLocaleDateString()
var day_dis = displaydate(day_clac)
var file_ = $file.read("holidays.json")
var string_ = JSON.parse(file_.string)
var DEFAULT_ = [day_dis, day_clac, "", 0, "", "", ""]
var SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)

var preview_ = {
  type: "view",
  props: {
    id: "preview_",
  },
  layout: $layout.fill,
  views: [{
      type: "view",
      layout: function(make, view) {
        make.centerY.equalTo(view.super)
        make.size.equalTo($size(200, 100))
      },
      views: [{
        type: "label",
        props: {
          id: "target_text",
          text: SETTING_[2],
          font: $font("bold", 25)
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(25)
          make.left.equalTo(view.super).offset(15)
        }
      }, {
        type: "label",
        props: {
          id: "target_key_",
          text: clacdays(SETTING_[1])[1],
          font: $font(20),
          color: $color("#545455")
        },
        layout: function(make, view) {
          make.top.equalTo(view.super).offset(30)
          make.left.equalTo(view.prev.right).offset(2)
        }
      }, {
        type: "label",
        props: {
          id: "target_date",
          text: clacdays(SETTING_[1])[2] + "日：" + SETTING_[0].replace(/[年|月]/g, "-").replace(/日/, ""),
          color: $color("#545455"),
          font: $font(13)
        },
        layout: function(make, view) {
          make.top.equalTo(view.prev.bottom).offset(2)
          make.left.equalTo(view.super).offset(15)
        }
      }]
    },
    {
      type: "label",
      props: {
        id: "days_1",
        color: $color("white"),
        font: $font("AvenirNext-DemiBold", 30),
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(1)
        make.right.equalTo(view.super.right).offset(-58)
      }
    }, {
      type: "label",
      props: {
        text: "天",
        color: $color("white"),
        font: $font(23),
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(-1)
        make.right.equalTo(view.super.right).offset(-23)
      }
    }
  ]
}

$ui.render({
  layout: $layout.fill,
  views: [{
    type: "view",
    props: {
      id: "theme_c",
      radius: 5,
      bgcolor: $color(SETTING_[6]),
    },
    layout: function(make, view) {
      make.centerY.equalTo(view.super)
      make.right.equalTo(view.super).offset(-11)
      make.height.equalTo(40)
      make.width.equalTo(35)
    },
    views: [{
      tpye: "view",
      props: {
        id: "theme_c1",
        bgcolor: $color(SETTING_[7])
      },
      layout: function(make, view) {
        make.top.equalTo(view.super)
        make.right.equalTo(view.super)
        make.height.equalTo(40)
        make.width.equalTo(35)
      }
    }]
  }, {
    type: "view",
    layout: function(make, view) {
      make.centerX.equalTo(view.super)
      make.centerY.equalTo(view.super)
      make.size.equalTo($size(wid - 4, 100))
    },
    views: [preview_]
  }],
  events: {
    tapped: function() {
      $app.openURL("jsbox://run?name=Days%20Pro")
    }
  }
})

if (SETTING_[3] === 1) {
  var new_ = (new Date()).toLocaleDateString()
  var keys_ = Object.keys(string_).length

  for (i = 0;
    ((new Date(new_)) > (new Date(string_[i].data2))); i++) {
    var j = i + 1
    if (j === keys_) {
      holidays.getlist()
    }
  }

  $("target_text").text = string_[j].string
  $("target_date").text = "目标日：" + (string_[j].data1).replace(/[年|月]/g, "-").replace(/日/, "")
  $("days_1").text = clacdays(string_[j].data2)[0]
  $("target_key_").text = clacdays(string_[j].data2)[1]
  bg_width()
} else {
  $("days_1").text = clacdays(SETTING_[1])[0] > 99999 ? 99999 + "+" : clacdays(SETTING_[1])[0]
  bg_width()
  //限制事件字符长度
  var lth = (SETTING_[2]).replace(/[\u4e00-\u9fa5]/g, "01").length
  if (lth > 14) {
    $("target_text").updateLayout(function(make) {
      make.width.equalTo(180)
    })
  }
}

//将日期显示为自然语言格式
function displaydate(date) {
  var regex = /\b.*?\s.*?\s/
  var date_ = $detector.date(date)
  var date = regex.exec(date_)[0]
  return date
}

//计算天数
function clacdays(date) {
  var d_1 = new Date(date)
  var d_2 = new Date(day_clac)
  var key_ = d_1 >= d_2 ? (d_1 - d_2 == 0 ? "就在" : "还有") : "已经"
  var key_1 = d_1 >= d_2 ? "目标" : "起始"
  var days_ = Math.abs(d_1 - d_2) / 86400000 === 0 ? "今" : Math.abs(d_1 - d_2) / 86400000 
  return [days_, key_, key_1]
}

//自适应天数背景
function bg_width() {
  var n = ($("days_1").text).length
  if ($("days_1").text === "今") {
    var n = 1.6
  }
  $("theme_c").updateLayout(function(make) {
    make.width.equalTo(n * 18.4 + 48)
  })
  if ($("target_key_").text === "已经") {
    $("theme_c").bgcolor = $color(SETTING_[4])
    $("theme_c1").bgcolor = $color(SETTING_[5])
  } else {
    $("theme_c").bgcolor = $color(SETTING_[6])
    $("theme_c1").bgcolor = $color(SETTING_[7])
  }
  
}
