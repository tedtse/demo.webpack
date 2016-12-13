var imageQueue = [
    'logo_123.png',
    'logo_aiqiyi.png',
    'logo_letv.png',
    'logo_xl.png'
];

var imageList = document.querySelector('.image-list');
var tpl = '';
imageQueue.forEach(function (image) {
    var src = require('file-loader?name=static/images/[hash].[ext]!../images/' + image);
    tpl += '<li><img src="' + src + '" /></li>';
});
imageList.innerHTML = tpl;