const TelegramApi = require('node-telegram-bot-api')
const { options } = require('nodemon/lib/config')

const token = '5312733665:AAEaSl3_1Gt64sWWohkNdTJwNFxKqG72ii4'

const bot = new TelegramApi(token, {polling: true})

bot.on('message', msg => {
    console.log(msg.text)
})