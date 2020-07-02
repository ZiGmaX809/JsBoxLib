var wid = $device.info.screen.width
var hig = $device.info.screen.height
var addins = $addin.list
var vcolor = $cache.get("vcolor")
var ramp = require('scripts/ramp')
var timer

var push_detail = {
  type: "view",
  props: {
    id: "push_detail",
    bgcolor: $color("white"),
    navBarHidden: true,
    statusBarStyle: 0
  },
  views: [{
    type: "view",
    props: {
      id: "detail_bg",
    },
    layout: function(make, view) {
      make.top.equalTo(view.super).offset(10)
      make.left.offset(-180)
    },
    views: [{
      type: "view",
      layout: function(make, view) {
        make.top.left.equalTo(view.super)
      }
    }]
  }, {
    type: "gradient",
    props: {
      bgcolor: $color("clear"),
      colors: [$color("white"), $rgba(255, 255, 255, 0)],
      locations: [0.3, 1.0],
      startPoint: $point(0.5, 0),
      endPoint: $point(0.5, 1)
    },
    layout: function(make, view) {
      make.size.equalTo($size(wid, 50))
      make.top.left.inset(0)
    }
  }],
  layout: $layout.fill,
  events: {
    appeared: function() {
      popDelegate = $("push_detail").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$delegate()
      $("push_detail").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$setDelegate(null)
    },
    didAppear: function() {
      popDelegate = $("push_detail").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$delegate()
      $("push_detail").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$setDelegate(null)
    }
  }
}

