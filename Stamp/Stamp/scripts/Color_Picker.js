var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");
var wid = Golbal_Quan.color_picker_wid
var HEX

var Color_Picker = {
    props: {
        id: "main",
        bgcolor: $color("white")
    },
    layout: $layout.fill,
    views: [{
        type: "image",
        props: {
            id: "color_image",
            bgcolor: $color("black"),
            circular: true,
            src: "assets/bg.png",
            borderWidth: 1,
            borderColor: $color("white")
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super.centerX)
            make.top.offset(30)
            make.size.equalTo($size(wid + 2, wid + 2))
        }
    }, {
        type: "view",
        props: {
            id: "color_cover",
            circular: true,
            bgcolor: $color("black"),
            alpha: 0
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev)
            make.centerX.equalTo(view.prev)
            make.size.equalTo($size(wid, wid))
        }
    }, {
        type: "view",
        props: {
            id: "touch_layer",
            circular: true,
            bgcolor: $color("clear")
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev)
            make.centerX.equalTo(view.prev)
            make.size.equalTo($size(wid, wid))
        },
        events: {
            touchesMoved: function (sender, location) {
                let l = location;
                Touch_Moved(l.x, l.y);
            },
            touchesEnded: function (sender, location, locations) {
                Set_Text_Color(HEX);
            }
        },
        views: [{
            type: "view",
            props: {
                id: "target",
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.size.equalTo($size(30, 30));
                make.center.equalTo(view.super);
            },
            views: [
                {
                    type: "canvas",
                    layout: $layout.fill,
                    events: {
                        draw: function (view, ctx) {
                            ctx.strokeColor = $color("black");
                            ctx.setLineWidth(2)
                            ctx.addArc(15, 15, 3, 3.14, 4 * 3.14)
                            ctx.strokePath()
                        }
                    }
                }
            ]
        }]
    }, {
        type: "label",
        props: {
            id: "lightness_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "明度"
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev.bottom).offset(20)
            make.left.equalTo(view.prev.left)
        }
    }, {
        type: "label",
        props: {
            id: "lightness_value",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "100%"
        },
        layout: function (make, view) {
            make.top.equalTo(view.prev)
            make.left.equalTo(view.prev.right).offset(10)
        }
    }, {
        type: "gradient",
        props: {
            id: "lightness_slider_cover",
            radius: 2,
            borderWidth: 0.2,
            borderColor: $color("#C3C3C3"),
            colors: [$color("black"), $color("white")],
            locations: [0.0, 1.0],
            startPoint: $point(0, 1),
            endPoint: $point(1, 1),
            alpha: 1
        },
        layout: function (make, view) {
            make.right.equalTo($("color_image").right)
            make.centerY.equalTo(view.prev.centerY)
            make.size.equalTo($size(wid - 100, 4))
        }
    }, {
        type: "slider",
        props: {
            id: "lightness_slider",
            value: 100,
            max: 100,
            min: 0,
            minColor: $color("clear"),
            maxColor: $color("clear")
        },
        layout: function (make, view) {
            make.right.equalTo(view.prev.right)
            make.centerY.equalTo(view.prev.centerY)
            make.width.equalTo(wid - 100)
        },
        events: {
            changed: function (sender) {
                $("lightness_value").text = parseInt(sender.value) + "%"
                $("color_cover").alpha = 1 - (sender.value / 100)
                Sclider_Changed(sender.value)
            }
        }
    }, {
        type: "label",
        props: {
            id: "commonly_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "常用"
        },
        layout: function (make, view) {
            make.top.equalTo($("lightness_label").bottom).offset(35)
            make.left.equalTo($("lightness_label").left)
        }
    }, {
        type: "view",
        props: {
            bgcolor: $color("#FFFFFF")
        },
        layout: function (make, view) {
            make.left.equalTo(view.prev.right).offset(10)
            make.centerY.equalTo(view.prev.centerY)
            make.size.equalTo($size((wid - 45) / 4 - 7.5, 25))
            Functions.Shadow(view)
        },
        events: {
            tapped: function (sender) {
                Select_Commondly_Color("FFFFFF")
            }
        }
    }, {
        type: "view",
        props: {
            bgcolor: $color("#32CD32")
        },
        layout: function (make, view) {
            make.left.equalTo(view.prev.right).offset(10)
            make.centerY.equalTo(view.prev.centerY)
            make.size.equalTo($size((wid - 45) / 4 - 7.5, 25))
            Functions.Shadow(view)
        },
        events: {
            tapped: function (sender) {
                Select_Commondly_Color("32CD32")
            }
        }
    }, {
        type: "view",
        props: {
            bgcolor: $color("#FFA500")
        },
        layout: function (make, view) {
            make.left.equalTo(view.prev.right).offset(10)
            make.centerY.equalTo(view.prev.centerY)
            make.size.equalTo($size((wid - 45) / 4 - 7.5, 25))
            Functions.Shadow(view)
        },
        events: {
            tapped: function (sender) {
                Select_Commondly_Color("FFA500")
            }
        }
    }, {
        type: "view",
        props: {
            bgcolor: $color("#DC143C")
        },
        layout: function (make, view) {
            make.left.equalTo(view.prev.right).offset(10)
            make.centerY.equalTo(view.prev.centerY)
            make.size.equalTo($size((wid - 45) / 4 - 7.5, 25))
            Functions.Shadow(view)
        },
        events: {
            tapped: function (sender) {
                Select_Commondly_Color("DC143C")
            }
        }
    }]
}

function Select_Commondly_Color(hex) {
    HEX = hex
    Set_Coordinate(hex)
    Set_Preview_Color(hex)
    Set_Text_Color(hex)
}

