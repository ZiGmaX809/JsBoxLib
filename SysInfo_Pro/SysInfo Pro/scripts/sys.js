var wid = $device.info.screen.width
var sysview = {
  type: "view",
  props: {
    info: 1
  },
  layout: $layout.fill,
  views: [{
      type: "label",
      props: {
        text: $device.info.name + " | iOS " + $device.info.version,
        font: $font(13),
        align: $align.right
      },
      layout: function(make, view) {
        make.centerY.equalTo(view.super).offset(-30)
        make.right.equalTo(view.super).offset(-20)
      }
    },
    {
      type: "label",
      props: {
        text: "磁盘剩余",
        font: $font(10),
        align: $align.left
      },
      layout: function(make, view) {
        make.left.equalTo(view.super)
        make.centerY.equalTo(view.super).offset(-5)
      }
    },{
      type: "progress",
      props: {
        id: "Ldisk",
        value: 0,
        trackColor: $color("#AFAFAF"),
        progressColor: $color("#2EDBA2"),
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev).offset(15)
        make.left.equalTo(view.prev)
        make.right.equalTo(view.super).inset(20)
        make.height.equalTo(2)
      }
    }, {
      type: "label",
      props: {
        id: "disk",
        text: $device.space.disk.free.string,
        font: $font(10),
        align: $align.left
      },
      layout: function (make, view) {
        make.top.equalTo(view.prev).offset(-15)
        make.right.equalTo(view.super).offset(-20)
      }
    }, {
      type: "label",
      props: {
        text: "内存占用",
        font: $font(10),
        align: $align.left
      },
      layout: function(make, view) {
        make.left.equalTo(view.super)
        make.centerY.equalTo(view.super).offset(25)
      }
    },{
      type: "progress",
      props: {
        id: "Lmem",
        value: 0,
        trackColor: $color("#AFAFAF"),
        progressColor: $color("#1E90FF")
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev).offset(15)
        make.left.equalTo(view.prev)
        make.right.equalTo(view.super).inset(20)
        make.height.equalTo(2)
      }
    },{
      type: "label",
      props: {
        id: "mem",
        font: $font(10),
        align: $align.left
      },
      layout: function (make, view) {
        make.top.equalTo(view.prev).offset(-15)
        make.right.equalTo(view.super).offset(-20)
      }
    }
  ]
}

function getspace() {
  var _p = 1 - ($device.space.memory.free.bytes / $device.space.memory.total.bytes)
  var _b = 1 - ($device.space.disk.free.bytes / $device.space.disk.total.bytes)
  $("mem").text = Math.round(_p*10000)/100 + "%"
  $("Lmem").value = _p
  $("Ldisk").value = _b
}

module.exports = {
  page_: sysview,
  getspace: getspace
}