const CryptoJS = require("crypto-js")
String.prototype.urlsafe = function() {
  return this.replace(/\+/g, "-").replace(/\//g, "_")
}
//计算Token
//你的AK
var AK = ""
//你的SK
var SK = ""
//你的储存空间名
var bucket = ""
//你的储存域名
var domain = ""
var deadline = Math.round(new Date().getTime() / 1000) + 1 * 3600
var params = { scope: bucket, deadline: deadline }
var policy = JSON.stringify(params)
var policyEncoded = $text.base64Encode(policy).urlsafe()
var sign = CryptoJS.HmacSHA1(policyEncoded, SK)
var signEncoded = sign.toString(CryptoJS.enc.Base64).urlsafe()
var token = AK + ":" + signEncoded + ":" + policyEncoded

function PickImage() {
  $photo.pick({
    format: "image",
    handler: function(resp) {
      var image = resp.image
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
    url: "http://upload.qiniu.com/",
    form: {
      token: token
    },
    files: [{
      "image": image,
      "name": "file",
      "filename": "file"
    }],
    progress: function(percentage) {

    },
    handler: function(resp) {
      var url = domain + resp.data.key
      if (url) {
        Shorturl(url)
        console.log(url)
      } else {
        $ui.loading(false)
        $ui.alert("图片上传失败")
      }
    }
  })
}

function Shorturl(url) {
  $http.shorten({
    url: url,
    handler: function(url) {
      if (url) {
        $ui.loading(false)
        $clipboard.text = "图片评论 " + url
        $ui.alert({
          title: "复制成功！",
          actions: [{
            title: "确认",
            handler: function() {
              $context.close()
            }
          }]
        })
      }
    }
  })
}

var inputImage = $context.image
if (inputImage) {
  Upload(inputImage)
} else {
  PickImage()
}
