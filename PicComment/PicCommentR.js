var inputImage = $context.image
if (inputImage) {
  Upload(inputImage)
} else {
  PickImage()
}

function PickImage() {
  $photo.pick({
    format: "data",
    handler: function (resp) {
      var image = resp.data
      if (image) {
        Upload(image)
      } else {
        $ui.loading(false)
      }
    }
  })
}

function Upload(image) {
  $ui.loading(true)
  $http.upload({
    url: "http://bbs1.people.com.cn/postImageUpload.do",
    files: [
      {
        "data": image,
        "filename": "file.jpg",
        "name": "Filedata"
      }
    ],
    progress: function (percentage) { },
    handler: function (resp) {
      url = "http://bbs1.people.com.cn/" + resp.data.imageUrl
      if (url) {
        Shorturl(url)
      } else {
        $ui.loading(false)
        $ui.alert("图片上传失败")
      }
    }
  });
}

function Shorturl(url) {
  $http.shorten({
    url: url,
    handler: function (url) {
      if (url) {
        $ui.loading(false)
        $clipboard.text = "图片评论 " + url
        $ui.alert({
          title: "复制成功！",
          actions: [{
            title: "确认",
            handler: function () {
              $context.close()
            }
          }]
        })
      }
    }
  })
}
