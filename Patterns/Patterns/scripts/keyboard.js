var const_ = require("scripts/const");
var num = const_.keys(0);
var cases = [const_.keys(1), const_.keys(2)];
var punc_case = [
  ["[", "]", "{", "}", "#", "%", "^", "*", "+", "="],
  ["-", "/", ":", ";", "(", ")", '"', "$", "&"],
  [".", ",", "?", "!", "'", "@", "_"]
];
var DEFAULT = const_.CONFIG[6]; //大小写状态，预先读取是否开启首字母大小写配置
var UP = 0; //大写锁定
var NUM = 0; //符号键盘状态
var btn_h = 52; //按键高度
var spacing = 4.5; //按键间隔
var radius = 5; //按键圆角
var shadowcolor = $color("#808080"); //默认按键阴影颜色
var bgcolor = $color("#DCDCDC"); //键盘底色
var randomcolor = ["#DE8D76", "#76CDBD", "#B5CD54"]; //按键随机色
var alpha_ = const_.judge_driver()[2] === 0 ? 0 : 1;

//连续删除
$define({
  type: "EventEmitter: NSObject",
  props: ["timer", "charCnt", "callCnt"],
  events: {
    "deleteOnce:": sender => {
      $keyboard.playInputClick();
      $keyboard.delete();
    },
    "touchDown:": sender => {
      self.$enableTimer();
    },
    "touchUp:": sender => {
      self.$disableTimer();
      judge_clear();
    },
    enableTimer: () => {
      self.$disableTimer();

      self.$setCharCnt(1);
      self.$setCallCnt(0);

      const timer = $objc(
        "NSTimer"
      ).$scheduledTimerWithTimeInterval_target_selector_userInfo_repeats(
        0.15,
        self,
        "fireAction",
        null,
        true
      );
      self.$setTimer(timer);
    },
    disableTimer: () => {
      if (self.$timer()) {
        self.$timer().$invalidate();
        self.$setTimer(null);
      }
    },
    fireAction: () => {
      self.$setCallCnt(self.$callCnt() + 1);
      $objc(
        "NSObject"
      ).$cancelPreviousPerformRequestsWithTarget_selector_object(
        self,
        "fireAction",
        null
      );

      if (self.$callCnt() % 8 == 0) {
        self.$setCharCnt(self.$charCnt() + 4);
      }

      for (let idx = 0; idx < self.$charCnt(); ++idx) {
        $keyboard.delete();
      }

      $keyboard.playInputClick();
    }
  }
});

const emitter = $objc("EventEmitter").$new();
$objc_retain(emitter);
const button = $objc("BaseButton").$new();
button.$addTarget_action_forControlEvents(emitter, "deleteOnce:", 1 << 0);
button.$addTarget_action_forControlEvents(emitter, "touchDown:", 1 << 0);
button.$addTarget_action_forControlEvents(
  emitter,
  "touchUp:",
  (1 << 6) | (1 << 7) | (1 << 3) | (1 << 5) | (1 << 8)
);

//26按键样式
var temp_26 = {
  props: {},
  views: [
    {
      type: "view",
      props: {
        id: "s_color",
        radius: radius,
        bgcolor: shadowcolor
      },
      layout: $layout.fill
    },
    {
      type: "view",
      props: {
        id: "label_bg",
        radius: radius,
        bgcolor: $color("white")
      },
      layout: function (make, view) {
        make.top.left.right.inset(0);
        make.bottom.inset(1.5);
      }
    },
    {
      type: "label",
      props: {
        id: "label",
        bgcolor: $color("clear"),
        textColor: $color("#000000"),
        align: $align.center,
        font: $font("UIFont", 20)
      },
      layout: $layout.fill
    }
  ]
};

//shift按键样式
var temp_shift = {
  props: {},
  views: [
    {
      type: "view",
      props: {
        id: "s_color",
        radius: radius,
        bgcolor: shadowcolor
      },
      layout: $layout.fill
    },
    {
      type: "view",
      props: {
        radius: radius,
        bgcolor: $color("white")
      },
      layout: function (make, view) {
        make.top.left.right.inset(0);
        make.bottom.inset(1.5);
      }
    },
    {
      type: "view",
      props: {
        bgcolor: $color("clear"),
        clipsToBounds: true
      },
      layout: function (make, view) {
        make.size.equalTo($size(20, 20));
        make.center.equalTo(view.super);
      },
      views: [
        {
          type: "button",
          props: {
            id: "shift_img",
            bgcolor: $color("clear")
          },
          layout: function (make, view) {
            make.size.equalTo($size(20, 60));
            make.left.inset(0);
            make.top.inset(-20 * const_.CONFIG[6]);
          }
        }
      ]
    },
    {
      type: "view",
      props: {
        bgcolor: $color("clear")
      },
      layout: $layout.fill
    }
  ]
};

