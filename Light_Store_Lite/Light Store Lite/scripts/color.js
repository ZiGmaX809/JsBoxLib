var colors = ["#9E2DA4", "#FE2E01", "#FE8209", "#164781", "#FF9999", "#FF9900", "#FF9D1D", "#0069D2", "#00A81B", "#A80001", "#00888C", "#89A800", "#5700A8", "#004C00", "#38004C", "#5E468C", "#35A8AE", "#E76466"]
var file = $file.read("Setting.conf")
var DEFAULT_ = ["0","0", "0", "#007AFF"]
var SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)

function color() {
  if (SETTING_[2] === "1") {
    if (SETTING_[3] === "1") {
      const m = colors.length
      const n = Math.floor(Math.random() * (m + 1))
      $cache.set("vcolor", colors[n])
    } else {
      $cache.set("vcolor", SETTING_[4])
    }
  }
}

module.exports = {
  colors: colors,
  color: color
}