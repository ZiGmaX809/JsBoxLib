var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");

var Tab = {
    type: "view",
    props: {
        id: "tab5",
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
            id: "pix_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "分辨率"
        },
        layout: function (make, view) {
            make.top.equalTo(view.super).offset(10)
            make.left.equalTo(view.super).offset(30)
        }
    }, {
        type: "view",
        props: {
            id: "pix_wid_view",
            bgcolor: $color("#FEFEFE"),
            radius: 5
        },
        layout: function (make, view) {
            make.centerY.equalTo(view.prev.centerY)
            make.left.equalTo(view.prev.right).offset(10)
            make.right.equalTo(view.super.centerX)
            make.height.equalTo(25)
        },
        views: [{
            type: "label",
            props: {
                id: "pix_wid_label",
                font: $font("bold", 16),
                bgcolor: $color("clear"),
            },
            layout: function (make, view) {
                make.left.offset(5)
                make.centerY.equalTo(view.super)
            }
        }],
        events: {
            tapped: function (sender) {
                $input.text({
                    type: $kbType.number,
                    text: $("pix_wid_label").text,
                    placeholder: "输入输出图片宽度",
                    handler: function (text) {
                        if (parseInt(text) > 0) {
                            let h = Number($("pix_hig_label").text)
                            let w = Number(text)
                            $("pix_hig_label").text = w / Number($("pix_wid_label").text) * h
                            $("pix_wid_label").text = text
                        }
                    }
                })
            }
        }
    }, {
        type: "label",
        props: {
            id: "pix_label",
            font: $font("bold", 16),
            bgcolor: $color("clear"),
            text: "  X  "
        },
        layout: function (make, view) {
            make.top.equalTo(view.super).offset(10)
            make.left.equalTo(view.prev.right).offset(10)
        }
    }, {
        type: "view",
        props: {
            id: "pix_hig_view",
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
                id: "pix_hig_label",
                font: $font("bold", 16),
                bgcolor: $color("clear"),
            },
            layout: function (make, view) {
                make.left.offset(5)
                make.centerY.equalTo(view.super)
            }
        }],
        events: {
            tapped: function (sender) {
                $input.text({
                    type: $kbType.number,
                    text: $("pix_hig_label").text,
                    placeholder: "输入输出图片长度",
                    handler: function (text) {
                        if (parseInt(text) > 0) {
                            let h = Number(text)
                            let w = Number($("pix_wid_label").text)
                            $("pix_hig_label").text = text
                            $("pix_wid_label").text = h / Number($("pix_hig_label").text) * w
                        }
                    }
                })
            }
        }
    }, {
        type: "view",
        props: {
            bgcolor: $color("clear"),
            clipsToBounds: true
        },
        layout: function (make, view) {
            make.size.equalTo($size(120, 90));
            make.top.equalTo(view.prev.bottom).offset(10)
            make.centerX.equalTo(view.super)
            Functions.Shadow(view)
        },
        views: [{
            type: "lottie",
            props: {
                id: "share_lottie",
                src: "assets/Share.json",
                progress: 0
            },
            layout: function (make, view) {
                make.center.equalTo(view.super)
                make.size.equalTo($size(240, 180))
            },
            events: {
                tapped: function (make, view) {
                    var mode = ($("funny_switch_lottie").progress > 0.5 && $("funny_logo_label").text != "自定义文字") ? 0 : 1
                    $("share_lottie").play({
                        fromFrame: 60,
                        toFrame: 105,
                        handler: function (finished) {
                            $share.sheet(Functions.Share_Photo(mode))
                            $delay(0.5, function () {
                                $("share_lottie").progress = 0
                            });
                            if($("piece_canvas") != undefined) $("piece_canvas").remove()
                            $("label_actual").hidden = true
                        }
                    })
                }
            }
        }]
    }]
}

module.exports = {
    Tab: Tab
};