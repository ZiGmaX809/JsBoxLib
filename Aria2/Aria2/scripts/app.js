var wid = $device.info.screen.width
var file = $file.read("Setting.conf")
var DEFAULT_ = ["", ""]
var SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)
var id = Math.round(new Date() / 1000)

const rpc = {
  type: "input",
  props: {
    id: "rpc",
    type: $kbType.url,
    text: SETTING_[0],
    bgcolor:$color("white"),
    placeholder: "http://xxx.com:6800/jsonrpc"
  },
  layout: function(make, view) {
    make.center.equalTo(view.super)
    make.size.equalTo($size(wid - 30, 32))
  },
  events: {
    returned: function(sender) {
      savesetting(0, sender.text)
      sender.blur()
      $("token").focus()
    }
  }
}

const token = {
  type: "input",
  props: {
    id: "token",
    text: SETTING_[1],
    bgcolor:$color("white"),
    type: $kbType.default,
  },
  layout: function(make, view) {
    make.center.equalTo(view.super)
    make.size.equalTo($size(wid - 30, 32))
  },
  events: {
    returned: function(sender) {
      savesetting(1, sender.text)
      sender.blur()
    }
  }
}

const test = {
   type: "view",
  props: {
    id: "test"
  },
  layout: function(make, view) {
    make.center.equalTo(view.super)
    make.size.equalTo($size(wid - 30, 32))
  },
  views: [{
      type: "label",
      props: {
        text :"激活"
      },
      layout:$layout.fill
    }],
  events: {
    tapped: function(sender) {
      savesetting(0,$("rpc").text)
      savesetting(1,$("token").text)
      setrpc()
    }
  }
}

$ui.render({
  props: {
    id: "main",
  },
  layout: $layout.fill,
  views: [{
    type: "list",
    props: {
      id: "list",
      data: [{
        title: "RPC地址",
        rows: [rpc]
      }, {
        title: "Token",
        rows: [token]
      },{
        title:"测试连接",
        rows:[test]
      }]
    },
    layout: $layout.fill
  }]
})

//保存设置
function savesetting(section, value) {
  SETTING_[section] = value
  $file.write({
    data: $data({ string: JSON.stringify(SETTING_) }),
    path: "Setting.conf"
  })
}

function setrpc() {
  $ui.loading(true)
  $http.post({
    url: $("rpc").text,
    header: {"User-Agent": "curl/1.0"},
    body: {
      "jsonrpc": "2.0",
      "method": "aria2.tellActive",
      "id": id,
      "params": [
        "token:"+$("token").text,
      ]
    },
    handler: function(resp) {
      $ui.loading(false)
    if (resp.data.result != null){
      alert("连接成功！")
    } else {
      alert("连接失败！")
    }
    }
  })
}