require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')
const { options } = require('nodemon/lib/config')
const token = process.env.TOKEN
const bot = new TelegramApi(token, {polling: true})

<<<<<<< HEAD
const bookingOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text:'Главная', callback_data:'1'}], [{text:'Бронирование', callback_data:'2'}], [{text:'Меню', callback_data:'3'}]
        ]
    })
}

const placeOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text:'Семеновская', callback_data:'4'}], [{text:'Выхино', callback_data:'5'}], 
            [{text:'Южная', callback_data:'6'}], [{text:'Щелковская', callback_data:'7'}]
            [{text:'Сокол', callback_data:'8'}], [{text:'Люблино', callback_data:'9'}]
            [{text:'Коломенская', callback_data:'10'}], [{text:'Солнцево', callback_data:'11'}]
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начать'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatid = msg.chat.id;
    
        if (text === '/start') {
            return bot.sendMessage(chatid, 'Центр киберспорта:', bookingOptions)
        }
        if (text === 'дурак') {
            return bot.sendMessage(chatid, 'Это вот было обидно')
        }
        if (text === 'ты плохой') {
            return bot.sendMessage(chatid, 'Поняла, исправлюсь')
        }
        if (text === 'ты бот') {
            return bot.sendMessage(chatid, 'Ну, можно и так сказать')
        }
        return bot.sendMessage(chatid, `Введите '/start' чтобы начать`)
    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatid = msg.message.chat.id;
        if (data === chats[chatid]) {
            return bot.sendMessage(chatid,`Выберите центр: ${chats[chatid]}`, placeOptions)
        }
        console.log(msg)
    })
}
start()
=======
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
>>>>>>> 84bdb424fbdd1917c4258f51857045dacee5688c