//小地球样式
var temp_earth = {
  props: {},
  views: [
    {
      type: "view",
      props: {
        id: "s_color",
        radius: radius,
        bgcolor: shadowcolor
      },
      layout: $layout.fill
    },
    {
      type: "view",
      props: {
        radius: radius,
        bgcolor: $color("white")
      },
      layout: function (make, view) {
        make.top.left.right.inset(0);
        make.bottom.inset(1.5);
      }
    },
    {
      type: "view",
      props: {
        bgcolor: $color("clear"),
        clipsToBounds: true
      },
      layout: function (make, view) {
        make.size.equalTo($size(23, 23));
        make.center.equalTo(view.super);
      },
      views: [
        {
          type: "button",
          props: {
            id: "earth_img",
            bgcolor: $color("clear")
          },
          layout: function (make, view) {
            make.size.equalTo($size(23, 23));
            make.top.left.inset(0);
          }
        }
      ]
    },
    {
      type: "view",
      props: {
        bgcolor: $color("clear")
      },
      layout: $layout.fill
    }
  ]
};

//删除键样式
var temp_delete = {
  props: {},
  views: [
    {
      type: "view",
      props: {
        id: "s_color",
        radius: radius,
        bgcolor: shadowcolor
      },
      layout: $layout.fill
    },
    {
      type: "view",
      props: {
        radius: radius,
        bgcolor: $color("white")
      },
      layout: function (make, view) {
        make.top.left.right.inset(0);
        make.bottom.inset(1.5);
      }
    },
    {
      type: "runtime",
      props: {
        id: "delete_img",
        view: button,
        imageEdgeInsets: $insets(12, 13, 12, 13),
        bgcolor: $color("clear"),
        radius: 5
      },
      layout: (make, view) => {
        make.center.equalTo(view.super);
        make.size.equalTo($size(51, 46));
      }
    }
  ]
};

