var Golbal_Quan = require("scripts/Quantitative.js");
var Functions = require("scripts/Functions.js");

var Layer = {
    type: "view",
    props: {
        id: "lottie_bg",
        bgcolor: $color("white")
    },
    layout: $layout.fill,
    views: [{
        type: "view",
        props: {
            id: "lottie_btoon_bg",
            bgcolor: $color("clear"),
            clipsToBounds: true
        },
        layout: function (make, view) {
            make.size.equalTo($size(100, 100))
            make.center.equalTo(view.super)
        },
        views: [{
            type: "lottie",
            props: {
                id: "start_lottie",
                bgcolor: $color("clear"),
                src: "assets/GetStart.json",
                loop: true
            },
            layout: function (make, view) {
                make.size.equalTo($size(Golbal_Quan.wid, Golbal_Quan.wid / 4 * 3));
                make.center.equalTo(view.super);
            }
        }],
        events: {
            tapped: function (sender) {
                var popover = $ui.popover({
                    sourceView: sender,
                    directions: $popoverDirection.up,
                    size: $size(200, 85),
                    views: [
                        {
                            type: "button",
                            props: {
                                icon: $icon("051", $color("white"), $size(25, 25)),
                                radius: 25,
                                bgcolor: $color("black")
                            },
                            layout: function (make, view) {
                                make.top.offset(30)
                                make.size.equalTo($size(50, 50))
                                make.centerX.equalTo(view.super).offset(-50)
                            },
                            events: {
                                tapped: function (sender) {
                                    $photo.take({
                                        handler: function (resp) {
                                            if (resp.status) {
                                                Functions.Load_Photo(resp.image);
                                                popover.dismiss();
                                            }
                                        }
                                    })
                                }
                            }
                        },
                        {
                            type: "button",
                            props: {
                                icon: $icon("014", $color("white"), $size(25, 25)),
                                radius: 25,
                                bgcolor: $color("black")
                            },
                            layout: function (make, view) {
                                make.top.offset(30)
                                make.size.equalTo($size(50, 50))
                                make.centerX.equalTo(view.super).offset(50)
                            },
                            events: {
                                tapped: function (sender) {
                                    $photo.pick({
                                        handler: function (resp) {
                                            if (resp.status) {
                                                Functions.Load_Photo(resp.image)
                                                popover.dismiss();
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    ]
                });
                Functions.Get_All_Fonts();
            }
        }
    }, {
        type: "label",
        props: {
            text: "© Designed By 🆉🄸🅶🄼🄰",
            textColor: $color("lightGray"),
            font: $font(13),
            align: $align.center
        },
        layout: function (make, view) {
            make.centerX.equalTo(view.super);
            make.bottom.equalTo(view.super.bottom).offset(-80);
        },
        events: {
            tapped: function (sender) {
                var progress = 1
                var timer
                $clipboard.text = "ZiGma"
                var popover_wechat = $ui.popover({
                    sourceView: sender,
                    directions: $popoverDirection.any,
                    dismissed: function () {
                        timer.invalidate()
                    },
                    size: $size(Golbal_Quan.wid, Golbal_Quan.wid * 0.9),
                    views: [{
                        type: "markdown",
                        props: {
                            id: "popover_md",
                            scrollEnabled: false,
                            content: "### 🎉被你抓到了！(｡･ω･｡)ﾉ \n你发现了一个小彩蛋！\n同名公众号名称已经复制到设备📋粘贴板，在下方⏰倒计时结束后将跳转至微信，直接粘贴搜索即可。之后的📄脚本发布和维护🔧都将在此公众号第一时间推送，烦请关注。\n**如已关注，请务必在下方倒计时结束前点击数字关闭此页面。**"
                        },
                        layout: function (make, view) {
                            make.top.left.right.offset(0)
                            make.bottom.equalTo(view.super).offset(-80)
                        }
                    }, {
                        type: "canvas",
                        props: {
                            id: "popover_countdown",
                            bgcolor: $color("clear")
                        },
                        layout: function (make, view) {
                            make.centerX.equalTo(view.super)
                            make.bottom.equalTo(view.super).offset(-10)
                            make.size.equalTo($size(80, 80))
                        },
                        events: {
                            draw: function (view, ctx) {
                                var lineWidth = 4
                                var radius = 20
                                var x = view.frame.width / 2
                                var y = view.frame.height / 2
                                var startAngle = Math.PI * 1.5
                                var endAngle = Math.PI * 2
                                ctx.strokeColor = $color("#E1E1E1")
                                ctx.setLineWidth(lineWidth)
                                ctx.addArc(x, y, radius, 0, endAngle, false)
                                ctx.strokePath()
                                ctx.strokeColor = $color("black")
                                ctx.setLineWidth(lineWidth)
                                ctx.addArc(x, y, radius, startAngle, (endAngle) * progress + startAngle, false)
                                ctx.strokePath()
                            },
                            ready: function (sender) {
                                if (timer !== undefined) { timer.invalidate() }
                                let second = 20
                                timer = $timer.schedule({
                                    interval: 0.01,
                                    handler: function () {
                                        var once = (1 / second) * 0.01
                                        var index = progress - once
                                        if (index <= 0) {
                                            progress = 0
                                            timer.invalidate()
                                            $app.openURL("weixin://")
                                            popover_wechat.dismiss()
                                        } else {
                                            progress = index
                                            $("num_label").text = (index * second).toFixed(0).toString()
                                        }
                                        sender.runtimeValue().invoke("setNeedsDisplay")
                                    }
                                })
                            },
                            tapped: function (sedner) {
                                timer.invalidate()
                                popover_wechat.dismiss()
                            }
                        },
                        views: [{
                            type: "label",
                            props: {
                                id: "num_label",
                                text: "20",
                                font: $font(24),
                                align: $align.center
                            },
                            layout: function (make, view) {
                                make.center.equalTo(view.super)
                            }
                        }]
                    }]
                })
            }
        }
    }]
}

module.exports = {
    Layer: Layer
};