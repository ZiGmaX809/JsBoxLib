var const_ = require('scripts/const')

var Like_Page = {
    //info
    type: "view",
    props: {
        id: "Like_Page",
        bgcolor: $color("#EFF1F1")
    },
    layout: function (make, view) {
        make.size.equalTo($size(const_.wid, const_.hig - (const_.M_h + const_.T_h)))
    },
    views: [{
        type: "list",
        props: {
            rowHeight: 50,
            template: [{
                type: "label",
                props: {
                    id: "list_title"
                },
                layout: function (make, view) {
                    make.left.equalTo(15)
                    make.centerY.equalTo(view.super)
                }
            }],
            data: [{
                title: $l10n("Keyboard Settings"),
                rows: [{
                    type: "view",
                    props: {
                        bgcolor: $color("white")
                    },
                    layout: $layout.fill,
                    views: [{
                        type: "label",
                        props: {
                            text: $l10n("Auto-Capitalization")
                        },
                        layout: function (make, view) {
                            make.left.equalTo(view.super).inset(15)
                            make.centerY.equalTo(view.super)
                        }
                    }, {
                        type: "switch",
                        props: {
                            id: "first_up",
                            onColor: $color("#4CD864"),
                            on: const_.CONFIG[6] === 0 ? false : true
                        },
                        layout: function (make, view) {
                            make.right.equalTo(view.super.right).inset(25)
                            make.centerY.equalTo(view.super)
                        },
                        events: {
                            changed: function (sender) {
                                if (sender.on) {
                                    const_.saveconfig(6, 1)
                                } else {
                                    const_.saveconfig(6, 0)
                                }
                            }
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
                            text: $l10n("Colorful Keyboard")
                        },
                        layout: function (make, view) {
                            make.left.equalTo(view.super).inset(15)
                            make.centerY.equalTo(view.super)
                        }
                    }, {
                        type: "switch",
                        props: {
                            id: "color_board",
                            onColor: $color("#4CD864"),
                            on: const_.CONFIG[7]
                        },
                        layout: function (make, view) {
                            make.right.equalTo(view.super.right).inset(25)
                            make.centerY.equalTo(view.super)
                        },
                        events: {
                            changed: function (sender) {
                                if (sender.on) {
                                    const_.saveconfig(7, true)
                                } else {
                                    const_.saveconfig(7, false)
                                }
                            }
                        }
                    }]
                }]
            }, {
                title: $l10n("Cache"),
                rows: [{
                    type: "view",
                    props: {
                        bgcolor: $color("white")
                    },
                    layout: $layout.fill,
                    views: [{
                        type: "label",
                        props: {
                            text: $l10n("Date of Expiry")
                        },
                        layout: function (make, view) {
                            make.left.equalTo(view.super).inset(15)
                            make.centerY.equalTo(view.super)
                        }
                    }, {
                        type: "input",
                        props: {
                            id: "cache_time",
                            type: $kbType.number,
                            text: JSON.stringify(const_.CONFIG[8]),
                            font: $font(17),
                            bgcolor: $color("clear"),
                            textColor: $color("black"),
                            align: $align.right
                        },
                        layout: function (make, view) {
                            make.right.equalTo(view.super.right).inset(25)
                            make.centerY.equalTo(view.super)
                            make.size.equalTo($size(100, 35))
                        },
                        events: {
                            returned: function (sender) {
                                const_.saveconfig(8, JSON.parse(sender.text))
                                $("cache_time").blur()
                            }
                        }
                    }]
                }]
            }, {
                title: $l10n("Custom Style"),
                rows: [{
                    type: "view",
                    props: {
                        bgcolor: $color("white")
                    },
                    layout: $layout.fill,
                    views: [{
                        type: "label",
                        props: {
                            text: $l10n("Number Style")
                        },
                        layout: function (make, view) {
                            make.left.equalTo(view.super).inset(15)
                            make.centerY.equalTo(view.super)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "case_0",
                            text: (const_.CONFIG[0]),
                            font: $font("UIFont", 17),
                            textColor: $color("#8e8e8e"),
                            align: $align.right
                        },
                        layout: function (make, view) {
                            make.right.equalTo(view.super.right).inset(25)
                            make.centerY.equalTo(view.super)
                            make.width.equalTo(100)
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
                            text: $l10n("Lower Case Style")
                        },
                        layout: function (make, view) {
                            make.left.equalTo(view.super).inset(15)
                            make.centerY.equalTo(view.super)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "case_1",
                            text: (const_.CONFIG[1]),
                            font: $font("UIFont", 17),
                            textColor: $color("#8e8e8e"),
                            align: $align.right
                        },
                        layout: function (make, view) {
                            make.right.equalTo(view.super.right).inset(25)
                            make.centerY.equalTo(view.super)
                            make.width.equalTo(100)
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
                            text: $l10n("Capital Style")
                        },
                        layout: function (make, view) {
                            make.left.equalTo(view.super).inset(15)
                            make.centerY.equalTo(view.super)
                        }
                    }, {
                        type: "label",
                        props: {
                            id: "case_2",
                            text: (const_.CONFIG[2]),
                            font: $font("UIFont", 17),
                            textColor: $color("#8e8e8e"),
                            align: $align.right
                        },
                        layout: function (make, view) {
                            make.right.equalTo(view.super.right).inset(25)
                            make.centerY.equalTo(view.super)
                            make.width.equalTo(100)
                        }
                    }]
                }]
            }, {
                title: $l10n("About"),
                rows: [{
                    list_title: {
                        text: $l10n("About Script")
                    },
                }, {
                    list_title: {
                        text: $l10n("Follow WeChat Official Accounts")
                    },
                }, {
                    list_title: {
                        text: $l10n("Feedback")
                    },
                }, {
                    list_title: {
                        text: $l10n("Buy Me A Coffee")
                    },
                }]
            }],
            footer: {
                type: "label",
                props: {
                    height: 20,
                    text: "© Code By 𝐙𝐢𝐆𝐦𝐚",
                    textColor: $color("#AAAAAA"),
                    align: $align.center,
                    font: $font(12)
                }
            }
        },
        layout: $layout.fill,
        events: {
            didSelect: function (sender, indexPath) {
                switch (indexPath.section) {
                    case 2:
                        let list = const_.N2N("123")
                        if (indexPath.row === 0) {
                            $picker.data({
                                props: {
                                    items: [list]
                                },
                                handler: function (sender) {
                                    $("case_" + indexPath.row).text = sender
                                    const_.saveconfig(indexPath.row, sender[0])
                                    const_.saveconfig(indexPath.row + 3, list.indexOf(sender[0]))
                                }
                            })
                        } else {
                            let exmp = ["Abc", "Abc"]
                            let list = (const_.T2T(exmp[indexPath.row - 1])).split(",")
                            $picker.data({
                                props: {
                                    items: [list]
                                },
                                handler: function (sender) {
                                    $("case_" + indexPath.row).text = sender
                                    const_.saveconfig(indexPath.row, sender[0])
                                    const_.saveconfig(indexPath.row + 3, list.indexOf(sender[0]))
                                }
                            })
                        }
                        break;
                    case 3:
                        switch (indexPath.row) {
                            case 0:
                                $safari.open({ url: "http://mp.weixin.qq.com/s?__biz=MzU3NzE2MzI2MA==&mid=100000038&idx=1&sn=d931c08c59e6e8fc7ae62deeef02b60f&chksm=7d099bb54a7e12a325d55d721ce098bdcf3f02e1608e25c8f1fcf0c77bae44f21167512a0627#rd" })
                                break;
                            case 1:
                                $clipboard.text = "ZiGma"
                                $ui.alert({
                                    title: $l10n("Tips"),
                                    message: $l10n("READY"),
                                    actions: [
                                        {
                                            title: $l10n("OK"),
                                            disabled: false, // Optional
                                            handler: function () {
                                                $app.openURL("weixin://")
                                            }
                                        },
                                        {
                                            title: $l10n("Cancel"),
                                            handler: function () {

                                            }
                                        }
                                    ]
                                });
                                break;
                            case 2:
                                $ui.menu({
                                    items: [$l10n("E-Mail"), $l10n("Telegram")],
                                    handler: function (title, idx) {
                                        switch (idx) {
                                            case 0:
                                                {
                                                    $message.mail({
                                                        subject: $l10n("Pattern Feedback"),
                                                        to: ["pyrogas7@gmail.com"],
                                                        cc: [],
                                                        bcc: [],
                                                        body: "",
                                                        handler: function (result) { }
                                                    })
                                                }
                                                break
                                            case 1:
                                                {
                                                    $app.openURL("https://t.me/ZiGmaX809")
                                                }
                                                break
                                        }
                                    }
                                });
                                break;
                            case 3:
                                $ui.menu({
                                    items: [$l10n("Alipay"), $l10n("WeChat")],
                                    handler: function (title, idx) {
                                        switch (idx) {
                                            case 0:
                                                {
                                                    $app.openURL("HTTPS://QR.ALIPAY.COM/FKX07426ELM5A1ZGXMJR4E")
                                                }
                                                break
                                            case 1:
                                                {
                                                    $photo.save({
                                                        data: $file.read("assets/like.jpg"),
                                                        handler: function (success) {
                                                            $ui.alert({
                                                                title: $l10n("Thanks"),
                                                                message: $l10n("Thanks_text"),
                                                                actions: [{
                                                                    title: "OK",
                                                                    handler: function () {
                                                                        $app.openURL("weixin://scanqrcode")
                                                                    }
                                                                }]
                                                            })
                                                        }
                                                    })
                                                }
                                                break
                                        }
                                    }
                                })
                        }
                }

                //console.log([indexPath.section, indexPath.row])
            }
        }
    }]
}

module.exports = {
    Page: Like_Page
};
