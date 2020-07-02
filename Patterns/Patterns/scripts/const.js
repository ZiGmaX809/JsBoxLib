var wid = $device.info.screen.width;
var hig = $device.info.screen.height;
var file = $file.read("scripts/config/config.conf")
var DEFAULT_ = ["123", "ABC", "abc"]
var CONFIG = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)
var T_h = judge_driver()[0]
var M_h = judge_driver()[1]
var B_inset = judge_driver()[3]
var TEMP = [
    {
        props: {
            bgcolor: $color("clear")
        },
        views: [
            {
                type: "label",
                props: {
                    id: "label",
                    font: $font("HiraMaruProN-W4", 17),
                    separatorColor: $color("darkGray"),
                    textColor: $color("darkGray"),
                    align: $align.center
                },
                layout: function (make, view) {
                    make.centerX.equalTo(view.super.centerX);
                    make.centerY.equalTo(view.super.centerY);
                    make.size.equalTo($size(wid, 50));
                }
            }
        ],
        layout: $layout.fill
    }
];

function judge_driver() {
    let isIphoneX = $device.isIphoneX;
    let isIphonePlus = $device.isIphonePlus;
    if (isIphoneX) {
        var conf = $file.read("scripts/config/X.conf")
    } else if (isIphonePlus) {
        var conf = $file.read("scripts/config/plus.conf")
    } else {
        var conf = $file.read("scripts/config/normal.conf")
        $app.tips($l10n("Adapttips"))
    }
    let screen_conf = JSON.parse(conf.string)
    return screen_conf
}

function T2T(word) {
    //字符替换
    const Pat1 = $cache.get("Pattern_1");
    const words = word.split("");
    const arr = new Array(words.length);
    const brr = new Array(Pat1.length);

    for (var i in Pat1) {
        let dic = Pat1[i];
        for (var j in words) {
            if (/[a-zA-Z]/.test(words[j])) {
                arr[j] = dic[words[j]];
            } else {
                arr[j] = words[j];
            }
        }
        brr[i] = arr.join("");
    }
    TT = brr.join(",");

    //字符添加
    const Pat2 = $cache.get("Pattern_2");
    const crr = new Array(Pat2[0].length);
    for (var i in Pat2[0]) {
        for (var j in words) {
            if (/\w/.test(words[j])) {
                arr[j] = words[j] + Pat2[0][i];
            } else {
                arr[j] = words[j];
            }
        }
        crr[i] = arr.join("");
    }
    if (words.length > 1) {
        crr[20] = Pat2[0][20] + crr[20];
    }
    TT = TT + "," + crr.join(",");
    return TT
}

function C2C(word) {
    const words = word.split("");
    const arr = new Array(words.length);
    for (var i in words) {
        if (/[a-z]/.test(words[i])) {
            var T = T2T(words[i]).split(",")[CONFIG[4]]
        } else {
            var T = T2T(words[i]).split(",")[CONFIG[5]]
        }
        arr[i] = T
    }
    TT = arr.join("")
    return TT
}

function N2N(num) {
    //数字转换
    const Pat0 = $cache.get("Pattern_0");
    const nums = num.split("")
    const arr = new Array(num.length);
    const brr = new Array(Pat0.length);
    for (var i in Pat0) {
        let dic = Pat0[i];
        for (var j in nums) {
            if (/\d/.test(nums[j])) {
                arr[j] = dic[nums[j]];
            } else {
                arr[j] = nums[j];
            }
        }
        brr[i] = arr.join("");
    }
    return brr
}

function X2X(word) {
    return (C2C(word) + "," + T2T(word)).split(",")
}

function keys(idx) {
    //idx=0 数字,idx=1 小写,idx=2 大写
    let r_0 = ["1234567890"]
    let r_1 = ["qwertyuiop", "asdfghjkl", "zxcvbnm"]
    let r_2 = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]

    switch (idx) {
        case 0:
            const cache_ = $cache.get("Pattern_0")
            const nums = r_0[0].split("")
            const arr = new Array(10)
            for (var i in nums) {
                let dic = cache_[CONFIG[3]]
                for (var j = 0; j < 10; j++) {
                    arr[j] = dic[(r_0[0])[j]]
                }
            }
            return arr
        case 1:
            return p_k(r_1, 4)
        case 2:
            return p_k(r_2, 5)
    }
}

function p_k(key, idx) {
    const brr = new Array(3);
    for (var i = 0; i < 3; i++) {
        var brrr = new Array(key[i].length)
        for (var j = 0; j < key[i].length; j++) {
            let k = (key[i].split(""))[j]
            brrr[j] = T2T(k).split(",")[CONFIG[idx]]
        }
        brr[i] = brrr
    }
    return brr
}

function saveconfig(section, value) {
    CONFIG[section] = value
    $file.write({
        data: $data({ string: JSON.stringify(CONFIG) }),
        path: "scripts/config/config.conf"
    })
}

function shadow(view, radius) {
    var layer = view.runtimeValue().invoke("layer");
    layer.invoke("setCornerRadius", radius);
    layer.invoke("setShadowOffset", $size(1, 5));
    layer.invoke(
        "setShadowColor",
        $color("darkGray")
            .runtimeValue()
            .invoke("CGColor")
    );
    layer.invoke("setShadowOpacity", 0.6);
    layer.invoke("setShadowRadius", 5);
}

module.exports = {
    wid: wid,
    hig: hig,
    TEMP: TEMP,
    T2T: T2T,
    C2C: C2C,
    N2N: N2N,
    X2X: X2X,
    keys: keys,
    CONFIG: CONFIG,
    saveconfig: saveconfig,
    judge_driver: judge_driver,
    T_h:T_h,
    M_h:M_h,
    B_inset:B_inset,
    shadow: shadow
};
