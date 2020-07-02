var wid=$device.info.screen.width
var netview = {
  type: "view",
  props: {
    info: 0
  },
  layout: $layout.fill,
  views: [{
      type: "label",
      props: {
        text: "当前网络:",
        font: $font(13),
        align: $align.left
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(-30)
        make.left.equalTo(view.super)
      }
    }, {
      type: "label",
      props: {
        text: "内网IP:",
        font: $font(13),
        align: $align.left
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev).offset(30)
        make.left.equalTo(view.prev)
      }
    },
    {
      type: "label",
      props: {
        text: "外网IP:",
        font: $font(13),
        align: $align.left
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev).offset(30)
        make.left.equalTo(view.prev)
      }
    }, {
      type: "label",
      props: {
        id: "n",
        font: $font(13),
        align: $align.right
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(-30)
        make.right.equalTo(view.super).offset(-20)
        make.width.equalTo(wid*0.4)
      }
    }, {
      type: "label",
      props: {
        id: "Lip",
        font: $font(13),
        align: $align.right
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev).offset(30)
        make.right.equalTo(view.prev)
      }
    }, {
      type: "label",
      props: {
        id: "Wip",
        font: $font(13),
        align: $align.right
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(30)
        make.right.equalTo(view.super).offset(-20)
      }
    }
  ]
}

function getip() {
  $http.get({
    url: "http://ip.cn",
    header: { "User-Agent": "curl/1.0" },
    handler: function(resp) {
      var regex = /\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/
      var ip = regex.exec(resp.data)[1]
      $("Wip").text = ip
    }
  })
}

module.exports = {
  page_: netview,
  getip: getip
}