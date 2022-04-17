require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')
const { options } = require('nodemon/lib/config')
const token = process.env.TOKEN
const bot = new TelegramApi(token, {polling: true})

bot.on('message', async msg => {
    const text = msg.text;
    const chatid = msg.chat.id;

    if (text === '/booking') {
        await bot.sendMessage(chatid, 'Бронирование')
    }
    if (text === '/place') {
        await bot.sendMessage(chatid, 'Выберите центр')
    }
})