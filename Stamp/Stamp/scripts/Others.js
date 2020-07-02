var Golbal_Quan = require("scripts/Quantitative.js");

var Isolation_Layer = {
    type: "view",
    props: {
        id: "image_cover",
        bgcolor: $color("white")
    },
    layout: $layout.fill
}

var Blur_Image_Layer={
    type: "view",
    props: {
        id: "blur_image_bg",
    },
    layout: function (make, view) {
        make.size.equalTo($size(Golbal_Quan.wid, Golbal_Quan.hig * Golbal_Quan.preview_scale));
        make.top.offset(40);
    },
    views: [{
        type: "image",
        props: {
            id: "blur_image"
        },
        layout: function (make, view) {
            make.center.equalTo(view.super);
        }
    }]
}

var Blur_Layer={
    type: "blur",
    props: {
        style: 4 // 0 ~ 5
    },
    layout: $layout.fill
}

module.exports = {
    Isolation_Layer:Isolation_Layer,
    Blur_Image_Layer:Blur_Image_Layer,
    Blur_Layer:Blur_Layer
};