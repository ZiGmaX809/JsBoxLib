var const_ = require("scripts/const");
var convert = require("scripts/convert");
var lucky = require("scripts/lucky");
var like = require("scripts/like");
var items = [lucky, convert, like];

$ui.render({
  props: {
    navBarHidden: true,
    statusBarStyle: 0
    //statusBarHidden: true,
  },
  views: [
    {
      type: "view",
      props: {
        id: "LottiePage"
      },
      layout: $layout.fill,
      views: [
        {
          //loading
          type: "lottie",
          props: {
            src: "assets/loading.json",
            loop: true
          },
          layout: function (make, view) {
            make.size.equalTo($size(237, 133.3));
            make.center.equalTo(view.super);
          }
        },
        {
          type: "image",
          props: {
            src: "assets/img_0.png"
          },
          layout: function (make, view) {
            make.centerX.equalTo(view.super);
            make.centerY.equalTo(view.super).offset(5);
            make.size.equalTo($size(90, 86.7));
          }
        },
        {
          type: "label",
          props: {
            text: $l10n("support"),
            lines: 3,
            font: $font(13),
            align: $align.center,
            textColor: $color("lightGray")
          },
          layout: function (make, view) {
            make.centerX.equalTo(view.super);
            make.bottom.equalTo(view.super).offset(-120);
          }
        }
      ]
    },
    {
      type: "view",
      props: {
        id: "MainPage",
        bgcolor: $color("clear"),
        alpha: 0
      },
      layout: $layout.fill,
      views: [
        {
          type: "view",
          props: {
            id: "MainPage_Views"
          },
          layout: function (make, view) {
            make.left.right.equalTo(view.super);
            make.top.equalTo(view.super).inset(const_.T_h);
            make.bottom.equalTo(view.super).inset(-const_.M_h);
          },
          views: []
        },
        {
          type: "view",
          props: {
            id: "Title_Bar"
          },
          layout: function (make, view) {
            make.top.left.right.equalTo(view.super);
            make.size.equalTo($size(const_.wid, const_.T_h));
          },
          views: [
            {
              //Title
              type: "label",
              props: {
                id: "title",
                text: "𝐈'𝐦 𝐟𝐞𝐞𝐥𝐢𝐧𝐠 𝐥𝐮𝐜𝐤𝐲",
                textColor: $color("tint"),
                align: $align.center
              },
              layout: function (make, view) {
                make.centerX.equalTo(view.super);
                make.bottom.equalTo(view.super.bottom).offset(-5);
              }
            },
            {
              //line
              type: "view",
              props: {
                bgcolor: $color("darkGray"),
                alpha: 0.3
              },
              layout: function (make, view) {
                make.top.equalTo(view.super).inset(const_.T_h - 0.5);
                make.size.equalTo($size(const_.wid, 0.5));
              }
            }
          ]
        },
        {
          type: "view",
          props: {
            id: "Menu_Bar"
          },
          layout: function (make, view) {
            make.bottom.left.right.equalTo(view.super);
            make.size.equalTo($size(const_.wid, const_.M_h));
          },
          views: [
            {
              //menu
              type: "view",
              props: {
                bgcolor: $color("white")
              },
              layout: $layout.fill,
              views: [
                {
                  type: "button",
                  props: {
                    id: "bt_0",
                    bgcolor: $color("white"),
                    icon: $icon("055", $color("tint"), $size(20, 20))
                  },
                  layout: function (make, view) {
                    make.centerX.equalTo(view.super).offset(-const_.wid / 3);
                    make.top.inset(0);
                    make.size.equalTo($size(100, const_.M_h - const_.B_inset));
                  },
                  events: {
                    tapped: function (sender) {
                      activepage(0);
                      $("title").text = "𝐈'𝐦 𝐟𝐞𝐞𝐥𝐢𝐧𝐠 𝐥𝐮𝐜𝐤𝐲";
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    id: "bt_1",
                    bgcolor: $color("white"),
                    icon: $icon("010", $color("lightGray"), $size(20, 20))
                  },
                  layout: function (make, view) {
                    make.centerX.equalTo(view.super);
                    make.top.inset(0);
                    make.size.equalTo($size(100, const_.M_h - const_.B_inset));
                  },
                  events: {
                    tapped: function (sender) {
                      activepage(1);
                      $("title").text = "Patterns";
                      $("title").font = $font("AcademyEngravedLetPlain", 20);
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    id: "bt_2",
                    bgcolor: $color("white"),
                    icon: $icon("103", $color("lightGray"), $size(20, 20))
                  },
                  layout: function (make, view) {
                    make.centerX.equalTo(view.super).offset(const_.wid / 3);
                    make.top.inset(0);
                    make.size.equalTo($size(100, const_.M_h - const_.B_inset));
                  },
                  events: {
                    tapped: function (sender) {
                      activepage(2);
                      $("title").text = "𝕃𝕚𝕜𝕖 𝕄𝕖";
                    }
                  }
                }
              ]
            },
            {
              //line
              type: "view",
              props: {
                bgcolor: $color("darkGray"),
                alpha: 0.3
              },
              layout: function (make, view) {
                make.top.equalTo(view.prev.top);
                make.size.equalTo($size(const_.wid, 0.5));
              }
            }
          ]
        }
      ]
    }
  ]
});

//update();
$("lottie").play();
add_views();
$delay(2, function () {
  $ui.animate({
    duration: 0.8,
    animation: function () {
      $("LottiePage").alpha = 0;
      $("MainPage").alpha = 1;
    },
    completion: function () {
      $("LottiePage").remove();
    }
  });
});
judgement();
$("expand").play({
  fromFrame: 65, // Optional
  toFrame: 115,
  handler: finished => {
    // Optional
  }
});

function add_views() {
  for (let i = 0; i < 3; i++) {
    var view_ = {
      type: "view",
      props: {
        id: "Detail_View_" + i,
        hidden: true
      },
      layout: $layout.fill,
      views: [items[i].Page]
    };
    $("MainPage_Views").add(view_);
  }
  $("Detail_View_0").hidden = false;
}

function judgement() {
  //judge cache or expire
  let cache_time = const_.CONFIG[8];
  let times_t = Date.parse(new Date());
  let times_c = $cache.get("timestamp_1");
  let times_cc = $cache.get("timestamp_2");
  if (times_t - times_c > cache_time * 1000 || times_c === undefined) {
    convert.get_Pattern();
    convert.get_Color();
  } else {
    convert.SetText("Hello World");
  }

  if (times_t - times_c > 21600000 || times_cc === undefined) {
    convert.get_text();
  }
}

function activepage(page_idx) {
  //页面切换
  var icons = ["055", "010", "103"];
  var pages = ["lucky", "convert", "like"];

  $device.taptic(0);
  for (var i = 0; i < 3; i++) {
    $("bt_" + i).icon = $icon(icons[i], $color("lightGray"), $size(20, 20));
    $("Detail_View_" + i).hidden = true;
  }
  $("bt_" + page_idx).icon = $icon(
    icons[page_idx],
    $color("tint"),
    $size(20, 20)
  );
  $("Detail_View_" + page_idx).hidden = false;
}

async function update() {
  const get_info = await $http.get(
    "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Patterns/Version.json"
  );
  const location_version = 1.07;
  const online_version = get_info.data[0].version;
  if (online_version > location_version) {
    $http.download({
      url: get_info.data[0].url,
      handler: function (resp) {
        $addin.save({
          name: "Patterns",
          icon: "icon_021.png",
          data: resp.data,
          handler: function (success) {
            $ui.toast("静默更新完成！");
            $delay(1, function () {
              $addin.restart();
            });
          }
        });
      }
    });
  }
}
