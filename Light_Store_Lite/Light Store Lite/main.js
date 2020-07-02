var wid = $device.info.screen.width
var hig = $device.info.screen.height

var home = require('scripts/home')
var sort = require('scripts/sort')
var search = require('scripts/search')
var setting = require('scripts/setting')
var color = require('scripts/color')
var ramp = require('scripts/ramp')

var items = [home, sort, search, setting]
var pages = ["home", "sort", "search", "setting"]
var icons = ["057", "063", "023", "002"]

var vcolor = $cache.get("vcolor")

var file = $file.read("Setting.conf")
var DEFAULT_ = ["0", "0", "0", "#007AFF"]
var SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)

start_get_all_json()

$ui.render({
  props: {
    id: "main",
    navBarHidden: true,
    bgcolor: $color(SETTING_[0] === "1" ? "white" : "#F9F9F9"),
    statusBarStyle: 0
  },
  views: [
    //主背景
    {
      type: "view",
      props: {
        id: "main_view_bg",
        alpha: 1,
        bgcolor: $color("#F9F9F9")
      },
      layout: function (make, view) {
        make.top.inset(SETTING_[0] === "0" ? ($device.isIphoneX === true ? 40 : 20) : ($device.isIphoneX === true ? 75 : 65))
        make.left.right.bottom.inset(0)
      }
    },
    //脚本总数
    {
      type: "view",
      props: {
        id: "sum_view",
        radius: 15,
        bgcolor: $color(vcolor),
        alpha: 0
      },
      layout: function (make, view) {
        make.centerX.equalTo(view.super)
        make.bottom.offset($device.isIphoneX === true ? -95 : -65)
        make.size.equalTo($size(170, 30))
      },
      views: [{
        type: "label",
        props: {
          id: "sum_label",
          color: $color("white"),
        },
        layout: function (make, view) {
          make.center.equalTo(view.super)
        }
      }]
    },
    //菜单栏
    {
      type: "menu",
      props: {
        id: "menu",
        alpha: 1,
        borderWidth: 0.5,
        borderColor: $color("#D3D3D3")
      },
      layout: function (make, view) {
        make.left.right.equalTo(0)
        make.bottom.equalTo(view.super.bottom).offset(2)
        make.height.equalTo($device.isIphoneX === true ? 82 : 52)
      },
      views: [
        //首页按钮
        {
          type: "button",
          props: {
            bgcolor: $color("clear")
          },
          layout: function (make, view) {
            make.top.equalTo(view.super).offset(5)
            make.centerX.equalTo(view.super).offset(-wid / 8 * 3)
            make.size.equalTo($size(wid / 4, 50))
          },
          views: [{
            type: "image",
            props: {
              id: "btn0",
              icon: $icon("057", $color(vcolor), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function (make, view) {
              make.top.equalTo(view.super).offset(3)
              make.centerX.equalTo(view.super)

            }
          },
          {
            type: "label",
            props: {
              id: "lab0",
              text: "首页",
              font: $font("bold", 12),
              color: $color(vcolor)
            },
            layout: function (make, view) {
              var prev = view.prev
              make.top.equalTo(prev.bottom).offset(3)
              make.centerX.equalTo(prev)
            }
          }
          ],
          events: {
            tapped: function () {
              activemenu("home")
            },
            longPressed: function () {
              $device.taptic(1)
              $("sum_view").alpha = 1
              $delay(2, function () {
                $ui.animate({
                  duration: 0.8,
                  animation: function () {
                    $("sum_view").alpha = 0
                  },
                })
              })
            }
          }
        },
        {
          type: "button",
          props: {
            bgcolor: $color("clear")
          },
          layout: function (make, view) {
            make.top.equalTo(view.super).offset(5)
            make.centerX.equalTo(view.super).offset(-wid / 8 * 1)
            make.size.equalTo($size(wid / 4, 50))
          },
          views: [{
            type: "image",
            props: {
              id: "btn1",
              icon: $icon("063", $color("lightGray"), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function (make, view) {
              make.top.equalTo(view.super).offset(3)
              make.centerX.equalTo(view.super)
            }
          },
          {
            type: "label",
            props: {
              id: "lab1",
              text: "分类",
              font: $font("bold", 12),
              color: $color("lightGray")
            },
            layout: function (make, view) {
              var prev = view.prev
              make.top.equalTo(prev.bottom).offset(3)
              make.centerX.equalTo(prev)
            }
          }
          ],
          events: {
            tapped: function () {
              activemenu("sort")
            }
          }
        },
        {
          type: "button",
          props: {
            bgcolor: $color("clear")
          },
          layout: function (make, view) {
            make.top.equalTo(view.super).offset(5)
            make.centerX.equalTo(view.super).offset(wid / 8 * 1)
            make.size.equalTo($size(wid / 4, 50))
          },
          views: [{
            type: "image",
            props: {
              id: "btn2",
              icon: $icon("023", $color("lightGray"), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function (make, view) {
              make.top.equalTo(view.super).offset(3)
              make.centerX.equalTo(view.super)
            }
          },
          {
            type: "label",
            props: {
              id: "lab2",
              text: "搜索",
              font: $font("bold", 12),
              color: $color("lightGray")
            },
            layout: function (make, view) {
              var prev = view.prev
              make.top.equalTo(prev.bottom).offset(3)
              make.centerX.equalTo(prev)
            }
          }
          ],
          events: {
            tapped: function () {
              activemenu("search")
            }
          }
        },
        {
          type: "button",
          props: {
            bgcolor: $color("clear")
          },
          layout: function (make, view) {
            make.top.equalTo(view.super).offset(5)
            make.centerX.equalTo(view.super).offset(wid / 8 * 3)
            make.size.equalTo($size(wid / 4, 50))
          },
          views: [{
            type: "image",
            props: {
              id: "btn3",
              icon: $icon("002", $color("lightGray"), $size(20, 20)),
              bgcolor: $color("clear")
            },
            layout: function (make, view) {
              make.top.equalTo(view.super).offset(3)
              make.centerX.equalTo(view.super)
            }
          },
          {
            type: "label",
            props: {
              id: "lab3",
              text: "设置",
              font: $font("bold", 12),
              color: $color("lightGray")
            },
            layout: function (make, view) {
              var prev = view.prev
              make.top.equalTo(prev.bottom).offset(3)
              make.centerX.equalTo(prev)
            }
          }
          ],
          events: {
            tapped: function () {
              activemenu("setting")
            }
          }
        }
      ]
    },
    {
      type: "view",
      props: {
        id: "lottie_bg",
        bgcolor: $color("white")
      },
      views:[
        //启动动画层
        {
          type: "lottie",
          props: {
            src: "assets/loading.json",
            loop: true,
          },
          layout: function (make, view) {
            make.size.equalTo($size(wid, wid));
            make.center.equalTo(view.super);
          }
        }],
      layout: $layout.fill
    },
    
  ]
})

function Start_animation() {
  //启动动画
  $("lottie").play();
  $delay(3, function () {
    $ui.animate({
      duration: 0.5,
      velocity: 1.0,
      animation: function () {
        $("lottie_bg").alpha = 0
      },
      completion: function () {
        $("lottie_bg").remove
      }
    })

    add_main_bg()
    //set_counts_cache()
    home.get_all_json()
    color.color()
    setting.set_hig()
    setting.update()
  })
}

function add_main_bg() {
  for (let i = 0; i < 4; i++) {
    var bg = {
      type: "view",
      props: {
        id: "bg" + i,
        hidden: true
      },
      layout: function (make, view) {
        make.top.left.right.inset(0)
        make.bottom.inset($device.isIphoneX === true ? 80 : 50)
      },
      views: [items[i].page]
    }
    $("main_view_bg").add(bg)
  }
  $("bg0").hidden = false
}

function activemenu(page) {
  //页面切换
  $device.taptic(0)
  for (let i = 0; i < pages.length; i++) {
    if (page == pages[i]) {
      var idx = i
    }
    $("btn" + i).icon = $icon(icons[i], $color("lightGray"), $size(20, 20))
    $("lab" + i).textColor = $color("lightGray")
    $("bg" + i).hidden = true
  }
  $("btn" + idx).icon = $icon(icons[idx], $color(vcolor), $size(20, 20))
  $("lab" + idx).textColor = $color(vcolor)
  $("bg" + idx).hidden = false
  if (idx === 0 || idx === 3) {
    $("main").bgcolor = $color("#F9F9F9")
  } else {
    $("main").bgcolor = $color("white")
  }
}

function start_get_all_json() {
  $http.get({
    url: SETTING_[5],
    timeout: 3,
    handler: function (resp) {
      let data = resp.data
      if (data === undefined || data === "") {
        $delay(1, function () {
          $ui.alert({
            title: "无法载入商店，请检查网络设置或者检查更新！",
            actions: [{
              title: "好的",
              handler: () => {
                $app.close()
              }
            }, {
              title: "检查更新",
              handler: () => {
                setting.update(true)
              }
            }]
          })
        })
      } else {
        $cache.set("all_json", data)
        Start_animation()
      }
    }
  })
}