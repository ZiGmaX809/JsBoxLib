var Functions = require("scripts/Functions.js");
var Tab0 = require("scripts/Control_Tab0.js")
var Tab1 = require("scripts/Control_Tab1.js")
var Tab2 = require("scripts/Control_Tab2.js")
var Tab3 = require("scripts/Control_Tab3.js")
var Tab4 = require("scripts/Control_Tab4.js")
var Tab5 = require("scripts/Control_Tab5.js")

var Layer = {
    type: "view",
    props: {
        id: "controls",
        bgcolor: $color("clear")
    },
    layout: function (make, view) {
        make.top.equalTo(view.prev.bottom)
        make.centerX.equalTo(view.super)
        make.left.bottom.right.offset(0)
    },
    views: [{
        type: "tab",
        props: {
            id: "control_tab",
            items: ["文本", "字体", "段落", "样式", "趣味", "导出"]
        },
        layout: function (make, view) {
            make.top.offset(20)
            make.centerX.equalTo(view.super)
        },
        events: {
            changed: function (sender) {
                Functions.Switch_Tab(sender.index)
            }
        }
    }, Tab0.Tab, Tab1.Tab, Tab2.Tab, Tab3.Tab, Tab4.Tab, Tab5.Tab]
}

module.exports = {
    Layer: Layer
};