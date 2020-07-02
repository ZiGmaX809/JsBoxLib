var wid = $device.info.screen.width
var hig = $device.info.screen.height
var detail = require('scripts/detail')
var vcolor = $cache.get("vcolor")

var searchpage = {
  type: "view",
  props: {
    bgcolor: $color("white")
  },
  layout: $layout.fill,
  views: [{
    type: "label",
    props: {
      text: "搜索",
      font: $font("bold", 30)
    },
    layout: function(make, view) {
      make.top.offset(15)
      make.left.offset(15)
    }
  }, {
    type: "input",
    props: {
      id: "sc",
      type: $kbType.search,
      placeholder: "搜索"
    },
    layout: function(make, view) {
      make.centerX.equalTo(view.super)
      make.top.equalTo(view.prev.bottom).offset(20)
      make.size.equalTo($size(wid - 30, 40))
    },
    events: {
      didBeginEditing: function(sender) {
        $("no_result").alpha = 0
      },
      returned: function(sender) {
        $("sc").blur()
        if (sender.text != "") {
          rmviews()
          search(sender.text)
          const res = $cache.get("sresult")
          if (res[0] == null) {
            $("scr").alpha = 0
            $("no_result").alpha = 1
          } else {
            $("scr").alpha = 1
            addviews_s(res)
          }
        } else {
          rmviews()
        }
      }
    }
  }, {
    type: "label",
    props: {
      id: "no_result",
      text: "无结果",
      font: $font(30),
      alpha: 0
    },
    layout: function(make, view) {
      make.center.equalTo(view.super)
    }
  }, {
    type: "scroll",
    props: {
      id: "scr",
      alpha: 0
    },
    layout: function(make, view) {
      make.top.equalTo($("sc").bottom).inset(20)
      make.left.right.bottom.inset(0)
    },
    views: [{
      type: "view",
      props: {
        id: "result",
      },
      layout: function(make, view) {
        make.top.equalTo(view.super)
        make.centerX.equalTo(view.super)
        //make.size.equalTo(view.super)
      },
      views: [{
        type: "view",
        layout: function(make, view) {
          make.top.equalTo(view.super)
        }
      }]
    }]
  }]
}

function getsearch(data) {
  const t_arr = []
  for (let m = 0; m < data.length; m++) {
    const texts = (data[m].summary === undefined ? "" : data[m].summary) + data[m].name + data[m].describe + data[m].author + data[m].tag
    t_arr.push(texts.replace(/\n/g, ""))
  }
  $cache.set("stexts", t_arr)
}

function search(data) {
  const brr = []
  const t = $cache.get("stexts")
  const js = $cache.get("all_json")
  for (let n = 0; n < t.length; n++) {
    var results = new RegExp(data, 'i').exec(t[n])
    if (results != undefined) {
      brr.push(js[n])
    }
  }
  $cache.set("sresult", brr)
}

function addviews_s(data) {
  js = data
  var arr = []
  for (let i = 0; i < js.length; i++) {
    var viewplate = {
      type: "view",
      props: {
        id: "search" + i,
        alpha: 0,
        bgcolor: $color("white")
      },
      views: [{
        type: "image",
        props: {
          bgcolor: $color("clear"),
          icon: $icon(js[i].icon, $color(vcolor), $size(25, 25))
        },
        layout: function(make, view) {
          make.left.equalTo(view.super).offset(20)
          make.centerY.equalTo(view.super)
          make.size.equalTo($size(25, 25))
        }
      }, {
        type: "label",
        props: {
          text: js[i].name,
          font: $font("bold", 18),
          color: $color(vcolor)
        },
        layout: function(make, view) {
          make.left.equalTo(view.prev.right).offset(20)
          make.top.equalTo(view.super).offset(27)
        }
      }, {
        type: "label",
        props: {
          text: js[i].author + " • " + js[i].describe,
          font: $font(15),
          textColor: $color("gray")
        },
        layout: function(make, view) {
          make.left.equalTo(view.prev)
          make.top.equalTo(view.prev.bottom).offset(5)
          make.width.equalTo(wid - 115)
        }
      }],
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom).offset(20)
        make.centerX.equalTo(view.super)
        make.size.equalTo($size(wid - 30, 100))
        detail.shadow(view)
      },
      events: {
        tapped: function(sender) {
          $device.taptic(0)
          $ui.push(detail.push_detail)
          detail.add_detail_bg(js[i].icon)
          detail.add_detailinfo(js[i])
          detail.get_counts_num(js[i].id)
        }
      }
    }

    $("result").add(viewplate)
    $ui.animate({
      duration: 0.375,
      animation: function() {
        $("search" + i).alpha = 1
      },
      delay: i * 0.075
    })
  }
  const h = js.length * 120 + 20
  $("scr").contentSize = $size(0, h)
  $("result").updateLayout(function(make) {
    make.size.equalTo($size(wid, h))
  })
}

function rmviews() {
  const t = $("result").views.length - 1
  for (let i = 0; i < t; i++) {
    $("search" + i).remove()
  }
}

module.exports = {
  page: searchpage,
  getsearch: getsearch
}