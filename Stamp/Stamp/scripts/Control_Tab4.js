var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");

var Tab = {
    type: "view",
    props: {
        id: "tab4",
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
            id: "funny_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "趣味"
        },
        layout: function (make, view) {
            make.top.equalTo(view.super).offset(10)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "view",
        props: {
            id: "funny_switch",
            bgcolor: $color("clear"),
            clipsToBounds: true
        },
        layout: function (make, view) {
            make.size.equalTo($size(40, 30));
            make.centerY.equalTo(view.prev.centerY);
            make.left.equalTo(view.prev.right).offset(6);
        },
        views: [{
            type: "lottie",
            props: {
                id: "funny_switch_lottie",
                src: "assets/Switch.json",
                progress: Golbal_Quan.SETTING[12] % 2 == 0 ? 0.1 : 0
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
                make.size.equalTo($size(120, 90))
            },
            events: {
                tapped: function (make, view) {
                    var switch_mode = Golbal_Quan.SETTING[12] % 2
                    Functions.Download_Logolist()
                    $("funny_switch_lottie").play({
                        fromFrame: switch_mode == 0 ? 50 : 0,
                        toFrame: switch_mode == 0 ? 60 : 10,
                        handler: function (finished) {
                            if (switch_mode == 1) {
                                $("label_bg").hidden = true
                                $("funny_view_bg").hidden = false
                                var bool = $("funny_logo_label").text == "自定义文字" ? true : false
                                $("funny_custom_text").hidden = !bool
                                $("logo_image").hidden = bool
                            } else {
                                $("funny_view_bg").hidden = true
                                $("label_bg").hidden = false
                            }
                            $ui.animate({
                                duration: 0.4,
                                animation: function () {
                                    $("funny_logo_view").alpha = switch_mode % 2
                                    $("funny_size_label").alpha = switch_mode % 2
                                    $("funny_size_slider").alpha = switch_mode % 2
                                    $("funny_x_label").alpha = switch_mode % 2
                                    $("funny_x_slider").alpha = switch_mode % 2
                                    $("funny_y_label").alpha = switch_mode % 2
                                    $("funny_y_slider").alpha = switch_mode % 2
                                }
                            })
                        }
                    });
                    switch_mode++
                    Functions.Save_Settings(12, switch_mode)
                }
            }
        }]
    }, {
        type: "view",
        props: {
            id: "funny_logo_view",
            bgcolor: $color("#FEFEFE"),
            radius: 5,
            alpha: Golbal_Quan.SETTING[12] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
            make.right.equalTo(view.super.right).offset(-30)
            make.height.equalTo(25)
        },
        views: [{
            type: "label",
            props: {
                id: "funny_logo_label",
                text: Golbal_Quan.SETTING[13],
                font: $font("bold", 16),
                bgcolor: $color("clear"),
            },
            layout: function (make, view) {
                make.left.offset(5)
                make.centerY.equalTo(view.super)
            }
        }],
        events: {
            tapped: async function (sender) {
                const funny_logo = await $ui.popover({
                    sourceView: sender,
                    sourceRect: sender.bounds,
                    directions: $popoverDirection.any,
                    size: $size(320, 200),
                    views: [
                        {
                            type: "list",
                            props: {
                                id: "funny_logo_list",
                                template: [{
                                    type: "label",
                                    props: {
                                        id: "logo_name",
                                        font: $font("bold", 18),
                                        align: $align.center
                                    },
                                    layout: function (make, view) {
                                        make.center.equalTo(view.super)
                                    }
                                }],
                                rowHeight: 40,
                                data: $cache.get("Logolist").data
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function (sender, indexPath, data) {
                                    if (indexPath.row == 0) {
                                        $("funny_custom_text").hidden = false
                                        $("logo_image").hidden = true
                                        Functions.Save_Settings(13, data.logo_name.text)
                                    } else {
                                        let image = $image(data.logo_name.src)
                                        $("funny_custom_text").hidden = true
                                        $("logo_image").hidden = false
                                        $("logo_image").image = image
                                        $cache.set("logo_image_src", image)
                                        $("logo_image").scale($("funny_size_slider").value / 100)
                                    }
                                    $("funny_logo_label").text = data.logo_name.text
                                    Functions.Save_Settings(13, data.logo_name.text)
                                    Functions.Save_Settings(17, data.logo_name.src)
                                    funny_logo.dismiss()
                                }
                            }
                        }
                    ]
                });
            }
        }
    }, {
        type: "label",
        props: {
            id: "funny_size_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "大小",
            alpha: Golbal_Quan.SETTING[12] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.top.equalTo($("funny_label").bottom).offset(20)
            make.left.equalTo($("funny_label").left)
        }
    }, {
        type: "slider",
        props: {
            id: "funny_size_slider",
            value: Golbal_Quan.SETTING[14],
            max: 100,
            min: 0,
            alpha: Golbal_Quan.SETTING[12] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
            make.right.equalTo(view.super.right).offset(-30)
        },
        events: {
            changed: function (sender) {
                $("logo_image").scale(sender.value / 100)
                Functions.Save_Settings(14, sender.value)
            }
        }
    }, {
        type: "label",
        props: {
            id: "funny_x_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "X轴",
            alpha: Golbal_Quan.SETTING[12] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.top.equalTo($("funny_size_label").bottom).offset(20)
            make.left.equalTo($("funny_size_label").left)
        },
        events: {
            doubleTapped: function (sender) {
                $("funny_x_slider").value = 0
                $("funny_view_bg").updateLayout(function (make, view) {
                    make.centerX.equalTo(view.super).offset(0)
                });
                Functions.Save_Settings(15, 0)
            }
        }
    }, {
        type: "slider",
        props: {
            id: "funny_x_slider",
            value: Golbal_Quan.SETTING[15],
            max: 50,
            min: -50,
            alpha: Golbal_Quan.SETTING[12] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
            make.right.equalTo(view.super.centerX).offset(-5)
        },
        events: {
            changed: function (sender) {
                let x = parseInt(sender.value / 100 * $("preview_image").size.width)
                $("funny_view_bg").updateLayout(function (make, view) {
                    make.centerX.equalTo(view.super).offset(x)
                });
                Functions.Save_Settings(15, x)
            }
        }
    }, {
        type: "label",
        props: {
            id: "funny_y_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "Y轴",
            alpha: Golbal_Quan.SETTING[12] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.top.equalTo($("funny_x_label").top)
            make.left.equalTo(view.super.centerX).offset(5)
        },
        events: {
            doubleTapped: function (sender) {
                $("funny_y_slider").value = 0
                $("funny_view_bg").updateLayout(function (make, view) {
                    make.centerY.equalTo(view.super).offset(0)
                });
                Functions.Save_Settings(16, 0)
            }
        }
    }, {
        type: "slider",
        props: {
            id: "funny_y_slider",
            value: Golbal_Quan.SETTING[16],
            max: 50,
            min: -50,
            alpha: Golbal_Quan.SETTING[12] % 2 == 0 ? 0 : 1
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
            make.right.equalTo(view.super.right).offset(-30)
        },
        events: {
            changed: function (sender) {
                let y = parseInt(sender.value / 100 * $("preview_image").size.height)
                $("funny_view_bg").updateLayout(function (make, view) {
                    make.centerY.equalTo(view.super).offset(y)
                });
                Functions.Save_Settings(16, y)
            }
        }
    }]
}

module.exports = {
    Tab: Tab
};