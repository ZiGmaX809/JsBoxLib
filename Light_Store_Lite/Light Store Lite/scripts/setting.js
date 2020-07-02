var wid = $device.info.screen.width
var hig = $device.info.screen.height

var version = 1.00
var color = require('scripts/color')
var file = $file.read("Setting.conf")
var colors = color.colors
var DEFAULT_ = ["0", "0", "0", "#007AFF","https://gitee.com/j0210x/Light-store/raw/master/jsbox.json"]
var SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)
var disp_num = 2 //显示栏最少显示数量
var vh = (SETTING_[2] === "1" ? (SETTING_[3] === "1" ? disp_num + 1 : disp_num + 2) : disp_num) * 42
var vcolor = $cache.get("vcolor")

var thanks = {
  type: "view",
  layout: $layout.fill,
  views: [{
    type: "markdown",
    props: {
      id: "md",
      content: ""
    },
    layout: $layout.fill
  }]
}

var source = {
  type: "input",
  props: {
    id: "source",
    text: SETTING_[5],
    bgcolor: $color("white"),
    type: $kbType.default,
  },
  layout: function (make, view) {
    make.left.offset(8)
    make.centerY.equalTo(view.super)
    make.size.equalTo($size(wid - 30, 32))
  },
  events: {
    returned: function (sender) {
      save_setting(5, sender.text)
      sender.blur()
      reboot()
    }
  }
}

