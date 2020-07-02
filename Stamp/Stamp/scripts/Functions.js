var Golbal_Quan = require("scripts/Quantitative.js");
var all_fonts_data = []
var all_fonts = []

function Pick_Photo() {
    $photo.pick({
        handler: function (resp) {
            if (resp.status) {
                Load_Photo(resp.image)
            }
        }
    })
}

function Take_Photo() {
    $photo.take({
        handler: function (resp) {
            if (resp.status) {
                Load_Photo(resp.image)
            }
        }
    })
}

function Load_Photo(image) {
    let image_wid = image.size.width;
    let image_hig = image.size.height;
    let scale = Rescale_Image(image_wid, image_hig, 40)

    $cache.set("scale", scale);
    $cache.set("image_w", image_wid);
    $cache.set("image_h", image_hig);

    $("preview_image").alpha = 0
    $("preview_image").data = image.jpg(1.0);
    $ui.animate({
        duration: 0.5,
        velocity: 1.0,
        animation: function () {
            $("preview_image").alpha = 1
        }
    })

    $("blur_image").data = image.jpg(0.1);
    $("image_actual").data = image.jpg(1.0);

    $("preview_image").updateLayout(function (make) {
        make.size.equalTo(Resize_Image(image_wid, image_hig, 40));
    });

    $("blur_image").updateLayout(function (make) {
        make.size.equalTo(Resize_Image(image_wid, image_hig, 40));
    });

    $("pix_wid_label").text = image_wid
    $("pix_hig_label").text = image_hig

    if ($("lottie_bg") != undefined) {
        Add_Label();
        $ui.animate({
            duration: 0.5,
            velocity: 1.0,
            animation: function () {
                $("lottie_bg").alpha = 0
            },
            completion: function () {
                $("lottie_bg").remove()
            }
        })
        $("logo_image").scale(Golbal_Quan.SETTING[14]/ 100)
    }
}

function Resize_Image(w, h, off) {
    return Golbal_Quan.wid / (Golbal_Quan.hig * Golbal_Quan.preview_scale) < w / h ? $size(Golbal_Quan.wid - off, (Golbal_Quan.wid - off) / w * h) : $size((Golbal_Quan.hig * Golbal_Quan.preview_scale - off) / h * w, Golbal_Quan.hig * Golbal_Quan.preview_scale - off)
}

function Rescale_Image(w, h, off) {
    return Golbal_Quan.wid / (Golbal_Quan.hig * Golbal_Quan.preview_scale) < w / h ? (Golbal_Quan.wid - off) / w : (Golbal_Quan.hig * Golbal_Quan.preview_scale - off) / h
}

function Add_Label() {
    $("label_view_bg").rotate(Math.PI * (parseInt(Golbal_Quan.SETTING[8]) / 180))

    var top_anchor = {
        type: "view",
        props: {
            id: "-1_-1",
            bgcolor: $color("clear")
        },
        layout: function (make, view) {
            make.size.equalTo($size(1, 1))
            make.left.equalTo(view.super)
            make.top.equalTo(view.super).offset(-80)
        }
    }
    $("label_bg").add(top_anchor)

    for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
        add_row(i)
        for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
            add_column(i, j)
        }
    }
}

function add_row(row) {
    var anchor = {
        type: "view",
        props: {
            id: row + "_-1",
            bgcolor: $color("clear")
        },
        layout: function (make, view) {
            make.size.equalTo($size(25, 25))
            make.left.equalTo(view.super).offset(row % 2 * 30 - 200)
            make.top.equalTo($((parseInt(row) - 1).toString() + "_-1").bottom).offset(Golbal_Quan.SETTING[3])
        }
    }
    $("label_bg").add(anchor)
}

function add_column(row, column) {
    var lab = {
        type: "label",
        props: {
            id: row + "_" + column,
            text: Golbal_Quan.SETTING[0],
            font: $font(Golbal_Quan.SETTING[2], Golbal_Quan.SETTING[1]),
            textColor: $color(Golbal_Quan.SETTING[9]),
            align: $align.left,
            alpha: Golbal_Quan.SETTING[7] / 100,
            shadowColor: $color(Golbal_Quan.SETTING[10] % 2 == 0 ? "clear" : "black")
        },
        layout: function (make, view) {
            make.left.equalTo($(row + "_" + (column - 1).toString()).right).offset(Golbal_Quan.SETTING[4])
            make.top.equalTo($(row + "_" + (column - 1).toString()).top)
        }
    }
    $("label_bg").add(lab)
}

