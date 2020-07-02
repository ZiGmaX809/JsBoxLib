var file = $file.read("Setting.conf")
var SETTING_ = (typeof file == "undefined") ? notice() : JSON.parse(file.string)

var id = Math.round(new Date() / 1000)
var inputdata = $context.text
var inputlink = $context.link
var clipdata = $clipboard.text
var cliplink = $clipboard.link

if (inputdata) {
  tlink = inputdata
} else if (inputlink) {
  tlink = inputlink
} else if (clipdata) {
  tlink = clipdata
} else if (cliplink) {
  tlink = cliplink
}

$ui.loading(true)
$http.post({
  url: SETTING_[0],
  header: {"User-Agent": "curl/1.0"},
  body: {
    "jsonrpc": "2.0",
    "method": "aria2.addUri",
    "id": id,
    "params": [
      "token:" + SETTING_[1],
      [
        tlink
      ],
    ]
  },
  handler: function(resp) {
    $ui.loading(false)
    if (resp.data.result != null) {
      $ui.alert({
        title: "添加任务成功！",
        actions: [{
          title: "确认",
          handler: function() {
            $context.close()
          }
        }]
      })
    } else {
      $ui.alert({
        title: "添加任务失败，请确认下载链接！",
        actions: [{
          title: "确认",
          handler: function() {
            $context.close()
          }
        }]
      })
    }
  }
})

function notice() {
  $ui.alert("未设置RPC地址或Token")
}