var settingpage = {
  type: "scroll",
  layout: $layout.fill,
  props: {
    id: "settview",
    bgcolor: $color("#F9F9F9")
  },
  views: [{
    type: "label",
    props: {
      text: "设置",
      font: $font("bold", 30)
    },
    layout: function (make, view) {
      make.top.offset(15)
      make.left.offset(15)
    }
  }, {
    type: "label",
    props: {
      text: "显示",
      font: $font(13.5),
      color: $color("gray")
    },
    layout: function (make, view) {
      make.top.equalTo(view.prev.bottom).offset(20)
      make.left.offset(15)
    }
  }, {
    type: "view",
    props: {
      id: "display",
      bgcolor: $color("white"),
      borderWidth: 0.3,
      borderColor: $color("#DDDDDD")
    },
    layout: function (make, view) {
      make.size.equalTo($size(wid + 2, vh))
      make.top.equalTo(view.prev.bottom).offset(8)
    },
    views: [
      //顺序逆序显示
      {
        type: "label",
        props: {
          text: "首页逆序显示",
          font: $font(16)
        },
        layout: function (make, view) {
          make.left.offset(15)
          make.top.offset(11.5)
        }
      }, {
        type: "switch",
        props: {
          id: "stc_Reverse",
          onColor: $color(vcolor),
          on: SETTING_[1] === "1" ? true : false
        },
        layout: function (make, view) {
          make.centerY.equalTo(view.prev)
          make.right.offset(-30)
        },
        events: {
          changed: function () {
            $("stc_Reverse").on === true ? save_setting(1, "1") : save_setting(1, "0")
            reboot()
          }
        }
      },
      {
        type: "view",
        props: {
          bgcolor: $color("#DDDDDD")
        },
        layout: function (make, view) {
          make.size.equalTo($size(wid, 0.3))
          make.top.equalTo(view.prev.bottom).offset(5)
          make.left.offset(15)
        }
      },
      //炫彩模式
      {
        type: "label",
        props: {
          text: "炫彩模式",
          font: $font(16),
        },
        layout: function (make, view) {
          make.left.offset(15)
          make.top.equalTo(view.prev.bottom).offset(11.5)
        }
      }, {
        type: "switch",
        props: {
          id: "stc_Colormode",
          onColor: $color(vcolor),
          on: SETTING_[2] === "1" ? true : false
        },
        layout: function (make, view) {
          make.centerY.equalTo(view.prev)
          make.right.offset(-30)
        },
        events: {
          changed: function (sender) {
            if ($("stc_Colormode").on === true) {
              if ($("stc_Randomcolor").on === true) {
                save_setting(3, "1")
                change($("display"), disp_num)
                const m = colors.length
                const n = Math.floor(Math.random() * (m + 1))
                $cache.set("vcolor", colors[n])
              } else {
                change($("display"), disp_num + 1)
                save_setting(3, "0")
                $cache.set("vcolor", SETTING_[4])
              }
              save_setting(2, "1")
            } else {
              change($("display"), disp_num - 1)
              save_setting(2, "0")
              $cache.set("vcolor", "black")
            }
            set_setting_height()
            reboot()
          }
        }
      },
      {
        type: "view",
        props: {
          bgcolor: $color("#DDDDDD")
        },
        layout: function (make, view) {
          make.size.equalTo($size(wid, 0.3))
          make.top.equalTo(view.prev.bottom).offset(5)
          make.left.offset(15)
        }
      },
      //随机颜色
      {
        type: "label",
        props: {
          text: "随机颜色",
          font: $font(16),
        },
        layout: function (make, view) {
          make.left.offset(15)
          make.top.equalTo(view.prev.bottom).offset(11.5)
        }
      },
      {
        type: "switch",
        props: {
          id: "stc_Randomcolor",
          onColor: $color(vcolor),
          on: SETTING_[3] === "1" ? true : false
        },
        layout: function (make, view) {
          make.centerY.equalTo(view.prev)
          make.right.offset(-30)
        },
        events: {
          changed: function (sender) {
            if ($("stc_Randomcolor").on === true) {
              change($("display"), disp_num)
              save_setting(3, "1")
              const m = colors.length
              const n = Math.floor(Math.random() * (m + 1))
              $cache.set("vcolor", colors[n])
            } else {
              change($("display"), disp_num + 1)
              save_setting(3, "0")
              $cache.set("vcolor", SETTING_[4])
            }
            set_setting_height()
            reboot()
          }
        }
      },
      {
        type: "view",
        props: {
          bgcolor: $color("#DDDDDD")
        },
        layout: function (make, view) {
          make.size.equalTo($size(wid, 0.3))
          make.top.equalTo(view.prev.bottom).offset(5)
          make.left.offset(15)
        }
      },
      //自定义颜色
      {
        type: "label",
        props: {
          text: "自定义主题颜色",
          font: $font(16),
        },
        layout: function (make, view) {
          make.left.offset(15)
          make.top.equalTo(view.prev.bottom).offset(11.5)
        }
      },
      {
        type: "input",
        props: {
          id: "hex",
          type: $kbType.default,
          text: SETTING_[4],
          bgcolor: $color("#EEEEEE"),
          placeholder: "#007AFF"
        },
        layout: function (make, view) {
          make.centerY.equalTo(view.prev)
          make.size.equalTo($size(120, 32))
          make.right.offset(-28)
        },
        events: {
          returned: function (sender) {
            sender.text === "" ? save_setting(4, "#007AFF") : save_setting(4, sender.text)
            $cache.set("vcolor", sender.text)
            $("hex").blur()
            reboot()
          }
        }
      }, {
        type: "button",
        props: {
          title: "当前",
          bgcolor: $color(vcolor)
        },
        layout: function (make, view) {
          make.size.equalTo($size(50, 32))
          make.right.equalTo(view.prev.left).offset(-5)
          make.centerY.equalTo(view.prev)
        },
        events: {
          tapped: function () {
            $("hex").text = vcolor
            save_setting(4, vcolor)
            $cache.set("vcolor", vcolor)
            reboot()
          }
        }
      }
    ]
  }, 
  {
    type: "list",
    props: {
      id: "setting_list",
      scrollEnabled: false,
      font: $font(14),
      color: $color("gray"),
      data: [{
        title:"源",
        rows:[source]
      },{
        title: "缓存",
        rows: ["清理网络缓存", "清理全部缓存"]
      }, {
        title: "关于",
        rows: ["关于", "感谢名单", "打赏支持", "联系反馈", "关注公众号"]
      }],
      footer: {
        type: "label",
        props: {
          height: 20,
          text: "© Coded By 🆉🄸🅶🄼🄰",
          textColor: $color("#AAAAAA"),
          align: $align.center,
          font: $font(12)
        }
      }
    },
    events: {
      didSelect: function (sender, indexPath, data) {
        about(data)
      }
    },
    layout: function (make, view) {
      make.top.equalTo(view.prev.bottom)
      make.size.equalTo($size(wid, hig))
    }
  }
  ]
}

function change(sender, num) {
  sender.updateLayout(make => {
    make.size.equalTo($size(wid + 2, 42 * (num + 1)))
  });
  $ui.animate({
    duration: 0.3,
    velocity: 0.3,
    animation: function () {
      sender.relayout();
    }
  })
}

