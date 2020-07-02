var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");

var Tab = {
    type: "view",
    props: {
        id: "tab0"
    },
    layout: function (make, view) {
        make.top.equalTo($("control_tab").bottom).offset(10)
        make.centerX.equalTo(view.super)
        make.size.equalTo($size(Golbal_Quan.wid, Golbal_Quan.hig * (1 - Golbal_Quan.preview_scale)))
        Functions.Shadow(view)
    },
    views: [{
        type: "view",
        props: {
            id: "tab0_text_view",
            bgcolor: $color("#FEFEFE"),
            radius: 5
        },
        layout: function (make, view) {
            make.top.offset(10)
            make.centerX.equalTo(view.super)
            make.size.equalTo($size(Golbal_Quan.wid - 60, 30))
        },
        views: [{
            type: "label",
            props: {
                id: "tab0_text_label",
                text: Golbal_Quan.SETTING[0],
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
                    type: $kbType.default,
                    text: $("tab0_text_label").text,
                    placeholder: "输入水印文字",
                    handler: function (text) {
                        $("tab0_text_label").text = text
                        $("funny_custom_text").text = text
                        Functions.Save_Settings(0, text)
                        for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                            for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                                $(i + "_" + j).text = text
                            }
                        }
                    }
                })
            }
        }
    }]
}

module.exports = {
    Tab: Tab
};