function add_detailinfo(data) {
  const icon = data.icon
  const name = data.name
  const author = data.author
  const tag = data.tag
  const url = data.url
  const describe = data.describe
  const summary = data.summary
  const link = data.link
  const id = data.id
  //详情页图标、信息、安装等
  var detail = {
    type: "view",
    props: {
      id: "d_info"
    },
    layout: function(make, view) {
      make.size.equalTo($size(wid, hig))
      //make.bottom.inset(60)
      shadow(view)
    },
    views: [{
        type: "view",
        props: {
          id: "d_bg",
          bgcolor: $color("white")
        },
        layout: function(make, view) {
          make.size.equalTo($size(wid, hig * 0.75))
          make.left.equalTo(view.super)
          make.bottom.inset(0)
        }
      },
      //图标
      {
        type: "view",
        props: {
          id: "d_ico",
          bgcolor: $color(vcolor),
          borderWidth: 0.1,
          borderColor: $color("gray"),
          radius: 15
        },
        layout: function(make, view) {
          make.size.equalTo($size(70, 70))
          make.top.equalTo(view.prev).offset(-35)
          make.left.equalTo(view.prev).offset(30)
        },
        views: [{
          type: "view",
          props: {
            bgcolor: $color("white"),
            radius: 29,
            frame: $rect(5, 5, 60, 60)
          }
        }, {
          type: "image",
          props: {
            bgcolor: $color("clear"),
            icon: $icon(icon, $color(vcolor), $size(30, 30))
          },
          layout: function(make, view) {
            make.center.equalTo(view.super)
          }
        }]
      },
      //脚本名称
      {
        type: "label",
        props: {
          id: "d_name",
          text: name,
          font: $font("bold", 25),
          color: $color(vcolor)
        },
        layout: function(make, view) {
          make.left.equalTo(view.prev).offset(85)
          make.top.equalTo(view.prev)
        }
      },
      //脚本简介
      {
        type: "label",
        props: {
          text: describe,
          font: $font(13),
          color: $color("gray")
        },
        layout: function(make, view) {
          make.left.equalTo(view.prev)
          make.top.equalTo(view.prev).offset(45)
          make.width.equalTo(wid - 150)
        }
      },
      //作者信息等
      {
        type: "label",
        props: {
          id: "au",
          text: "作者：" + author + "\n分类：" + tag,
          font: $font(12),
          lines: 2,
          color: $color("gray"),
        },
        layout: function(make, view) {
          make.top.equalTo($("d_ico").bottom).offset(10)
          make.left.equalTo($("d_ico").left)
        }
      },
      //下载量
      {
        type: "label",
        props: {
          id: "counts",
          text: "下载：",
          font: $font(12),
          color: $color("gray"),
        },
        layout: function(make, view) {
          make.top.equalTo(view.prev.bottom)
          make.left.equalTo(view.prev)
        }
      },
      //安装Loading
      {
        type: "canvas",
        props: {
          id: "canvas"
        },
        layout: (make, view) => {
          make.top.equalTo($("au").top)
          make.right.equalTo(view.super).offset(-50)
          make.size.equalTo($size(30, 30))
        },
        events: {
          draw: (view, ctx) => {
            ctx.strokeColor = $color(vcolor)
            ctx.setLineWidth(3)
            ctx.addArc(15, 15, 10, 3.14, 4 * 3.14)
            ctx.strokePath()
          }
        },
        views: [{
          type: "canvas",
          layout: $layout.fill,
          events: {
            draw: (view, ctx) => {
              ctx.fillColor = $color("white")
              ctx.strokeColor = $color(vcolor)
              ctx.addArc(15, 5, 3, 3.14, 4 * 3.14)
              ctx.fillPath()
              ctx.strokePath()
            }
          }
        }]
      },
      //安装按钮
      {
        type: "button",
        props: {
          id: "bto",
          bgcolor: $color(vcolor),
          title: "获取",
          radius: 15
        },
        layout: (make, view) => {
          make.top.equalTo($("au").top)
          make.right.equalTo(view.super).offset(-30)
          make.size.equalTo($size(70, 30))
        },
        events: {
          tapped: function() {
            if ($("bto").title === "打开") {
              $addin.run(name)
            } else {
              install_animation(true)
              install_addin(url, name, icon, author)
              update_downcounts(id)
            }
          }
        }
      },
      //原帖链接
      {
        type: "button",
        props: {
          icon: $icon("020", $color("white"), $size(15, 15)),
          bgcolor: $color(vcolor),
          radius: 15,
          alpha: (link === undefined || link === "") ? 0 : 0.5
        },
        layout: function(make, view) {
          make.top.equalTo(view.prev)
          make.right.equalTo(view.prev.left).offset(-10)
          make.size.equalTo($size(30, 30))
        },
        events: {
          tapped: function() {
            $safari.open({
              url: link,
            })
          }
        }
      },
      //详情
      {
        type: "markdown",
        props: {
          content: (summary != undefined) ? summary.replace(/\n##/g, "\n\n##") : "暂无简介"
        },
        layout: function(make, view) {
          make.size.equalTo($size(wid, hig * 0.6))
          make.top.equalTo(view.prev.bottom).offset(20)
          make.centerX.equalTo(view.super.centerX)
        }
      }
    ]
  }

  $("detail_bg").rotate(-0.475)
  $("push_detail").add(detail)
  open_run(name)
}

function open_run(names) {
  for (let n = 0; n < addins.length; n++) {
    if (addins[n].name.replace(/.js/, "") === names) {
      $("bto").title = "打开"
    }
  }
}

function add_detail_bg(icon) {
  //添加详情页顶部icons背景
  //行
  for (let i = 0; i < 15; i++) {
    //定义锚点
    var anchor = {
      type: "view",
      props: {
        id: i,
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.size.equalTo($size(25, 25))
        make.left.equalTo(view.super).offset((7 - i) * 20)
        make.top.equalTo(view.prev.bottom).offset(20)
      }
    }
    $("detail_bg").add(anchor)
    //列
    for (let j = 0; j < 20; j++) {
      var ico = {
        type: "image",
        props: {
          bgcolor: $color("clear"),
          icon: $icon(icon, $color(vcolor), $size(25, 25)),
          alpha: 0.3
        },
        layout: function(make, view) {
          make.left.equalTo(view.prev.right).offset(25)
          make.top.equalTo(view.prev)
        }
      }
      $("detail_bg").add(ico)
    }
  }
}

function get_counts_num(id) {
  const counts_ = $cache.get("a_counts" + id)
  if (counts_ != undefined) {
    $("counts").text = "下载：" + counts_.counts
  } else {
    $("counts").text = "下载：null"
  }
}

function install_animation(bool) {
  if (bool === true) {
    $("bto").hidden = true
    $("canvas").hidden = false
    var i = 0
    $cache.set("scale", i)
    timer = $timer.schedule({
      interval: 0.01,
      handler: function() {
        $("canvas").rotate($cache.get("scale"))
        i = i + Math.PI / 180 * 6
        $cache.set("scale", i);
      }
    })
  } else {
    $("bto").hidden = false
    $("canvas").hidden = true
    timer.invalidate()
  }
}

function install_addin(url, name, icon, author) {
  $http.get({
    url: url,
    handler: function(resp) {
      if (resp.error === null) {
        $http.download({
          url: url,
          handler: function(resp) {
            $addin.save({
              name: name,
              icon: "icon_" + icon + ".png",
              author: author,
              data: resp.data,
              handler: function(success) {
                if (success === true) {
                  $("bto").title = "打开"
                  install_animation(false)
                }
              }
            })
          }
        })
      } else {
        $delay(3, function() {
          alert("安装失败")
          install_animation(false)
        })
        $("bto").title = "获取"
      }
    }
  })
}

function update_downcounts(id) {
  let object_id = id > 9 ? (id > 99 ? id : "0" + id) : "00" + id
  $http.request({
    method: "PUT",
    url: `https://flqcwu21.api.lncld.net/1.1/classes/downstatistic/${object_id}`,
    timeout: 5,
    header: {
      "Content-Type": "application/json",
      "X-LC-Id": $text.base64Decode(($cache.get("revalue"))[1]),
      "X-LC-Key": $text.base64Decode(($cache.get("revalue"))[2]),
    },
    body: JSON.parse($text.base64Decode(($cache.get("revalue"))[0])),
    handler: function(resp) {
      //实时增加下载量
      cc = parseInt($("counts").text.replace(/下载：/, "")) + 1
      $("counts").text = "下载：" + cc
      //增加缓存下载量
      let js = $cache.get("a_counts" + id)
      let id_ = js.id
      let counts_ = js.counts
      let name_ = js.jsname
      let json_ = {
        "id": id_,
        "counts": counts_ + 1,
        "jsname": name_
      }
      $cache.set("a_counts" + id_, json_)
    }
  })
}

function shadow(view) {
  var layer = view.runtimeValue().invoke("layer")
  layer.invoke("setCornerRadius", 8)
  layer.invoke("setShadowOffset", $size(0, 6))
  layer.invoke("setShadowColor", $color(vcolor === "black" ? "gray" : vcolor).runtimeValue().invoke("CGColor"))
  layer.invoke("setShadowOpacity", 0.4)
  layer.invoke("setShadowRadius", 5)
}

module.exports = {
  push_detail: push_detail,
  add_detailinfo: add_detailinfo,
  add_detail_bg: add_detail_bg,
  get_counts_num: get_counts_num,
  shadow: shadow
}