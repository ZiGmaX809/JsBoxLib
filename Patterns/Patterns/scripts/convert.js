var const_ = require("scripts/const");

var Convert_Page = {
  //maincover
  type: "view",
  props: {
    bgcolor: $color("#EFF1F1")
  },
  layout: function (make, view) {
    make.size.equalTo(
      $size(const_.wid, const_.hig - (const_.M_h + const_.T_h))
    );
  },
  views: [
    {
      //mainlist
      type: "list",
      props: {
        id: "Main",
        rowHeight: 50,
        template: const_.TEMP,
        data: []
      },
      layout: $layout.fill,
      events: {
        didSelect: function (sender, indexPath, data) {
          $clipboard.text = data.label.text;
          $ui.toast("已复制到剪贴板");
        }
      }
    },
    {
      //input_button
      type: "view",
      props: {
        bgcolor: $color("tint")
      },
      layout: function (make, view) {
        make.right.equalTo(view.super).inset(20);
        make.bottom.equalTo(view.super).inset(30);
        make.size.equalTo($size(50, 50));
        const_.shadow(view, 25);
      }
    },
    {
      type: "button",
      props: {
        icon: $icon("030", $color("white")),
        circular: true
      },
      layout: function (make, view) {
        make.right.bottom.equalTo(view.prev);
        make.size.equalTo($size(50, 50));
      },
      events: {
        tapped: function () {
          $input.text({
            type: 1,
            text: $clipboard.text,
            handler: function (text) {
              $clipboard.clear();
              if (/\w/.test(text)) {
                SetText(text);
              }
            }
          });
        }
      }
    }
  ]
};

function get_Pattern() {
  $http.download({
    url:
      "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Patterns/Patterns.json",
    progress: function (bytesWritten, totalBytes) {
      var percentage = (bytesWritten * 1.0) / totalBytes;
    },
    handler: function (resp) {
      let timestamp = Date.parse(new Date());
      $cache.set("Pattern_0", JSON.parse(resp.data.string)[0]);
      $cache.set("Pattern_1", JSON.parse(resp.data.string)[1]);
      $cache.set("Pattern_2", JSON.parse(resp.data.string)[2]);
      $cache.set("timestamp_1", timestamp);
      SetText("Hello World");
    }
  });
}

function get_Color() {
  $http.download({
    url:
      "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Patterns/Color.json",
    handler: function (resp) {
      $cache.set("color", JSON.parse(resp.data.string));
    }
  });
}

function get_text() {
  $http.download({
    url: "http://open.iciba.com/dsapi/",
    handler: function (resp) {
      let timestamp = Date.parse(new Date());
      if (resp.data.string[0] != "<") {
        $cache.set("content", JSON.parse(resp.data.string).content);
        $cache.set("timestamp_2", timestamp);
      }
    }
  });
}

function SetText(words) {
  $("Main").data = const_.X2X(words).map(function (item, idx) {
    //需要对输出进行判断，某些字符输出会显示为emoji表情
    return {
      label: {
        text: item,
        font: $font("UIFont", 17),
        textColor: $color("tint")
      }
    };

  });
}

module.exports = {
  Page: Convert_Page,
  get_Pattern: get_Pattern,
  get_Color: get_Color,
  get_text: get_text,
  SetText: SetText
};
