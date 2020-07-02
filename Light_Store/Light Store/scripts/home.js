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
        //排行榜标题
        {
          type: "label",
          props: {
            id: "rank_title",
            text: "热门",
            font: $font("bold", 30)
            //alpha: 0
          },
          layout: function(make, view) {
            make.top.offset(15);
            make.left.offset(15);
          }
        },
        //排行榜Loading界面
        {
          type: "view",
          props: {
            id: "rank_loading_view"
            //alpha: 0
          },
          layout: function(make, view) {
            make.left.equalTo(view.super);
            make.size.equalTo($size(wid, 245));
            make.top.equalTo(view.prev.bottom).offset(5);
          },
          views: [
            {
              type: "spinner",
              props: {
                id: "rank_loading_spinner",
                loading: true
              },
              layout: function(make, view) {
                make.center.equalTo(view.super);
              }
            },
            {
              type: "label",
              props: {
                id: "rank_loading_text",
                text: "Loading…",
                font: $font(15),
                color: $color("gray")
              },
              layout: function(make, view) {
                make.centerX.equalTo(view.super);
                make.top.equalTo(view.prev.bottom).offset(5);
              }
            }
          ]
        },
        //排行榜卡片滚动栏
        {
          type: "scroll",
          props: {
            id: "rank_scroll",
            alpha: 0,
            contentOffset: $point(30, 0),
            showsHorizontalIndicator: false,
            alwaysBounceVertical: false,
            pagingEnabled: true,
            contentSize: $size(wid * 10, 0)
          },
          layout: function(make, view) {
            make.left.equalTo(view.super);
            make.size.equalTo($size(wid, 245));
            make.top.equalTo(view.prev);
          },
          views: [
            {
              type: "view",
              props: {
                id: "rank_view"
              },
              layout: function(make, view) {
                make.top.equalTo(view.super);
                make.left.equalTo(view.super).offset(-20);
                make.size.equalTo($size(wid * 3, 250));
              },
              views: [
                {
                  type: "view",
                  layout: function(make, view) {
                    make.top.equalTo(view.super);
                    make.left.equalTo(view.super);
                  }
                }
              ]
            }
          ]
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

function add_rank_views(data) {
  //自动push排行的views
  for (let j = 0; j < data.length; j++) {
    const rank_num = j + 1;
    const viewplate_rank = {
      type: "view",
      props: {
        id: "rank_views_" + j,
        alpha: 0,
        bgcolor: $color(vcolor)
      },
      views: [
        //排行序号
        {
          type: "label",
          props: {
            text: rank_num.toString(),
            color: $color("white"),
            align: $align.center,
            font: $font("AvenirNext-HeavyItalic", 50)
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super);
            make.top.equalTo(view.super).offset(10);
          }
        },
        //第1、2、3名桂冠显示
        {
          type: "image",
          props: {
            src: "assets/wreathleft.png",
            bgcolor: $color("clear"),
            alpha: rank_num < 4 ? 1 : 0
          },
          layout: function(make, view) {
            make.top.equalTo(view.super).offset(10);
            make.centerX.equalTo(view.super).offset(-50);
            make.size.equalTo($size(30, (30 / 100) * 206));
          }
        },
        {
          type: "image",
          props: {
            src: "assets/wreathright.png",
            bgcolor: $color("clear"),
            alpha: rank_num < 4 ? 1 : 0
          },
          layout: function(make, view) {
            make.top.equalTo(view.super).offset(10);
            make.centerX.equalTo(view.super).offset(50);
            make.size.equalTo($size(30, (30 / 100) * 206));
          }
        },
        //脚本名称、作者、信息显示
        {
          type: "label",
          props: {
            text: data[j].name,
            font: $font("HelveticaNeue-Thin", 35),
            align: $align.center,
            color: $color("white")
          },
          layout: function(make, view) {
            make.center.equalTo(view.super);
          }
        },
        {
          type: "label",
          props: {
            text: data[j].author + "\n" + data[j].describe,
            lines: 2,
            align: $align.center,
            font: $font(15),
            textColor: $color("white")
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super);
            make.top.equalTo(view.prev.bottom).offset(30);
            make.width.equalTo(wid - 115);
          }
        }
      ],
      layout: function(make, view) {
        make.left.equalTo(view.prev.right).offset(40);
        make.centerY.equalTo(view.super).offset(-5);
        make.size.equalTo($size(wid - 40, 220));
        detail.shadow(view);
      },
      events: {
        tapped: function(sender) {
          $device.taptic(0);
          $ui.push(detail.push_detail);
          detail.add_detail_bg(data[j].icon);
          detail.add_detailinfo(data[j]);
          detail.get_counts_num(data[j].id);
        }
      }
    };
    //逐个添加动画
    $("rank_view").add(viewplate_rank);
    $ui.animate({
      duration: 0.375,
      animation: function() {
        $("rank_views_" + j).alpha = 1;
      },
      delay: j * 0.075
    });
  }
  //重新设置显示区域
  $("rank_scroll").contentSize = $size(data.length * wid, 0);
  $("rank_view").updateLayout(function(make) {
    make.size.equalTo($size(data.length * wid, 250));
  });
}

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
          detail.get_counts_num(js[i].id);
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
  $("home_scroll").contentSize = $size(0, js.length * 120 + 360);
  $("home_view").updateLayout(function(make) {
    make.size.equalTo($size(wid, js.length * 120 + 360));
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

  //$("rank_loading").alpha = 1
  //$("rank_title").alpha = 1
  add_all_views(data);
  get_rank_json(art);
  sort.gettags(art);
  sort.getsorts(art);
  search.getsearch(art);
  //$cache.set("js", art)
  $("sum_label").text = "商店脚本总数:" + art.length;
}

function refresh_all_json() {
  $http.get({
    url: "https://gitee.com/j0210x/Light-store/raw/master/jsbox.json",
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

function get_rank_json(data) {
  $http.request({
    method: "GET",
    url:
      "https://flqcwu21.api.lncld.net/1.1/classes/downstatistic?order=-counts",
    timeout: 3,
    header: {
      "Content-Type": "application/json",
      "X-LC-Id": $text.base64Decode($cache.get("revalue")[1]),
      "X-LC-Key": $text.base64Decode($cache.get("revalue")[2])
    },
    body: {},
    handler: function(resp) {
      let list = resp.data.results;
      let arr = [];
      if (list != undefined) {
        for (let j = 0; j < (list.length < 11 ? list.length : 10); j++) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].id === list[j].id) {
              arr.push(data[i]);
            }
          }
        }
        $("rank_scroll").alpha = 1;
        $("rank_loading_view").alpha = 0;
        add_rank_views(arr);
        $delay(0.3, function() {
          $("rank_scroll").scrollToOffset($point(0, 0));
        });
      } else {
        $("rank_loading_spinner").loading = false;
        $("rank_loading_text").text = "无法载入";
      }
    }
  });
}

function remove_all_views() {
  const t = $("home_view").views.length - 4;
  for (let i = 0; i < t; i++) {
    $("all_views_" + i).remove();
  }

  const r = $("rank_view").views.length - 1;
  for (let j = 0; j < r; j++) {
    $("rank_views_" + j).remove();
  }
  $("all_title").remove();
}

module.exports = {
  add_all_views: add_all_views,
  get_all_json: get_all_json,
  page: homepage
};