function about(data) {
  switch (data) {
    case "关于":
      {
        $safari.open({ url: "http://www.zigma.cc/2018/07/21/%E3%80%90JsBox%E3%80%91Light-Store%E7%AC%AC%E4%B8%89%E6%96%B9%E8%BD%BB%E9%87%8F%E5%95%86%E5%BA%97/" })
      }
      break
    case "清理网络缓存":
      {
        clear_webcache()
      }
      break
    case "清理全部缓存":
      {
        clear_webcache()
        $cache.clear()
        $cache.set("time", 240)
      }
      break
    case "感谢名单":
      {
        $ui.push(thanks)
        $http.get({
          url: "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Light_Store/Thanks.md",
          handler: function (resp) {
            var data = resp.data
            $("md").content = data
          }
        })
      }
      break
    case "打赏支持":
      {
        $ui.menu({
          items: ["支付宝", "微信"],
          handler: function (title, idx) {
            switch (idx) {
              case 0:
                {
                  $app.openURL("HTTPS://QR.ALIPAY.COM/FKX07426ELM5A1ZGXMJR4E")
                }
                break
              case 1:
                {
                  $photo.save({
                    data: $file.read("assets/like.jpeg"),
                    handler: function (success) {
                      $ui.alert({
                        title: "感谢支持！",
                        message: "由于系统限制，赞赏二维码已保存到相册，请点击OK跳转到微信扫码赞赏！",
                        actions: [{
                          title: "OK",
                          handler: function () {
                            $app.openURL("weixin://scanqrcode")
                          }
                        }]
                      })
                    }
                  })
                }
                break
            }
          }
        })
      }
      break
    case "联系反馈":
      {
        $ui.menu({
          items: ["邮件", "Telegram"],
          handler: function (title, idx) {
            switch (idx) {
              case 0:
                {
                  $message.mail({
                    subject: "Light Store Lite反馈信息",
                    to: ["pyrogas7@gmail.com"],
                    cc: [],
                    bcc: [],
                    body: "",
                    handler: function (result) { }
                  })
                }
                break
              case 1:
                {
                  $app.openURL("https://t.me/ZiGmaX809")
                }
                break
            }
          }
        })

      }
      break
    case "关注公众号":
      {
        $clipboard.text = "ZiGma"
        $ui.alert({
          message: "已复制公众号名称，点击确认将跳转至微信，搜索公众号后关注即可。",
          actions: [{
            title: "取消",
            handler: () => { }
          }, {
            title: "确认",
            handler: () => {
              $app.openURL("weixin://")
            }
          }]
        })
      }
      break
  }
}

function update(sender) {
  //更新
  $ui.loading(true)
  var updateURL = "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Light_Store_Lite/Light%20Store%20Lite.box"
  $http.get({
    url: "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Light_Store_Lite/Version",
    handler: function (resp) {
      $ui.loading(false)
      var data = resp.data
      if (data[0] > version) {
        $ui.alert({
          title: "发现新版本, 是否更新？",
          message: data[1],
          actions: [{
            title: "下次再说",
            handler: () => { }
          }, {
            title: "立即更新",
            handler: () => {
              $http.download({
                url: updateURL,
                handler: function (resp) {
                  $addin.save({
                    name: "Light Store Lite",
                    icon: "icon_115.png",
                    data: resp.data,
                    handler: function (success) {
                      $ui.toast("更新完成，3秒后重启！")
                      $delay(3, function () {
                        $app.openExtension("Light Store Lite")
                      });
                    }
                  })
                }
              })
            }
          }]
        })
      } else {
        if (sender === true) {
          $ui.alert({
            title: "暂无更新，请检查网络！",
            actions: [{
              title: "好的",
              handler: () => {
                $app.close()
              }
            }]
          })
        }
      }
    }
  })
}

function reboot() {
  $delay(0.1, function () {
    $ui.alert({
      message: "是否重启脚本以应用更改？",
      actions: [{
        title: "取消",
        handler: () => { }
      }, {
        title: "确认",
        handler: () => {
          $app.openExtension($addin.current.name)
          //$addin.restart()
        }
      }]
    })
  })
}

function clear_webcache() {
  var date = $objc('NSDate').invoke('dateWithTimeIntervalSince1970', 0)
  $objc('NSURLCache').invoke('sharedURLCache').invoke('removeCachedResponsesSinceDate', date)

  var types = $objc('NSMutableSet').invoke('set')

  types.invoke('addObject', 'WKWebsiteDataTypeDiskCache')
  types.invoke('addObject', 'WKWebsiteDataTypeMemoryCache')
  types.invoke('addObject', 'WKWebsiteDataTypeOfflineWebApplicationCache')

  var handler = $block("void, void", function () {
    $ui.toast("缓存已清理！")
  })

  $objc('WKWebsiteDataStore').invoke('defaultDataStore').invoke('removeDataOfTypes:modifiedSince:completionHandler:', types, date, handler)
}

//动态调整设置页面高度
function set_setting_height() {
  let vvh = ($("stc_Colormode").on === true ? ($("stc_Randomcolor").on === true ? disp_num + 1 : disp_num + 2) : disp_num) * 42
  $("settview").contentSize = $size(0, $("setting_list").contentSize.height + vvh + 120)
}

//启动时调整设置页面高度，在main调用
function set_hig() {
  $("settview").contentSize = $size(0, $("setting_list").contentSize.height + vh + 120)
}

//保存设置
function save_setting(section, value) {
  SETTING_[section] = value
  $file.write({
    data: $data({ string: JSON.stringify(SETTING_) }),
    path: "Setting.conf"
  })
}

module.exports = {
  page: settingpage,
  set_hig: set_hig,
  update: update
}
