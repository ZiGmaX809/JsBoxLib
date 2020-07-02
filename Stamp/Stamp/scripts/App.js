var Preview_Layout = require("scripts/Preview.js")
var Import_Layout = require("scripts/Import.js")
var Controls_Layout = require("scripts/Controls.js");
var Piece_Layout = require("scripts/Piece.js");
var Others_Layout = require("scripts/Others.js")
var Functions = require("scripts/Functions.js");

$ui.render({
    props: {
        navBarHidden: true,
        statusBarStyle: 0
    },
    views: [{
        type: "view",
        props: {
            id: "main"
        },
        layout: $layout.fill,
        views: [
            //拼合层，用于图片最后保存
            Piece_Layout.Layer,
            //隔离层，用于隔离操作层，以免暴露
            Others_Layout.Isolation_Layer,
            //图片阴影层
            Others_Layout.Blur_Image_Layer,
            //模糊层，增加一个模糊效果
            Others_Layout.Blur_Layer,
            //预览层
            Preview_Layout.Layer,
            //操作层
            Controls_Layout.Layer,
            //导入按钮层
            Import_Layout.Layer
        ]
    }]
})

$("start_lottie").play();
Functions.Download_Logolist();