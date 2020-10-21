var webPush = require('web-push')

const vapidKeys = {
  publicKey: 'BIhbk-K8asv0OZTWpEHuJ7xowFA5DNvILM6GF3w3Q7h050lUTNlfOGQRvbIneAMbKENXXUs169TlXvRLb14hEqQ',
  privateKey: '3JJPJY_Egs8vyqMsD8JFwIkbRpNy6TfYsBjzCm6mhZM'
}

webPush.setVapidDetails(
  'mailto:Galahsenoadjie@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/ftYY5RqN-2Q:APA91bFlQgwjo0kUWcEkRA_-0OkRte845Rp3b-lxWO4Ow-AWCf-FaIuywzPHCm5zbSRuv13SMa05Q2_zi8vf2mOp6ms7deWgqaRhtm9SYlOEvxlFWGdYiPCgS26VKx0HYv1mKw_GAscB',
  keys: {
    p256dh: 'BFjG3HsX+x/kPcOa3TNVGIR+o96TatITzhQgj0frGzjnhdqHKX9aLDSASq9UPiuVg/eA6b9/RkfKUVvevG7yEE0=',
    auth: 'vhfJwPGdMQ5pJ2SnPGCSBA=='
  }
}
var payload = 'Push Notification from Payload'

var options = {
  gcmAPIKey: '53637632998',
  TTL: 60
}
webPush.sendNotification(
  pushSubscription,
  payload,
  options
)
