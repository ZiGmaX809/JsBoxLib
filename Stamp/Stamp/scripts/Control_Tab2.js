var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");

var Tab = {
    type: "view",
    props: {
        id: "tab2",
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
            id: "line_spacing_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "行距"
        },
        layout: function (make, view) {
            make.top.equalTo(view.super).offset(10)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "label",
        props: {
            id: "line_spacing_size",
            font: $font(16),
            bgcolor: $color("clear"),
            text: Golbal_Quan.SETTING[3] + "px"
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev.top)
            make.left.equalTo(view.prev.right).offset(10)
        }
    }, {
        type: "slider",
        props: {
            id: "line_spacing_slider",
            value: Golbal_Quan.SETTING[3],
            max: 120,
            min: 0
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.prev.right).offset(60)
            make.right.equalTo(view.super.right).offset(-30)
        },
        events: {
            changed: function (sender) {
                $("line_spacing_size").text = parseInt(sender.value) + "px"
                Functions.Save_Settings(3, parseInt(sender.value))
                for (i = 1; i < Golbal_Quan.SETTING[5]; i++) {
                    $(i + "_-1").updateLayout(function (make, view) {
                        make.top.equalTo($((i - 1) + "_-1").bottom).offset(parseInt(sender.value))
                    });
                }
            }
        }
    }, {
        type: "label",
        props: {
            id: "string_spacing_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "间距"
        },
        layout: function (make, view) {
            make.top.equalTo($("line_spacing_label").bottom).offset(20)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "label",
        props: {
            id: "string_spacing_size",
            font: $font(16),
            bgcolor: $color("clear"),
            text: Golbal_Quan.SETTING[3] + "px"
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev.top)
            make.left.equalTo(view.prev.right).offset(10)
        }
    }, {
        type: "slider",
        props: {
            id: "string_spacing_slider",
            value: Golbal_Quan.SETTING[3],
            max: 120,
            min: 0
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.prev.right).offset(60)
            make.right.equalTo(view.super.right).offset(-30)
        },
        events: {
            changed: function (sender) {
                $("string_spacing_size").text = parseInt(sender.value) + "px"
                Functions.Save_Settings(4, parseInt(sender.value))
                for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                    for (j = 1; j < Golbal_Quan.SETTING[6]; j++) {
                        $(i + "_" + j).updateLayout(function (make, view) {
                            make.left.equalTo($(i + "_" + (j - 1)).right).offset(parseInt(sender.value))
                        });
                    }
                }
            }
        }
    }, {
        type: "label",
        props: {
            id: "rows_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "行数"
        },
        layout: function (make, view) {
            make.top.equalTo($("string_spacing_label").bottom).offset(20)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "view",
        props: {
            id: "rows_stepper",
            bgcolor: $color("white"),
            radius: 5
        },
        layout: function (make, view) {
            let layout_width = Golbal_Quan.wid / 2 - 80 - $("rows_label").size.width
            $cache.set("rows_stepper_width", layout_width);
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
            make.right.equalTo(view.super.centerX).offset(-10)
            make.height.equalTo(25)
        },
        views: [{
            type: "button",
            props: {
                title: "-",
                radius: 0,
                titleColor: $color("black"),
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.size.equalTo($size(Number($cache.get("rows_stepper_width")) / 3, 25))
                make.left.equalTo(view.super)
                make.top.equalTo(view.super)
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(0)
                    let num = parseInt($("rows_num").text)
                    if (num > 0) {
                        $("rows_num").text = num - 1
                        Functions.Change_Row(1, num - 1)
                        Functions.Save_Settings(5, num - 1)
                    }
                }
            }
        }, {
            type: "label",
            props: {
                id: "rows_num",
                font: $font(16),
                bgcolor: $color("white"),
                borderWidth: 1,
                borderColor: $color("#F8F8F8"),
                text: Golbal_Quan.SETTING[5],
                align: $align.center
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
                make.size.equalTo($size(Number($cache.get("rows_stepper_width")) / 3, 30))
            }
        }, {
            type: "button",
            props: {
                title: "+",
                radius: 0,
                titleColor: $color("black"),
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.size.equalTo($size(Number($cache.get("rows_stepper_width")) / 3, 25))
                make.right.equalTo(view.super.right)
                make.top.equalTo(view.super)
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(0)
                    let num = parseInt($("rows_num").text)
                    if (num < 30) {
                        $("rows_num").text = num + 1
                        Functions.Change_Row(0, num)
                        Functions.Save_Settings(5, num + 1)
                    }
                }
            }
        }]
    }, {
        type: "label",
        props: {
            id: "columns_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "列数"
        },
        layout: function (make, view) {
            make.top.equalTo($("rows_label").top)
            make.left.equalTo(view.super.centerX)
        }
    }, {
        type: "view",
        props: {
            id: "columns_stepper",
            bgcolor: $color("white"),
            radius: 5
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
            make.size.equalTo($size(Number($cache.get("rows_stepper_width")), 25))
        },
        views: [{
            type: "button",
            props: {
                title: "-",
                radius: 0,
                titleColor: $color("black"),
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.size.equalTo($size(Number($cache.get("rows_stepper_width")) / 3, 25))
                make.left.equalTo(view.super)
                make.top.equalTo(view.super)
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(0)
                    let num = parseInt($("columns_num").text)
                    if (num > 0) {
                        $("columns_num").text = num - 1
                        Functions.Change_Column(1, num - 1)
                        Functions.Save_Settings(6, num - 1)
                    }
                }
            }
        }, {
            type: "label",
            props: {
                id: "columns_num",
                font: $font(16),
                bgcolor: $color("white"),
                borderWidth: 1,
                borderColor: $color("#F8F8F8"),
                text: Golbal_Quan.SETTING[6],
                align: $align.center
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
                make.size.equalTo($size(Number($cache.get("rows_stepper_width")) / 3, 30))
            }
        }, {
            type: "button",
            props: {
                title: "+",
                radius: 0,
                titleColor: $color("black"),
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.size.equalTo($size(Number($cache.get("rows_stepper_width")) / 3, 25))
                make.right.equalTo(view.super.right)
                make.top.equalTo(view.super)
            },
            events: {
                tapped: function (sender) {
                    $device.taptic(0)
                    let num = parseInt($("columns_num").text)
                    if (num < 30) {
                        $("columns_num").text = num + 1
                        Functions.Change_Column(0, num)
                        Functions.Save_Settings(6, num + 1)
                    }
                }
            }
        }]
    }]
}

module.exports = {
    Tab: Tab
};
