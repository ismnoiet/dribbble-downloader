var EventEmitter = require('events'),
  util = require('util'),
  request = require('request'),
  jsdom = require('jsdom')

// example
  // var shotUrl = 'https://dribbble.com/shots/1417422-Salesforce1-Mobile-Sketch-Wireframe-Kit'

function Dribbble (shotUrl) {
  EventEmitter.call(this)
  this.urls = []
  this.shotUrl = shotUrl
  this.title = '' // shotName

  // kick things off.
  this.init()
}
util.inherits(Dribbble, EventEmitter)

Dribbble.prototype.add = function (url) {
  this.urls.push(url)
  this.emit('url-added', {url: url})
}

Dribbble.prototype.ready = function () {
  this.emit('ready',
    {
      mainImgUrl: this.mainImgUrl, title: this.title, urls: this.urls,
      attachments: this.attachments,
    }
  )
}

Dribbble.prototype.init = function () {
  var that = this
  request(this.shotUrl, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      return jsdom.env(
        that.shotUrl,
        [],
        function (err, window) {
          var originalUrls = []
          var title

          var title = window.document.querySelector('h1').innerHTML
          var mainImgUrl = window.document.querySelector('.the-shot .single-img img')
          var thumbnailUrls = window.document.querySelectorAll('img.thumb')
          that.title = title
          that.mainImgUrl = mainImgUrl.src

          // there is no attachements 
          if (thumbnailUrls.length === 0) {
            that.attachments = false
          } else {
            var count = thumbnailUrls.length
            var i = 0
            for (;i < count;i++) {
              originalUrls.push(thumbnailUrls[i].src.replace('/thumbnail', ''))
              that.add(originalUrls[i])
            }
          }
          that.ready()
        }
      )
    }
    console.log('Dribbble URL not found, may be it was removed :(')
  })

  return this
}

module.exports = Dribbble
