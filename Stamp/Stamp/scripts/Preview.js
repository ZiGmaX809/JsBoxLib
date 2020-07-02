var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");

var Layer = {
    type: "view",
    props: {
        id: "preview_bg",
    },
    layout: function (make, view) {
        make.size.equalTo($size(Golbal_Quan.wid, Golbal_Quan.hig * Golbal_Quan.preview_scale - 40))
        make.top.offset(40);
    },
    views: [
        {
            type: "image",
            props: {
                id: "preview_image"
            },
            layout: function (make, view) {
                make.center.equalTo(view.super);
            },
            views: [{
                type: "view",
                props: {
                    id: "snap_view"
                },
                layout: $layout.fill,
                views: [{
                    type: "view",
                    props: {
                        id: "label_view_bg",
                    },
                    layout: $layout.fill,
                    views: [{
                        type: "view",
                        props: {
                            id: "label_bg",
                            hidden: Golbal_Quan.SETTING[12] == 2 ? false : true
                        },
                        views: [],
                        layout: $layout.fill
                    }, {
                        type: "view",
                        props: {
                            id: "funny_view_bg",
                            hidden: Golbal_Quan.SETTING[12] == 1 ? false : true
                        },
                        layout: function (make, view) {
                            make.centerX.equalTo(view.super).offset(Golbal_Quan.SETTING[15])
                            make.centerY.equalTo(view.super).offset(Golbal_Quan.SETTING[16])
                        },
                        views: [{
                            type: "label",
                            props: {
                                id: "funny_custom_text",
                                hidden: (Golbal_Quan.SETTING[12] == 1 && Golbal_Quan.SETTING[13] != "自定义文字") ? true : false,
                                text: Golbal_Quan.SETTING[0],
                                font: $font(Golbal_Quan.SETTING[2], 16),
                                textColor: $color(Golbal_Quan.SETTING[9]),
                                alpha: Golbal_Quan.SETTING[7] / 100,
                                shadowColor: $color(Golbal_Quan.SETTING[10] == 1 ? Golbal_Quan.SETTING[11] : "clear")
                            },
                            layout: function (make, view) {
                                make.center.equalTo(view.super)
                            }
                        }, {
                            type: "image",
                            props: {
                                id: "logo_image",
                                hidden: (Golbal_Quan.SETTING[12] == 1 && Golbal_Quan.SETTING[13] != "自定义文字") ? false : true,
                                src: Golbal_Quan.SETTING[17]
                            },
                            layout: function (make, view) {
                                make.center.equalTo(view.super)
                            }
                        }]
                    }]
                }]
            }]
        }],
    events: {
        tapped: function (sender) {
            Functions.Pick_Photo();
        }
    }
}

module.exports = {
    Layer: Layer
};