//下载最新节假日列表
function getlist() {
  $http.get({
    url: "https://raw.githubusercontent.com/ZiGmaX809/JsBoxLib/master/Days_Pro/holidays.json",
    handler: function(resp) {
      var t = resp.data
      $file.write({
        data: $data({ string: JSON.stringify(t) }),
        path: "holidays.json"
      })
    }
  })
}

module.exports = {
    getlist : getlist,
}