function Touch_Moved(l_x, l_y) {
    //转换为坐标系
    let r = wid / 2
    let x = l_x - r
    let y = r - l_y

    //计算取样点角度
    let angle = Math.atan2(y, x) * (180 / Math.PI)
    let p_a = angle < 0 ? angle += 360 : angle

    //限制半径内活动
    if (Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2) >= Math.pow(r, 2)) {
        x = r * Math.cos(angle * 3.14 / 180)
        y = r * Math.sin(angle * 3.14 / 180)
    }

    //计算取样点半径并转换为S值
    let p_s = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2)) / r * 100

    //刷新取样点位置
    $("target").updateLayout(function (make, view) {
        make.centerX.equalTo(x);
        make.centerY.equalTo(-y);
    });

    //输出颜色
    HEX = HSV2HEX(p_a, p_s, $("lightness_slider").value)
    Set_Preview_Color(HEX)
}

function Set_Preview_Color(hex) {
    switch (Golbal_Quan.Control_Name) {
        case "Font_Color":
            $("font_color_view").bgcolor = $color("#" + hex)
            $("font_hex_label").text = "#" + hex
            break;
        case "Shadow_Color":
            $("shadow_color_view").bgcolor = $color("#" + hex)
            $("shadow_hex_label").text = "#" + hex
            break;
    }
}

function Set_Text_Color(hex) {
    switch (Golbal_Quan.Control_Name) {
        case "Font_Color":
            for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                    $(i + "_" + j).textColor = $color("#" + hex)
                }
            }
            $("funny_custom_text").textColor = $color("#" + hex)
            Functions.Save_Settings(9, "#" + hex)
            break;
        case "Shadow_Color":
            for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                    $(i + "_" + j).shadowColor = $color("#" + hex)
                }
            }
            $("funny_custom_text").shadowColor = $color("#" + hex)
            Functions.Save_Settings(11, "#" + hex)
            break;
    }
}

function Sclider_Changed(data) {
    let hsv_ = HEX2HSV(HEX)
    let HEX_2 = HSV2HEX(hsv_[0], hsv_[1], data)
    Set_Text_Color(HEX_2)
    switch (Golbal_Quan.Control_Name) {
        case "Font_Color":
            $("font_color_view").bgcolor = $color("#" + HEX_2)
            $("font_hex_label").text = "#" + HEX_2
            Functions.Save_Settings(9, "#" + HEX_2)
            break;
        case "Shadow_Color":
            $("shadow_color_view").bgcolor = $color("#" + HEX_2)
            $("shadow_hex_label").text = "#" + HEX_2
            Functions.Save_Settings(11, "#" + HEX_2)
            break;
    }
}

function Set_Coordinate(data) {
    HEX = data
    let hsv_ = HEX2HSV(data)
    x = (hsv_[1] / 100) * (wid / 2) * Math.cos(hsv_[0] * 3.14 / 180)
    y = (hsv_[1] / 100) * (wid / 2) * Math.sin(hsv_[0] * 3.14 / 180)

    $("target").updateLayout(function (make, view) {
        make.centerX.equalTo(x);
        make.centerY.equalTo(-y);
    });
    $("lightness_slider").value = hsv_[2]
    $("color_cover").alpha = 1 - hsv_[2] / 100
    $("lightness_value").text = hsv_[2] + "%"
}

function HEX2HSV(data) {
    var reg = /\w{2}/g
    let HEX_ = (data).match(reg)
    R = Math.ceil("0x" + HEX_[0], 16)
    G = Math.ceil("0x" + HEX_[1], 16)
    B = Math.ceil("0x" + HEX_[2], 16)

    let max_ = Math.max(R, G, B)
    let min_ = Math.min(R, G, B)

    V = max_ / 255 * 100
    S = max_ === 0 ? 0 : (max_ - min_) / max_ * 100

    if (max_ == min_) {
        H = 0
    } else if (max_ === R && G >= B) {
        H = 60 * (G - B) / (max_ - min_)
    } else if (max_ === R && G < B) {
        H = 60 * (G - B) / (max_ - min_) + 360
    } else if (max_ === G) {
        H = 60 * (B - R) / (max_ - min_) + 120
    } else if (max_ === B) {
        H = 60 * (R - G) / (max_ - min_) + 240
    }

    H = Math.ceil(H)
    S = Math.ceil(S)
    V = Math.ceil(V)
    return [H, S, V]
}

function HSV2HEX(h, s, v) {
    var h = h > 359 ? 0 : h
    var s = s / 100
    var v = v / 100

    h1 = Math.floor(h / 60) % 6
    f = h / 60 - h1
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)

    switch (h1) {
        case 0:
            r = v
            g = t
            b = p
            break;
        case 1:
            r = q
            g = v
            b = p
            break;
        case 2:
            r = p
            g = v
            b = t
            break;
        case 3:
            r = p
            g = q
            b = v
            break;
        case 4:
            r = t
            g = p
            b = v
            break;
        case 5:
            r = v
            g = p
            b = q
            break;
    }

    r = r * 255
    g = g * 255
    b = b * 255

    let HEX_ = RGB2HEX(r, g, b)
    return HEX_
}

function RGB2HEX(r, g, b) {
    r_ = Math.ceil(r).toString(16)
    g_ = Math.ceil(g).toString(16)
    b_ = Math.ceil(b).toString(16)
    h = r_.length < 2 ? "0" + r_ : r_
    e = g_.length < 2 ? "0" + g_ : g_
    x = b_.length < 2 ? "0" + b_ : b_

    let HEX_ = (h.toUpperCase() + e.toUpperCase() + x.toUpperCase())
    return HEX_
}

module.exports = {
    Color_Picker: Color_Picker,
    Set_Coordinate: Set_Coordinate,
    HEX: HEX
};