var wid = $device.info.screen.width
var hig = $device.info.screen.height
var detail = require('scripts/detail')
var vcolor = $cache.get("vcolor")

var sortpage = {
  type: "view",
  props: {
    bgcolor: $color("white")
  },
  layout: $layout.fill,
  views: [{
      type: "label",
      props: {
        text: "分类",
        font: $font("bold", 30)
      },
      layout: function(make, view) {
        make.top.offset(15)
        make.left.offset(15)
      }
    },
    {
      type: "list",
      props: {
        id: "sort",
        rowHeight: 60,
        data: []
      },
      events: {
        didSelect: function(sender, idx, data) {
          $device.taptic(0)
          viewpage(data)
        }
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom).offset(20)
        make.left.right.bottom.offset(0)
      }
    }
  ]
}

function gettags(js) {
  var arr = []
  var brr = []
  for (let i = 0; i < js.length; i++) {
    arr.push(js[i].tag)
    if (arr.indexOf(arr[i]) == i) brr.push(arr[i]);
  }
  $("sort").data = brr
  $cache.set("tags", brr)
}

function getsorts(js) {
  var tags = $cache.get("tags")
  for (let j = 0; j < tags.length; j++) {
    var arr = []
    for (let i = 0; i < js.length; i++) {
      if (js[i].tag === tags[j]) {
        arr.push(js[i])
      }
    }
    $cache.set(tags[j], arr)
  }
}

function viewpage(data) {
  const temp = $cache.get(data)
  var view = {
    props: {
      id: "sort_page",
      navBarHidden: true,
      statusBarStyle: 0
    },
    views: [{
      type: "scroll",
      props: {
        id: "page"
      },
      views: [{
        type: "label",
        props: {
          text: data,
          font: $font("bold", 30)
        },
        layout: function(make, view) {
          make.top.left.equalTo(view.super).offset(15)
        }
      }],
      layout: $layout.fill
    }, {
    type: "gradient",
    props: {
      bgcolor: $color("clear"),
      colors: [$color("white"), $rgba(255,255,255,0)],
      locations: [0.3, 1.0],
      startPoint: $point(0.5, 0),
      endPoint: $point(0.5, 1)
    },
    layout: function(make, view) {
      make.size.equalTo($size(wid, 50))
      make.top.left.inset(0)
    }
  }],
    events: {
      appeared: function() {
        popDelegate = $("sort_page").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$delegate()
        $("sort_page").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$setDelegate(null)
      },
      didAppear: function() {
        popDelegate = $("sort_page").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$delegate()
        $("sort_page").runtimeValue().$viewController().$navigationController().$interactivePopGestureRecognizer().$setDelegate(null)
      }
    }
  }
  $ui.push(view)
  add_sort_views(temp)
}

function add_sort_views(data) {
  js = data
  var arr = []
  for (let i = 0; i < js.length; i++) {
    var viewplate = {
      type: "view",
      props: {
        id: "sort" + i,
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

    $("page").add(viewplate)
    $ui.animate({
      duration: 0.375,
      animation: function() {
        $("sort" + i).alpha = 1
      },
      delay: i * 0.075
    })
  }
  $("page").contentSize = $size(0, js.length * 120 + 80)
}

module.exports = {
  page: sortpage,
  gettags: gettags,
  getsorts: getsorts
}