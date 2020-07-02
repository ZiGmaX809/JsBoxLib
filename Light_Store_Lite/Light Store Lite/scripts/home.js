var wid = $device.info.screen.width;
var hig = $device.info.screen.height;

var detail = require("scripts/detail");
var sort = require("scripts/sort");
var search = require("scripts/search");
var vcolor = $cache.get("vcolor");

var file = $file.read("Setting.conf");
var DEFAULT_ = ["0", "0", "0", "#007AFF"];
var SETTING_ =
  typeof file == "undefined"
    ? JSON.parse(JSON.stringify(DEFAULT_))
    : JSON.parse(file.string);

var homepage = {
  type: "scroll",
  props: {
    id: "home_scroll",
    bgcolor: $color("#F9F9F9")
  },
  layout: $layout.fill,
  views: [
    //scroll必须嵌套一个view显示，否则会出现bug
    {
      type: "view",
      props: {
        id: "home_view"
      },
      views: [
        //空白锚点
        {
          type: "view",
          props: {
            id: "blank_anchor",
            alpha: 0
          },
          layout: function(make, view) {
            make.left.equalTo(view.super);
          }
        }
      ],
      layout: function(make, view) {
        make.top.equalTo(view.super);
        make.centerX.equalTo(view.super);
      }
    }
  ],
  events: {
    pulled: function(sender) {
      //下拉刷新，移除所有views重新添加
      remove_all_views();
      refresh_all_json();
      $("home_scroll").endRefreshing();
    }
  }
};


function add_all_views(data) {
  //单独增加“全部”标题
  const all_title = {
    type: "label",
    props: {
      id: "all_title",
      text: "全部",
      font: $font("bold", 30)
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev.bottom).offset(5);
      make.left.offset(15);
    }
  };
  $("home_view").add(all_title);

  //自动push全部脚本的views
  const js = data;
  for (let i = 0; i < js.length; i++) {
    const viewplate = {
      type: "view",
      props: {
        id: "all_views_" + i,
        alpha: 0,
        bgcolor: $color("white")
      },
      views: [
        {
          type: "image",
          props: {
            bgcolor: $color("clear"),
            icon: $icon(js[i].icon, $color(vcolor), $size(25, 25))
          },
          layout: function(make, view) {
            make.left.equalTo(view.super).offset(20);
            make.centerY.equalTo(view.super);
            make.size.equalTo($size(25, 25));
          }
        },
        {
          type: "label",
          props: {
            text: js[i].name,
            font: $font("bold", 18),
            color: $color(vcolor)
          },
          layout: function(make, view) {
            make.left.equalTo(view.prev.right).offset(20);
            make.top.equalTo(view.super).offset(27);
          }
        },
        {
          type: "label",
          props: {
            text: js[i].author + " • " + js[i].describe,
            font: $font(15),
            textColor: $color("gray")
          },
          layout: function(make, view) {
            make.left.equalTo(view.prev);
            make.top.equalTo(view.prev.bottom).offset(5);
            make.width.equalTo(wid - 115);
          }
        }
      ],
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom).offset(20);
        make.centerX.equalTo(view.super);
        make.size.equalTo($size(wid - 30, 100));
        detail.shadow(view);
      },
      events: {
        tapped: function(sender) {
          $device.taptic(0);
          $ui.push(detail.push_detail);
          detail.add_detail_bg(js[i].icon);
          detail.add_detailinfo(js[i]);
          //detail.get_counts_num(js[i].id);
        }
      }
    };

    $("home_view").add(viewplate);
    $ui.animate({
      duration: 0.375,
      animation: function() {
        $("all_views_" + i).alpha = 1;
      },
      delay: i * 0.075
    });
  }
  $("home_scroll").contentSize = $size(0, js.length * 120+60);
  $("home_view").updateLayout(function(make) {
    make.size.equalTo($size(wid, js.length * 120+60));
  });
}

function get_all_json() {
  //从缓存获取所有脚本的json
  let art = $cache.get("all_json");
  let data = [];
  //倒序显示
  if (SETTING_[1] === "1") {
    for (let k = art.length - 1; k >= 0; k--) {
      data.push(art[k]);
    }
  } else {
    data = art;
  }

  add_all_views(data);
  sort.gettags(art);
  sort.getsorts(art);
  search.getsearch(art);
  $("sum_label").text = "商店脚本总数:" + art.length;
}

function refresh_all_json() {
  $http.get({
    url: SETTING_[5],
    handler: function(resp) {
      let data = resp.data;
      if (data != undefined) {
        $cache.set("all_json", data);
        get_all_json();
      } else {
        $delay(5, function() {
          $ui.alert({
            title: "无法载入商店，请检查网络设置！",
            actions: [
              {
                title: "好的",
                handler: () => {
                  $app.close();
                }
              }
            ]
          });
        });
      }
    }
  });
}

function remove_all_views() {
  const t = $("home_view").views.length-2;
  for (let i = 0; i < t; i++) {
    $("all_views_" + i).remove();
  }

  $("all_title").remove();
}

module.exports = {
  add_all_views: add_all_views,
  get_all_json: get_all_json,
  page: homepage
};
