var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");
var Color_Picker = require("scripts/Color_Picker.js")

var Tab = {
    type: "view",
    props: {
        id: "tab1",
        bgcolor: $color("clear"),
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
            id: "font_style",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "字体"
        },
        layout: function (make, view) {
            make.top.equalTo(view.super).offset(10)
            make.left.equalTo(view.super).offset(30)
        }
    },
    {
        type: "view",
        props: {
            id: "font_style_view",
            bgcolor: $color("#FEFEFE"),
            radius: 5
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
                id: "font_style_label",
                text: Golbal_Quan.SETTING[2],
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
                const font_name = await $ui.popover({
                    sourceView: sender,
                    sourceRect: sender.bounds,
                    directions: $popoverDirection.any,
                    size: $size(320, 200),
                    views: [
                        {
                            type: "list",
                            props: {
                                id: "font_style_list",
                                template: [{
                                    type: "label",
                                    props: {
                                        id: "font_style_name",
                                        font: $font(13),
                                        textColor: $color("#AAAAAA"),
                                        align: $align.center
                                    },
                                    layout: function (make) {
                                        make.height.equalTo(15)
                                        make.left.right.inset(15)
                                        make.bottom.inset(5)
                                    }
                                }, {
                                    type: "label",
                                    props: {
                                        id: "font_style_example",
                                        align: $align.center
                                    },
                                    layout: function (make, view) {
                                        var pre = view.prev
                                        make.bottom.equalTo(pre.top)
                                        make.top.inset(5)
                                        make.left.right.inset(15)
                                    }
                                }],
                                rowHeight: 70,
                                data: Functions.all_fonts_data
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function (sender, indexPath, data) {
                                    let font_ = data.font_style_name.text
                                    $("font_style_label").text = font_
                                    $("funny_custom_text").font = $font(font_, Golbal_Quan.SETTING[1])
                                    Functions.Save_Settings(2, font_)
                                    for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                                        for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                                            $(i + "_" + j).font = $font(font_, Golbal_Quan.SETTING[1])
                                        }
                                    }
                                    font_name.dismiss()
                                }
                            }
                        }
                    ]
                });

                $("font_style_list").scrollTo({
                    indexPath: $indexPath(0, Functions.all_fonts.indexOf($("font_style_label").text)-1),
                    animated: true
                })
            }
        }
    }, {
        type: "label",
        props: {
            id: "font_size_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "字号"
        },
        layout: function (make, view) {
            make.top.equalTo($("font_style_label").bottom).offset(20)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "label",
        props: {
            id: "font_size_size",
            font: $font(16),
            bgcolor: $color("clear"),
            text: Golbal_Quan.SETTING[1] + "pt"
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev.top)
            make.left.equalTo(view.prev.right).offset(10)
        }
    }, {
        type: "slider",
        props: {
            id: "font_size_slider",
            value: Golbal_Quan.SETTING[1],
            max: 64,
            min: 10
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.prev.right).offset(60)
            make.right.equalTo(view.super.right).offset(-30)
        },
        events: {
            changed: function (sender) {
                let font_style = $("font_style_label").text
                let font_size = parseInt(sender.value)
                $("font_size_size").text = font_size + "pt"
                $("funny_custom_text").font = $font(font_style, font_size)
                Functions.Save_Settings(1, font_size)
                for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                    for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                        $(i + "_" + j).font = $font(font_style, font_size)
                    }
                }
            }
        }
    }, {
        type: "label",
        props: {
            id: "font_color_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "颜色"
        },
        layout: function (make, view) {
            make.top.equalTo($("font_size_label").bottom).offset(20)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "label",
        props: {
            id: "font_hex_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: Golbal_Quan.SETTING[9]
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
        },
        events: {
            tapped: function (sender) {
                $input.text({
                    type: $kbType.default,
                    text: $("font_hex_label").text.replace("#", ""),
                    placeholder: "输入HEX颜色值",
                    handler: function (text) {
                        $("font_hex_label").text = "#" + text
                        $("font_color_view").bgcolor = $color("#" + text)
                        $("funny_custom_text").textColor = $color("#" + text)
                        Functions.Save_Settings(9, "#" + text)
                        for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                            for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                                $(i + "_" + j).textColor = $color("#" + text)
                            }
                        }
                    }
                })
            }
        }
    },
    {
        type: "view",
        props: {
            id: "font_color_view",
            bgcolor: $color(Golbal_Quan.SETTING[9]),
            radius: 5
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
                Golbal_Quan.Control_Name = "Font_Color"
                Color_Picker.Set_Coordinate($("font_color_view").bgcolor.hexCode)
            }
        }
    }]
}

module.exports = {
    Tab: Tab
};