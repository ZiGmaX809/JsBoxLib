var wid = $device.info.screen.width
var hig = $device.info.screen.height
var preview_scale = 0.74
var color_picker_wid = wid * 0.7
var file = $file.read("assets/Setting.conf")
var DEFAULT = ["🍑🆉🄸🅶🄼🄰", 16, "default", 7, 58, 8, 7, 50, -30, "#FFFFFF",1,"#000000",1,"自定义文字",50,0,0,""]
var SETTING = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT)) : JSON.parse(file.string)
var Control_Name

module.exports = {
    wid: wid,
    hig: hig,
    color_picker_wid: color_picker_wid,
    preview_scale: preview_scale,
    SETTING: SETTING,
    Control_Name:Control_Name
};
