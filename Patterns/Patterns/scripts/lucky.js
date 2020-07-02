var const_ = require('scripts/const')
var iddd = 0
var idx = 0

var font_view = {
    type: "view",
    props: {
        id: "font_view",
    },
    layout: function (make, view) {
        switch (iddd % 2) {
            case 0:
                make.top.inset(275 + 60)
                make.left.right.inset(0)
                make.bottom.inset(const_.M_h * 2)
                break;
            case 1:
                make.top.inset(const_.hig * 0.2)
                make.left.right.inset(0)
                make.bottom.inset(const_.M_h * 2)
                break;
        }
    },
    views: [{
        type: "view",
        props: {
            bgcolor: $color("white")
        },
        layout: function (make, view) {
            make.top.left.inset(0)
            make.size.equalTo($size(const_.wid, 40))
        },
        views: [{
            type: "button",
            props: {
                src: "assets/back.png",
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.size.equalTo($size(20, 20))
                make.left.inset(10)
                make.centerY.equalTo(view.super)
            },
            events: {
                tapped: function () {
                    $("font_view").remove()
                    $device.taptic(0);
                }
            }
        }]
    }, {
        type: "list",
        props: {
            id: "font_list",
            template: [{
                type: "label",
                props: {
                    id: "font",
                    font: $font(13),
                    textColor: $color("#AAAAAA"),
                    align: $align.center
                },
                layout: function (make) {
                    make.height.equalTo(15)
                    make.left.right.inset(15)
                    make.bottom.inset(5)
                }
            },
            {
                type: "label",
                props: {
                    id: "input",
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
            separatorHidden: true,
        },
        layout: function (make, view) {
            make.top.inset(40)
            make.left.right.bottom.inset(0)
        },
        events: {
            didSelect: function (view, indexPath) {
                let font = view.object(indexPath).font.text
                let s = (font != "Zapfino" ? 20 : 10)
                $cache.set("font_size", s)
                switch (idx) {
                    case 0:
                        console.log(font)
                        $cache.set("font_1", indexPath.row)
                        $cache.set("font_1n", font)
                        $("daily_title").font = $font(font, s)
                        $("font_1").text = font
                        break;
                    case 1:
                        $cache.set("font_2", indexPath.row)
                        $cache.set("font_2n", font)
                        $("daily_content").font = $font(font, s)
                        $("font_2").text = font
                        break;
                }
                $("font_view").remove()
                $device.taptic(0);
            }
        }
    }]
}

var lucky_Page = {
    //maincover
    type: "view",
    props: {
        id: "lucky_view",
        bgcolor: $color("white")
    },
    layout: $layout.fill,
    views: [{
        type: "view",
        props: {
            bgcolor: $color("clear"),
        },
        layout: $layout.fill,
        views: [{
            type: "view",
            props: {
                id: "card_view",
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.size.equalTo($size(const_.wid, 275))
                make.top.left.inset(0)
            },
            views: [{
                type: "view",
                props: {
                    id: "shadow_view"
                },
                layout: function (make, view) {
                    make.centerX.equalTo(view.super)
                    make.top.left.right.inset(25)
                    make.bottom.inset(50)
                    const_.shadow(view, 10)
                },
                views: [{
                    type: "gradient",
                    props: {
                        id: "grad_view",
                        radius: 10,
                        colors: random_color(),
                        locations: [0.0, 1.0],
                        startPoint: $point(0.9, 0),
                        endPoint: $point(0, 0.9)
                    },
                    layout: $layout.fill
                }, {
                    type: "label",
                    props: {
                        id: "daily_content",
                        text: $cache.get("content") || "Somewhere beyond right and wrong, there is a garden, I will meet you there.",
                        font: $font($cache.get("font_2n") || "Baskerville-SemiBold", $cache.get("font_size") || 20),
                        textColor: $color("white"),
                        align: $align.left,
                        lines: 6
                    },
                    layout: function (make, view) {
                        make.width.equalTo(const_.wid - 80)
                        make.left.equalTo(view.prev.left).inset(20)
                        make.bottom.equalTo(view.prev.bottom).inset(20)
                    }
                }, {
                    type: "label",
                    props: {
                        id: "daily_title",
                        text: "✣ Daily Sentence",
                        font: $font($cache.get("font_1n") || "Baskerville-SemiBold", $cache.get("font_size") || 20),
                        textColor: $color("white"),
                        align: $align.left
                    },
                    layout: function (make, view) {
                        make.width.equalTo(const_.wid - 80)
                        make.left.equalTo(view.prev.left)
                        make.top.equalTo(view.super.top).inset(20)
                    }
                }, {
                    type: "view",
                    props: {
                        id: "content_loading",
                        radius: 10,
                        bgcolor: $color("white"),
                        alpha: 0
                    },
                    layout: $layout.fill,
                    views: [{
                        type: "blur",
                        props: {
                            style: 1
                        },
                        layout: $layout.fill
                    }, {
                        type: "lottie",
                        props: {
                            id: "content_lottie",
                            loop: true,
                            src: "assets/content_loading.json",
                        },
                        layout: (make, view) => {
                            make.size.equalTo($size(100, 100));
                            make.center.equalTo(view.super);
                        }
                    }]
                }]
            }, {
                type: "label",
                props: {
                    id: "daily_name",
                    text: "© " + const_.CONFIG[10],
                    font: $font("UIFont", 20),
                    textColor: $color("black"),
                    align: $align.right
                },
                layout: function (make, view) {
                    make.width.equalTo(const_.wid - 80)
                    make.right.equalTo(view.prev.right)
                    make.bottom.equalTo(view.super.bottom).inset(10)
                    const_.shadow(view, 0)
                }
            }],
            events: {
                tapped: function () {
                    $share.sheet($("card_view").snapshot)
                }
            }
        }, {
            type: "view",
            layout: function (make, view) {
                make.size.equalTo($size(judge_lan(), 40))
                make.centerX.equalTo(view.prev)
                make.top.equalTo(view.prev.bottom).inset(5)
                const_.shadow(view, 0)
            },
            views: [{
                type: "button",
                props: {
                    bgcolor: $color("#30CE88"),
                    title: $l10n("I'm feeling lucky"),
                    font: $font("PingFangTC-Semibold", 17)
                },
                layout: $layout.fill,
                events: {
                    tapped: function () {
                        $device.taptic(0);
                        $("grad_view").colors = random_color()
                        $("content_loading").alpha = 1
                        $("content_lottie").play()
                        $http.request({
                            method: "Get",
                            url: "https://LaUNu0uQ.api.lncld.net/1.1/classes/quotes?limit=1&skip=" + parseInt(Math.random() * 5421),
                            header: {
                                "X-LC-Id": "LaUNu0uQ4bAKmrckict8AFGY-gzGzoHsz",
                                "X-LC-Key": "6k4DpAAFPBmzpS4biReEJnmO"
                            },
                            handler: function (resp) {
                                var data = resp.data.results[0]
                                $ui.animate({
                                    duration: 0.4,
                                    animation: function () {
                                        $("content_loading").alpha = 0
                                        $("daily_content").text = data.quoteText
                                        $("content_2").text = data.quoteText
                                    },
                                    completion: function () {
                                        $("content_lottie").stop()
                                    }
                                })
                            }
                        })
                    }
                }
            }]
        }]
    }, {
        type: "blur",
        props: {
            id: "blur_view",
            alpha: 0,
            style: 1
        },
        layout: $layout.fill
    }, {
        type: "view",
        props: {
            id: "lucky_listview",
        },
        layout: function (make, view) {
            make.top.equalTo(view.super).inset(275 + 60)
            make.centerX.equalTo(view.super)
            make.size.equalTo($size(const_.wid, const_.hig - (335 + const_.M_h + const_.T_h)))
        },
        views: [{
            type: "view",
            props: {
                bgcolor: $color("white")
            },
            layout: function (make, view) {
                make.top.left.inset(0)
                make.size.equalTo($size(const_.wid, 50))
            }
        }, {
            type: "lottie",
            props: {
                bgcolor: $color("clear"),
                id: "expand",
                src: "assets/Expand.json",
                speed: 0.5,
                loop: true
            },
            layout: (make, view) => {
                make.size.equalTo($size(100, 50));
                make.top.equalTo(view.prev)
                make.centerX.equalTo(view.super);
            },
            events: {
                tapped: function () {
                    resize_view(iddd % 2)
                    iddd++
                    //alert("aaa")
                }
            }
        }, {
            type: "list",
            props: {
                id: "lucky_list",
                rowHeight: 50,
                bgcolor: $color("white"),
                data: [{
                    title: $l10n("Title"),
                    rows: [{
                        type: "view",
                        props: {
                            bgcolor: $color("white")
                        },
                        layout: $layout.fill,
                        views: [{
                            type: "label",
                            props: {
                                text: $l10n("Contents")
                            },
                            layout: function (make, view) {
                                make.left.equalTo(view.super).inset(15)
                                make.centerY.equalTo(view.super)
                            }
                        }, {
                            type: "label",
                            props: {
                                id: "content_1",
                                text: "✣ Daily Sentence",
                                textColor: $color("#8e8e8e"),
                                align: $align.right
                            },
                            layout: function (make, view) {
                                make.right.equalTo(view.super.right).inset(25)
                                make.centerY.equalTo(view.super)
                                make.width.equalTo(const_.wid / 2)
                            }
                        }]
                    }, {
                        type: "view",
                        props: {
                            bgcolor: $color("white")
                        },
                        layout: $layout.fill,
                        views: [{
                            type: "label",
                            props: {
                                text: $l10n("Font")
                            },
                            layout: function (make, view) {
                                make.left.equalTo(view.super).inset(15)
                                make.centerY.equalTo(view.super)
                            }
                        }, {
                            type: "label",
                            props: {
                                id: "font_1",
                                text: $cache.get("font_1n") || "Baskerville-SemiBold",
                                textColor: $color("#8e8e8e"),
                                align: $align.right
                            },
                            layout: function (make, view) {
                                make.right.equalTo(view.super.right).inset(25)
                                make.centerY.equalTo(view.super)
                                make.width.equalTo(const_.wid / 2)
                            }
                        }]
                    }]
                }, {
                    title: $l10n("Body"),
                    rows: [{
                        type: "view",
                        props: {
                            bgcolor: $color("white")
                        },
                        layout: $layout.fill,
                        views: [{
                            type: "label",
                            props: {
                                text: $l10n("Contents")
                            },
                            layout: function (make, view) {
                                make.left.equalTo(view.super).inset(15)
                                make.centerY.equalTo(view.super)
                            }
                        }, {
                            type: "label",
                            props: {
                                id: "content_2",
                                text: $cache.get("content"),
                                textColor: $color("#8e8e8e"),
                                align: $align.right
                            },
                            layout: function (make, view) {
                                make.right.equalTo(view.super.right).inset(25)
                                make.centerY.equalTo(view.super)
                                make.width.equalTo(const_.wid / 2)
                            }
                        }]
                    }, {
                        type: "view",
                        props: {
                            bgcolor: $color("white")
                        },
                        layout: $layout.fill,
                        views: [{
                            type: "label",
                            props: {
                                text: $l10n("Font")
                            },
                            layout: function (make, view) {
                                make.left.equalTo(view.super).inset(15)
                                make.centerY.equalTo(view.super)
                            }
                        }, {
                            type: "label",
                            props: {
                                id: "font_2",
                                text: $cache.get("font_2n") || "Baskerville-SemiBold",
                                textColor: $color("#8e8e8e"),
                                align: $align.right
                            },
                            layout: function (make, view) {
                                make.right.equalTo(view.super.right).inset(25)
                                make.centerY.equalTo(view.super)
                                make.width.equalTo(const_.wid / 2)
                            }
                        }]
                    }]
                }, {
                    title: $l10n("Watermark"),
                    rows: [{
                        type: "view",
                        props: {
                            bgcolor: $color("white")
                        },
                        layout: $layout.fill,
                        views: [{
                            type: "label",
                            props: {
                                text: $l10n("Name")
                            },
                            layout: function (make, view) {
                                make.left.equalTo(view.super).inset(15)
                                make.centerY.equalTo(view.super)
                            }
                        }, {
                            type: "label",
                            props: {
                                id: "name",
                                text: const_.CONFIG[9],
                                textColor: $color("#8e8e8e"),
                                align: $align.right
                            },
                            layout: function (make, view) {
                                make.right.equalTo(view.super.right).inset(25)
                                make.centerY.equalTo(view.super)
                                make.width.equalTo(const_.wid / 2)
                            }
                        }]
                    }, {
                        type: "view",
                        props: {
                            bgcolor: $color("white")
                        },
                        layout: $layout.fill,
                        views: [{
                            type: "label",
                            props: {
                                text: $l10n("Style")
                            },
                            layout: function (make, view) {
                                make.left.equalTo(view.super).inset(15)
                                make.centerY.equalTo(view.super)
                            }
                        }, {
                            type: "label",
                            props: {
                                id: "font_3",
                                text: const_.CONFIG[10],
                                textColor: $color("#8e8e8e"),
                                font: $font("UIFont", 17),
                                align: $align.right
                            },
                            layout: function (make, view) {
                                make.right.equalTo(view.super.right).inset(25)
                                make.centerY.equalTo(view.super)
                                make.width.equalTo(const_.wid / 2)
                            }
                        }]
                    }]
                }]
            },
            layout: function (make, view) {
                make.top.equalTo(view.prev.bottom).inset(-10)
                make.size.equalTo($size(const_.wid, const_.hig - (const_.M_h + const_.T_h + 375)))
            },
            events: {
                didSelect: function (sender, indexPath) {
                    switch (indexPath.section) {
                        case 0:
                            switch (indexPath.row) {
                                case 0:
                                    $input.text({
                                        text: $("content_1").text,
                                        handler: function (text) {
                                            $("daily_title").text = text
                                            $("content_1").text = text
                                        }
                                    })
                                    $device.taptic(0);
                                    break;
                                case 1:
                                    idx = 0
                                    $("lucky_view").add(font_view)
                                    renderData()
                                    $("font_list").scrollTo({
                                        indexPath: $indexPath(0, $cache.get("font_1") || 0),
                                        animated: true
                                    })
                                    $device.taptic(0);
                                    break;
                            }
                            break;
                        case 1:
                            switch (indexPath.row) {
                                case 0:
                                    $input.text({
                                        text: $("content_2").text,
                                        handler: function (text) {
                                            $("daily_content").text = text
                                            $("content_2").text = text
                                        }
                                    })
                                    $device.taptic(0);
                                    break;
                                case 1:
                                    idx = 1
                                    $("lucky_view").add(font_view)
                                    renderData()
                                    $("font_list").scrollTo({
                                        indexPath: $indexPath(0, $cache.get("font_2") || 0),
                                        animated: true
                                    })
                                    $device.taptic(0);
                                    break;
                            }
                            break;
                        case 2:
                            switch (indexPath.row) {
                                case 0:
                                    $input.text({
                                        text: $("name").text,
                                        handler: function (text) {
                                            $("name").text = text
                                            const_.saveconfig(9, text)
                                        }
                                    })
                                    $device.taptic(0);
                                    break;
                                case 1:
                                    $pick.data({
                                        props: {
                                            items: [const_.X2X($("name").text)]
                                        },
                                        handler: function (sender) {
                                            $("daily_name").text = "© " + sender
                                            $("daily_name").font = $font("UIFont", 17),
                                                $("font_3").text = sender
                                            const_.saveconfig(10, sender[0])
                                        }
                                    })
                                    $device.taptic(0);
                                    break;
                            }
                            break;
                    }
                }
            }
        }]
    }]
}

function renderData() {
    var familyNames = $objc("UIFont").invoke("familyNames").rawValue().sort()
    var data = []
    for (var family of familyNames) {
        var fontNames = $objc("UIFont").invoke("fontNamesForFamilyName", family).rawValue()
        //var rows = []
        for (var font of fontNames) {
            data.push({
                font: {
                    text: font
                },
                input: {
                    text: font,
                    font: $font(font, 20)
                }
            })
        }
    }
    $("font_list").data = data
}

function resize_view(idx) {
    switch (idx) {
        case 0:
            $ui.animate({
                duration: 0.5,
                velocity: 1.0,
                animation: function () {
                    $("lucky_listview").updateLayout(function (make, view) {
                        make.top.inset(const_.hig * 0.2)
                        //make.centerX.equalTo(view.super)
                        make.size.equalTo($size(const_.wid, (const_.hig - const_.M_h - const_.T_h) * 0.7))
                    })
                    $("lucky_listview").relayout()
                    $("blur_view").alpha = 1
                }
            })
            $("lucky_list").updateLayout(function (make, view) {
                make.top.equalTo(view.prev.bottom).inset(-10)
                make.size.equalTo($size(const_.wid, (const_.hig - const_.M_h - const_.T_h) * 0.7 + 2))
            })
            $("expand").rotate(Math.PI)
            break;
        case 1:
            $ui.animate({
                duration: 0.5,
                velocity: 1.0,
                animation: function () {
                    $("lucky_listview").updateLayout(function (make, view) {
                        make.top.inset(275 + 60)
                        make.centerX.equalTo(view.super)
                        make.size.equalTo($size(const_.wid, const_.hig - (340 + const_.M_h + const_.T_h)))
                    })
                    $("lucky_listview").relayout()
                    $("blur_view").alpha = 0
                }
            })
            $("lucky_list").updateLayout(function (make, view) {
                make.top.equalTo(view.prev.bottom).inset(-10)
                make.size.equalTo($size(const_.wid, const_.hig - (const_.M_h + const_.T_h + 375)))
            })
            $("expand").rotate(0)
            break;

    }

}

function random_color() {
    const cache_ = $cache.get("color") === undefined ? [["#541D61", "#8F3066", "#C05166", "#E88666", "#FCB76F"], ["#4E4D4D", "#8F63DE", "#DA20A9", "#FF54AF", "#F2C87C"]] : $cache.get("color")
    const num = Math.floor(Math.random() * (cache_.length))
    const r_1 = Math.floor(Math.random() * 4)
    const idx = Math.floor(Math.random() * 2)
    return [$color((cache_[num])[r_1 + idx]), $color((cache_[num])[r_1 + (1 - idx)])]
}

function judge_lan() {
    let lan = $device.info.language
    if (lan === "zh-Hans") {
        return 120
    } else {
        return 180
    }
}

module.exports = {
    Page: lucky_Page
};
