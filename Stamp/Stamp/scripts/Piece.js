var Layer = {
    type: "image",
    props: {
        id: "image_actual",
        clipsToBounds:false,
    },
    layout: function (make, view) {
        make.center.equalTo(view.super)
    },
    views: [{
        type: "image",
        props: {
            id: "label_actual",
        },
        layout: $layout.fill
    }]
}

module.exports = {
    Layer:Layer
};