$ui.render({
  props: {
    id: "keyboard_view",
    bgcolor: bgcolor,
    navBarHidden: true,
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "action",
        scrollEnabled: false,
        columns: 5,
        itemHeight: btn_h - 9,
        spacing: spacing,
        bgcolor: $color("clear"),
        template: temp_26,
        data: [
          redata($l10n("Paste")),
          redata($l10n("Copy")),
          redata($l10n("Setting")),
          redata($l10n("Close")),
          redata($l10n("Dismiss"))
        ]
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid, btn_h - 3));
        make.top.equalTo(view.super);
        make.centerX.equalTo(view.super);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          switch (indexPath.row) {
            case 0:
              $keyboard.insert($clipboard.text);
              break;
            case 1:
              $clipboard.text = $keyboard.selectedText;
              break;
            case 2:
              $app.openURL("jsbox://run?name=Patterns&location=local");
              break;
            case 3:
              $app.close();
              break;
            case 4:
              $keyboard.dismiss();
              break;
          }
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "row_0",
        scrollEnabled: false,
        columns: 10,
        itemHeight: btn_h - 6,
        spacing: spacing,
        bgcolor: $color("clear"),
        template: temp_26,
        data: num.map(function (item) {
          return {
            s_color: {
              bgcolor: color_board()
            },
            label: {
              text: "" + item
            }
          };
        })
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid, btn_h));
        make.top.equalTo(view.prev.bottom);
        make.centerX.equalTo(view.super);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $keyboard.insert(data.label.text);
          $keyboard.playInputClick();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "row_1",
        scrollEnabled: false,
        columns: 10,
        itemHeight: btn_h - 6,
        spacing: spacing,
        bgcolor: $color("clear"),
        template: temp_26,
        data: cases[const_.CONFIG[6]][0].map(function (item) {
          return {
            s_color: {
              bgcolor: color_board()
            },
            label: {
              text: "" + item
            }
          };
        })
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid, btn_h));
        make.top.equalTo(view.prev.bottom);
        make.left.equalTo(view.prev);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $keyboard.insert(data.label.text);
          $keyboard.playInputClick();
          action_26();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "row_2",
        scrollEnabled: false,
        columns: 10,
        itemHeight: btn_h - 6,
        spacing: spacing,
        bgcolor: $color("clear"),
        template: temp_26,
        data: cases[const_.CONFIG[6]][1].map(function (item) {
          return {
            s_color: {
              bgcolor: color_board()
            },
            label: {
              text: "" + item
            }
          };
        })
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid, btn_h));
        make.left.equalTo(view.super).inset(const_.wid / 20);
        make.top.equalTo(view.prev.bottom);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $keyboard.insert(data.label.text);
          $keyboard.playInputClick();
          action_26();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "row_3",
        scrollEnabled: false,
        columns: 10,
        itemHeight: btn_h - 6,
        spacing: spacing,
        bgcolor: $color("clear"),
        template: temp_26,
        data: cases[const_.CONFIG[6]][2].map(function (item) {
          return {
            s_color: {
              bgcolor: color_board()
            },
            label: {
              text: "" + item
            }
          };
        })
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid, btn_h));
        make.left.equalTo(view.super).inset((const_.wid * 1.5) / 10);
        make.top.equalTo(view.prev.bottom);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $keyboard.insert(data.label.text);
          $keyboard.playInputClick();
          action_26();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "shift",
        scrollEnabled: false,
        columns: 1,
        spacing: spacing,
        itemHeight: btn_h - 6,
        bgcolor: $color("clear"),
        template: temp_shift,
        data: [
          {
            s_color: {
              bgcolor: color_board()
            },
            shift_img: {
              src: "assets/shift.png"
            }
          }
        ]
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid / 10 + 10, btn_h));
        make.left.inset(5);
        make.top.equalTo(view.prev.top);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          //大小写转换
          //非符号模式
          DEFAULT++;
          switch_uplow();
          //取消大写锁定状态
          UP = 0;
        },
        didLongPress: function (sender, indexPath, data) {
          //大写锁定
          UP = 1;
          DEFAULT = 1;
          //非符号模式
          case_26(1);
          $("shift_img").updateLayout(function (make) {
            make.top.inset(-40);
          });
        }
      }
    },
    {
      //shift键蒙版，符号键盘用以禁用shift按键
      type: "view",
      props: {
        id: "shift_m",
        bgcolor: $color("clear"),
        hidden: true
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid / 10 + 10, btn_h));
        make.left.inset(5);
        make.top.equalTo(view.prev.top);
      }
    },
    {
      type: "matrix",
      props: {
        id: "delete",
        scrollEnabled: false,
        columns: 1,
        itemHeight: btn_h - 6,
        spacing: 4,
        bgcolor: $color("clear"),
        template: temp_delete,
        data: [
          {
            s_color: {
              bgcolor: color_board()
            },
            delete_img: {
              src: "assets/del.png"
            }
          }
        ]
      },
      layout: function (make, view) {
        make.size.equalTo($size(const_.wid / 10 + 10, btn_h));
        make.right.inset(5);
        make.top.equalTo($("row_3").top).inset(1)
      }
    },
    {
      type: "matrix",
      props: {
        id: "punc",
        scrollEnabled: false,
        columns: 1,
        itemHeight: btn_h - 6,
        spacing: 4,
        bgcolor: $color("clear"),
        template: temp_26,
        data: [redata("#+=")]
      },
      layout: function (make, view) {
        make.size.equalTo($size(51, btn_h));
        make.left.inset(5);
        make.top.equalTo(view.prev.bottom);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          NUM++;
          //符号键盘切换
          switch_num();
          $keyboard.playInputClick();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "earth",
        scrollEnabled: false,
        columns: 1,
        itemHeight: btn_h - 6,
        spacing: 4,
        bgcolor: $color("clear"),
        template: temp_earth,
        alpha: alpha_,
        data: [
          {
            s_color: {
              bgcolor: color_board()
            },
            earth_img: {
              src: "assets/earth.png"
            }
          }
        ]
      },
      layout: function (make, view) {
        make.size.equalTo($size(51, btn_h));
        make.left.equalTo(view.prev.right);
        make.top.equalTo(view.prev.top);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $keyboard.next();
          $keyboard.playInputClick();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "space",
        scrollEnabled: false,
        columns: 1,
        itemHeight: btn_h - 6,
        spacing: 4,
        bgcolor: $color("clear"),
        template: temp_26,
        data: [redata("Space")]
      },
      layout: function (make, view) {
        let prv = alpha_ === 0 ? view.prev.prev.right : view.prev.right;
        let cc = alpha_ === 0 ? 3 : 4;
        make.size.equalTo($size(const_.wid - 51 * cc, btn_h));
        make.left.equalTo(prv);
        make.top.equalTo(view.prev.top);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $keyboard.insert(" ");
          $keyboard.playInputClick();
        }
      }
    },
    {
      type: "matrix",
      props: {
        id: "enter",
        scrollEnabled: false,
        columns: 1,
        itemHeight: btn_h - 6,
        spacing: 4,
        bgcolor: $color("clear"),
        template: temp_26,
        data: [
          {
            s_color: {
              bgcolor: $color("darkGray")
            },
            label_bg: {
              bgcolor: $color("#3478F2")
            },
            label: {
              text: "Enter",
              font: $font(15),
              textColor: $color("white")
            }
          }
        ]
      },
      layout: function (make, view) {
        make.size.equalTo($size(92, btn_h));
        make.left.equalTo(view.prev.right);
        make.top.equalTo(view.prev.top);
      },
      events: {
        didSelect: function (sender, indexPath, data) {
          $keyboard.send();
          $keyboard.playInputClick();
        }
      }
    }
  ],
  layout: function (make, view) {
    make.size.equalTo($size(const_.wid, 267));
    make.center.equalTo(view.super);
  }
});

