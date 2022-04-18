require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')
const { options } = require('nodemon/lib/config')
const token = process.env.TOKEN
const bot = new TelegramApi(token, {polling: true})

const butOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Главная', callback_data: '1'}], [{text: 'Бронирование', callback_data: '2'}], [{text: 'Меню', callback_data: '3'}]
        ]
    })
}

const placeOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Семеновская', callback_data: '1'}], [{text: 'Выхино', callback_data: '2'}], [{text: 'Щелковская', callback_data: '3'}],
            [{text: 'Люблино', callback_data: '1'}], [{text: '', callback_data: '2'}], [{text: 'Южная', callback_data: '3'}],
            [{text: 'Сокол', callback_data: '1'}], [{text: 'Коломенская', callback_data: '2'}], [{text: 'Солнцево', callback_data: '3'}]
        ]
    })
}
bot.on('message', async msg => {
    const text = msg.text;
    const chatid = msg.chat.id;

    if (text === '/start') {
        return bot.sendMessage(chatid, 'Центр киберспорта', butOptions)
    }
    if (text === '/place') {
        return bot.sendMessage(chatid, 'Выберите центр')
    }
    return bot.sendMessage(shatid, `Введите '/start' чтобы начать`)
})
bot.on('callback_query', msg => {
    const data = msg.data;
    const chatid = msg.message.chat.id;
    
    if (data === chatid) {
    return bot.sendMessage(chatid, 'Выберите центр', placeOptions)
    }
    return bot.sendMessage(chatid, 'Извините, я вас не понял')
})