function Share_Photo(mode) {
    if (mode == 0) {
        var can = {
            type: "canvas",
            props: {
                id: "piece_canvas"
            },
            layout: $layout.fill,
            events: {
                draw: (view, ctx) => {
                    var image = $cache.get("logo_image_src")
                    var i_w = image.size.width
                    var i_h = image.size.height
                    var s = $("funny_size_slider").value / 100 / Number($cache.get("scale"))
                    var x = Number($cache.get("image_w")) / 2 - i_w * s / 2 + $("funny_x_slider").value / 100 * Number($cache.get("image_w"))
                    var y = Number($cache.get("image_h")) / 2 - i_h * s / 2 + $("funny_y_slider").value / 100 * Number($cache.get("image_h"))
                    ctx.drawImage($rect(x, y, i_w * s, i_h * s), image);
                }
            }
        }

        $("image_actual").add(can)
        $("piece_canvas").rotate(Math.PI * (parseInt($("angle_slider").value) / 180))
    } else {
        $("image_actual").scale(1)
        var label_data = $("snap_view").snapshot
        $("label_actual").hidden = false
        $("label_actual").image = label_data
        $("label_actual").scale = 1 / $cache.get("scale")
    }

    var image = $("image_actual").snapshot
    var resizedImage = image.resized($size(Number($("pix_wid_label").text) / 3, Number($("pix_hig_label").text) / 3))

    return resizedImage
}

function Switch_Tab(index) {
    Hidden_All_Tabs();
    switch (index) {
        case 0:
            $("tab0").hidden = false
            break;
        case 1:
            $("tab1").hidden = false
            break;
        case 2:
            $("tab2").hidden = false
            break;
        case 3:
            $("tab3").hidden = false
            break;
        case 4:
            $("tab4").hidden = false
            break;
        case 5:
            $("tab5").hidden = false
            break;
    }
}

function Hidden_All_Tabs() {
    for (i = 0; i < 6; i++) {
        $("tab" + i).hidden = true
    }
}

function Save_Settings(section, value) {
    Golbal_Quan.SETTING[section] = value
    $file.write({
        data: $data({ string: JSON.stringify(Golbal_Quan.SETTING) }),
        path: "assets/Setting.conf"
    })
}

function Change_Row(algo, row) {
    switch (algo) {
        //添加行
        case 0:
            add_row(row)
            for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                add_column(row, j)
            }
            break;
        //减少行
        case 1:
            $(row + "_-1").remove()
            for (j = 0; j < Golbal_Quan.SETTING[6]; j++) {
                $(row + "_" + j).remove()
            }
            break;
    }
}

function Change_Column(algo, column) {
    switch (algo) {
        //添加列
        case 0:
            for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                add_column(i, column)
            }
            break;
        //减少列
        case 1:
            for (i = 0; i < Golbal_Quan.SETTING[5]; i++) {
                $(i + "_" + column).remove();
            }
            break;
    }
}

function Get_All_Fonts() {
    //写入系统字体
    all_fonts_data.push({
        font_style_name: {
            text: "default"
        },
        font_style_example: {
            text: "测试 Test 123",
            font: $font("default", 20)
        }
    })
    all_fonts.push("default")

    var familyNames = $objc("UIFont").invoke("familyNames").rawValue().sort()
    for (var family of familyNames) {
        var fontNames = $objc("UIFont").invoke("fontNamesForFamilyName", family).rawValue()
        for (var font of fontNames) {
            all_fonts_data.push({
                font_style_name: {
                    text: font
                },
                font_style_example: {
                    text: "测试 Test 123",
                    font: $font(font, 20)
                }
            })
            all_fonts.push(font)
        }
    }
}

function Shadow(view) {
    var layer = view.runtimeValue().invoke("layer")
    layer.invoke("setCornerRadius", 8)
    layer.invoke("setShadowOffset", $size(0, 2))
    layer.invoke("setShadowColor", $color("gray").runtimeValue().invoke("CGColor"))
    layer.invoke("setShadowOpacity", 0.1)
    layer.invoke("setShadowRadius", 3)
}

async function Download_Logolist() {
    const Get_Logolist = await $http.get("https://zigma.coding.net/p/Stamp/d/Stamp/git/raw/master/Logo.json");
    $cache.set("Logolist", Get_Logolist);
}

module.exports = {
    Save_Settings: Save_Settings,
    Hidden_All_Tabs: Hidden_All_Tabs,
    Switch_Tab: Switch_Tab,
    Share_Photo: Share_Photo,
    Add_Label: Add_Label,
    Load_Photo: Load_Photo,
    Pick_Photo: Pick_Photo,
    Take_Photo: Take_Photo,
    Change_Row: Change_Row,
    Change_Column: Change_Column,
    Shadow: Shadow,
    Get_All_Fonts: Get_All_Fonts,
    all_fonts: all_fonts,
    all_fonts_data: all_fonts_data,
    Download_Logolist: Download_Logolist
};