function trans(ca, idx) {
  let ccc = ca < 2 ? cases[ca] : punc_case;
  let data = ccc[idx].map(function (item) {
    return {
      label: {
        text: "" + item
      }
    };
  });
  return data;
}

function redata(txt) {
  return {
    s_color: {
      bgcolor: color_board()
    },
    label: {
      text: txt,
      font: $font(15)
    }
  };
}

function case_26(idx) {
  //载入大小写 idx 0 为小写 1为大写
  for (var i = 1; i < 4; i++) {
    $("row_" + i).data = trans(idx, i - 1);
  }
}

function judge_clear() {
  //在删除完成后调用
  if (!$keyboard.hasText) {
    DEFAULT = const_.CONFIG[6];
    //重置符号模式
    $("punc").data = [redata("#+=")];
    NUM = 0;
    UP = 0;
    case_26(DEFAULT % 2);
    //图标切换
    $("shift_img").updateLayout(function (make) {
      make.top.inset(-20 * (DEFAULT % 2));
    });
  }
}

function switch_uplow() {
  //字母大小写转换
  //0 小写 1 大写
  case_26(DEFAULT % 2);
  //图标切换
  $keyboard.playInputClick();
  $("shift_img").updateLayout(function (make) {
    make.top.inset(-20 * (DEFAULT % 2));
  });
}

function switch_num() {
  if (NUM % 2 === 0) {
    //字母键盘
    $("punc").data = [redata("#+=")];
    $("shift_m").hidden = true;
    case_26(DEFAULT % 2);
    let ins = UP === 1 ? -40 : DEFAULT % 2 === 0 ? 0 : -20;
    $("shift_img").updateLayout(function (make) {
      make.top.inset(ins);
    });
  } else {
    //符号键盘
    $("punc").data = [redata("ABC")];
    $("shift_m").hidden = false;
    case_26(2);
    $("shift_img").updateLayout(function (make) {
      make.top.inset(0);
    });
  }
}

function action_26() {
  //26按键按下时判断是否是符号模式
  if (UP != 1 && NUM % 2 != 1) {
    //非大写锁定及非符号键盘
    if (DEFAULT % 2 === 1) {
      case_26(0);
      DEFAULT = 0;
      $("shift_img").updateLayout(function (make) {
        make.top.inset(0);
      });
    }
  }
}

function color_board() {
  if (const_.CONFIG[7]) {
    return $color(randomcolor[Math.floor(Math.random() * randomcolor.length)]);
  } else {
    return shadowcolor;
  }
}
