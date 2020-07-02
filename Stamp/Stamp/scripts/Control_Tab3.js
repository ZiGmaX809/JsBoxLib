var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");
var Color_Picker = require("scripts/Color_Picker.js");

var Tab = {
    type: "view",
    props: {
        id: "tab3",
        hidden: true
    },
    layout: function (make, view) {
        make.top.equalTo($("control_tab").bottom).offset(10)
        make.centerX.equalTo(view.super)
        make.size.equalTo($size(Golbal_Quan.wid, Golbal_Quan.hig * (1 - Golbal_Quan.preview_scale)))
        Functions.Shadow(view)
    },
    views: [{
        type: "label",
        props: {
            id: "alpha_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "透明度"
        },
        layout: function (make, view) {
            make.top.equalTo(view.super).offset(10)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "label",
        props: {
            id: "alpha_value",
            font: $font(16),
            bgcolor: $color("clear"),
            text: Golbal_Quan.SETTING[7] + "%"
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev.top)
            make.left.equalTo(view.prev.right).offset(10)
        }
    }, {
        type: "slider",
        props: {
            id: "alpha_slider",
            value: Golbal_Quan.SETTING[7],
            max: 100,
            min: 0
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.prev.right).offset(60)
            make.right.equalTo(view.super.right).offset(-30)
        },
        events: {
            changed: function (sender) {
                $("alpha_value").text = parseInt(sender.value) + "%"
                $("funny_custom_text").alpha = parseInt(sender.value) / 100
                Functions.Save_Settings(7, parseInt(sender.value))
                for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                    for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                        $(i + "_" + j).alpha = parseInt(sender.value) / 100
                    }
                }
            }
        }
    }, {
        type: "label",
        props: {
            id: "angle_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "角度"
        },
        layout: function (make, view) {
            make.top.equalTo($("alpha_label").bottom).offset(20)
            make.left.equalTo($("alpha_label").left)
        }
    }, {
        type: "label",
        props: {
            id: "angle_value",
            font: $font(16),
            bgcolor: $color("clear"),
            text: Golbal_Quan.SETTING[8] + "°"
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev.top)
            make.left.equalTo($("alpha_value").left)
        },
        events:{
            doubleTapped: function(sender) {
                $("angle_slider").value = 0
                $("angle_value").text = "0°"
                Functions.Save_Settings(8, 0)
                $("label_view_bg").rotate(0)
            }
        }
    }, {
        type: "slider",
        props: {
            id: "angle_slider",
            value: Golbal_Quan.SETTING[8],
            max: 180,
            min: -180
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo($("alpha_slider"))
            make.right.equalTo(view.super.right).offset(-30)
        },
        events: {
            changed: function (sender) {
                $("angle_value").text = parseInt(sender.value) + "°"
                Functions.Save_Settings(8, parseInt(sender.value))
                $("label_view_bg").rotate(Math.PI * (parseInt(sender.value) / 180))
            }
        }
    }, {
        type: "label",
        props: {
            id: "shadow_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "阴影"
        },
        layout: function (make, view) {
            make.top.equalTo($("angle_label").bottom).offset(20)
            make.left.equalTo($("angle_label").left)
        }
    }, {
        type: "view",
        props: {
            bgcolor: $color("clear"),
            clipsToBounds: true
        },
        layout: function (make, view) {
            make.size.equalTo($size(40, 30));
            make.centerY.equalTo(view.prev.centerY);
            make.left.equalTo($("alpha_value").left).offset(-5);
        },
        views: [{
            type: "lottie",
            props: {
                id: "shadow_switch_lottie",
                src: "assets/Switch.json",
                progress: Golbal_Quan.SETTING[10] % 2 == 0 ? 0.2 : 0
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
                make.size.equalTo($size(120, 90))
            },
            events: {
                tapped: function (make, view) {
                    var switch_mode = Golbal_Quan.SETTING[10] % 2
                    $("shadow_switch_lottie").play({
                        fromFrame: switch_mode == 0 ? 50 : 0,
                        toFrame: switch_mode == 0 ? 60 : 10,
                        handler: function (finished) {
                            for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                                for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                                    $(i + "_" + j).shadowColor = $color(switch_mode == 2 ? "clear" : Golbal_Quan.SETTING[11])
                                }
                            }
                            $("funny_custom_text").shadowColor = $color(switch_mode == 2 ? "clear" : Golbal_Quan.SETTING[11])
                            $ui.animate({
                                duration: 0.4,
                                animation: function () {
                                    $("shadow_hex_label").alpha = switch_mode == 2 ? 0 : 1
                                    $("shadow_color_view").alpha = switch_mode == 2 ? 0 : 1
                                }
                            })
                        }
                    });
                    switch_mode++
                    Functions.Save_Settings(10, switch_mode)
                }
            }
        }]
    }, {
        type: "label",
        props: {
            id: "shadow_hex_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: Golbal_Quan.SETTING[11],
            alpha: Golbal_Quan.SETTING[10] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
        },
        events: {
            tapped: function (sender) {
                $input.text({
                    type: $kbType.default,
                    text: $("shadow_hex_label").text.replace("#", ""),
                    placeholder: "输入HEX颜色值",
                    handler: function (text) {
                        $("shadow_hex_label").text = "#" + text
                        $("shadow_color_view").bgcolor = $color("#" + text)
                        Functions.Save_Settings(9, "#" + text)
                        for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                            for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                                $(i + "_" + j).shadowColor = $color("#" + text)
                            }
                        }
                    }
                })
            }
        }
    }, {
        type: "view",
        props: {
            id: "shadow_color_view",
            bgcolor: $color(Golbal_Quan.SETTING[11]),
            radius: 5,
            alpha: Golbal_Quan.SETTING[10] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.prev.right).offset(90)
            make.right.equalTo(view.super.right).offset(-30)
            make.height.equalTo(25)
        },
        events: {
            tapped: function (sender) {
                const popover = $ui.popover({
                    sourceView: sender,
                    sourceRect: sender.bounds,
                    directions: $popoverDirection.any,
                    size: $size(Golbal_Quan.wid, Golbal_Quan.wid * 1.15),
                    views: [Color_Picker.Color_Picker]
                })
                Golbal_Quan.Control_Name = "Shadow_Color"
                Color_Picker.Set_Coordinate($("shadow_color_view").bgcolor.hexCode)
            }
        }
    }]
}

module.exports = {
    Tab: Tab
};