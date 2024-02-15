require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");
const { options } = require("nodemon/lib/config");
const token = process.env.TOKEN;
const bot = new TelegramApi(token, { polling: true });
const { MongoClient } = require("mongodb");
const dataBase = new MongoClient(
  process.env.MONGO
);

const main = {
  reply_markup: {
    resize_keyboard: true,
    one_time_keyboard: true,
    keyboard: [["Фильмы", "Покупки"], ["Профиль"]],
  },
};

const films = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [
        { text: "Анчартед", callback_data: "1" },
        { text: "Бука", callback_data: "2" },
      ],
      [
        { text: "Флешбэк", callback_data: "3" },
        { text: "Казнь", callback_data: "4" },
      ],
      [
        { text: "Крутые яйца-2", callback_data: "5" },
        { text: "Ботан и Супербаба", callback_data: "6" },
      ],
      [{ text: "« Назад", callback_data: "7" }],
    ],
  }),
};

const today = new Date();
const timeOpt = { month: 'long', day: 'numeric' };
const russianDate = today.toLocaleDateString('ru-RU', timeOpt);

const tomorrow = new Date(today.getTime());
tomorrow.setDate(tomorrow.getDate() +  1);
const afterTomorrowRussianDate = tomorrow.toLocaleDateString('ru-RU', timeOpt);

const afterTomorrow = new Date(today.getTime());
tomorrow.setDate(afterTomorrow.getDate() +  2);
const afterTom = tomorrow.toLocaleDateString('ru-RU', timeOpt);

const backBtn = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "« Назад", callback_data: "9"}],
    ],
  }),
};

const buyTicket = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Купить билет", callback_data: "8" }],
      [{ text: "« Назад", callback_data: "9" }],
    ],
  }),
};

const ticketBuka = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Купить билет", callback_data: "ticketBuka" }],
      [{ text: "« Назад", callback_data: "9" }],
    ],
  }),
};

const schedule2 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: `${russianDate}`, callback_data: '678'}, { text: `${afterTomorrowRussianDate}`, callback_data: '678'}, { text: `${afterTom}`, callback_data: '678'}],
      [{ text: '11:05 - 260 ₽', callback_data: '678'}, { text: '11:05 - 260 ₽', callback_data: 'morning'}, { text: '11:05 - 260 ₽', callback_data: '678'},],
      [{ text: '14:15 - 320 ₽', callback_data: '678'}, { text: '14:15 - 320 ₽', callback_data: 'day'}, { text: '14:15 - 320 ₽', callback_data: '678'},],
      [{ text: '18:45 - 320 ₽', callback_data: '678'}, { text: '18:45 - 320 ₽', callback_data: 'evening'}, { text: '18:45 - 320 ₽', callback_data: '678'},],
      [{ text: '23:45 - 360 ₽', callback_data: '678'}, { text: '23:45 - 360 ₽', callback_data: 'night'}, { text: '23:45 - 360 ₽', callback_data: '678'},],
      [{ text: "« Назад", callback_data: "1" }],
    ],
  }),
};

const sched2 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: '11:05 - 260 ₽', callback_data: 'morning'}],
      [{ text: '14:15 - 320 ₽', callback_data: 'day'}],
      [{ text: '18:45 - 320 ₽', callback_data: 'evening'}],
      [{ text: '23:45 - 360 ₽', callback_data: 'night'}],
      [{ text: "« Назад", callback_data: "2" }],
    ],
  }),
};

const confirmkeyboard = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Отменить', callback_data: 'cancel'}, { text: 'Пополнить', callback_data: 'confirm'}],
    ],
  }),
};

const trail = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Смотреть трейлер", callback_data: "10" }]],
  }),
};
const trail1 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Смотреть трейлер", callback_data: "12" }]],
  }),
};
const trail2 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Смотреть трейлер", callback_data: "13" }]],
  }),
};
const trail3 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Смотреть трейлер", callback_data: "14" }]],
  }),
};
const trail4 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Смотреть трейлер", callback_data: "15" }]],
  }),
};
const trail5 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Смотреть трейлер", callback_data: "16" }]],
  }),
};
const trail6 = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Смотреть трейлер", callback_data: "17" }]],
  }),
};
const bal = {
  reply_markup: JSON.stringify({
    inline_keyboard: [[{ text: "Пополнить баланс", callback_data:'11'}]],
  }),
};

const start = async () => {
  try {
    await dataBase.connect();
  } catch (error) {
    console.log(error);
  }
  isNowDeposit = false;
  bot.setMyCommands([{ command: "/start", description: "Начать" }]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatid = msg.chat.id;
    const Users = dataBase.db().collection("Users");
    const userId = msg.from.id;
    userMSG = msg.from.username;

    if (
      typeof msg.from.last_name != "undefined" &&
      typeof msg.from.first_name != "undefined"
    ) {
      userName = msg.from.first_name + msg.from.last_name;
    } else if (typeof msg.from.last_name == "undefined") {
      userName = msg.from.first_name;
    } else if (typeof msg.from.first_name == "undefined") {
      userName = msg.from.last_name;
    } else {
      userName = "noName";
    }
    let user = await Users.findOne({ id: `${userId}` });
    if (!user) {
      await Users.insertOne({
        name: `${userName}`,
        id: `${userId}`,
        money: 0,
        phone: '',
      });
    }
    user = await Users.findOne({ id: `${userId}` });
    if (!user) {
      await Users.insertOne({
        name: `${userName}`,
        id: `${userId}`,
        money: 0,
        phone: '',
      });
    }
    if (isNowDeposit == true) {
      let amount = parseInt(text);
      if (isNaN(amount) || amount <= 0 || user.money + amount > 5000) {
         return bot.sendMessage(chatid, `Введите число, не больше 5000 ₽. Лимит баланса 5000 ₽.

Ваш баланс: ${user.money} ₽`);
      }
      isNowDeposit = false
      let newBalance = user.money + amount;
      await bot.sendMessage(chatid, `Баланс успешно пополнен. \nДоступно: ${newBalance} ₽`);
      return Users.updateOne({id: `${userId}`}, {$set: {money: newBalance}});
      }
    if (text === "/start") {
      return bot.sendMessage(
        chatid,
        `Привет ${msg.from.first_name}! Здесь можно удобно и быстро приобрести билеты в кинотеатры прямо из твоего любимого мессенджера.`,
        main
      );
    }
    if (text === "Фильмы") {
      return bot.sendMessage(chatid, "У нас в прокате:", films);
    }
    if (text === "Профиль") {
      return bot.sendMessage(
        chatid,
        `Ваш профиль:
Никнейм: ${msg.chat.username}
Имя: ${msg.from.first_name}
Баланс: ${user.money} ₽`, bal
      );
    }
    if (text === "Назад") {
      return bot.sendMessage(chatid, "У нас в прокате:", films);
    }
    return bot.sendMessage(
      chatid,
      "Я вас не понял, введите /start и выберите нужное"
    );
  });

  bot.on("callback_query", async (msg) => {
    const data = msg.data;
    const chatid = msg.message.chat.id;
    const Users = dataBase.db().collection("Users");
    user = await Users.findOne({id: `${msg.from.id}`})
    if (data === '11') {
      isNowDeposit = true;
      await bot.sendMessage(chatid, 'Введите сумму для пополнения:')
    }
    if (data === "morning") {
      return bot.sendMessage(chatid, "Билет успешно куплен.")
    }
    if (data === "1") {
      await bot.sendPhoto(chatid, "img/anch.jpg", trail);
      return bot.sendMessage(
        chatid,
        `Анчартед: на картах не значится (2022) ❘ 12+ ❘ 1 ч. 55 мин.\n
О фильме:
В центре сюжета история о том, как из соперников Нейтан Дрейк (Том Холланд) и Виктор «Салли» Салливан (Марк Уолберг) превратились в верных союзников и искателей приключений. Вместе им предстоит приоткрыть завесу над одной из величайших тайн в истории. Фильм основан на одной из самых продаваемых и высоко оценённый критиками компьютерных игр всех времен.\n
Страна: США
Жанр: боевик, приключения
Рейтинг: 6.9 ★ (Кинопоиск)
Премьера: 11 февраля 2022г.
В ролях: Том Холланд, Марк Уолберг, София Тейлор Али, Антонио Бандерас, Тати Габриэль`,
        buyTicket
      );
    }
    if (data === "2") {
      await bot.sendPhoto(chatid, "img/buka.jpg", trail1);
      return bot.sendMessage(
        chatid,
        `Бука. Мое любимое чудище (2021) ❘ 6+ ❘ 1 ч. 38 мин.\n
О фильме:
Скандал в царском семействе: своенравная принцесса Варвара сбежала из дворца и отправилась через лес на поиски прекрасного принца. Однако вместо заветной встречи с возлюбленным её берет в плен Бука, самый опасны разбойник королевства. Но очень быстро становится понятно, что бойкая принцесса готова превратить жизнь Буки в кошмар, лишь бы дойти до своей цели. Так неугомонная Варвара принимается наводить в лесу свои порядки.\n
Страна: Россия
Жанр: приключения
Продолжительность: 1 ч. 38 мин.
Рейтинг: 6.9 ★ (Кинопоиск)
Премьера: 28 апреля 2021г.
В ролях: —`,
        ticketBuka
      );
    }
    if (data === "3") {
      await bot.sendPhoto(chatid, "img/flash.jpg", trail2);
      return bot.sendMessage(
        chatid,
        `Флешбэк (2021) ❘ 18+ ❘ 1 ч. 54 мин.\n
О фильме:
Алекс Льюис, профессиональный киллер с репутацией, в какой-то момент пошел против ветра, и теперь вынужден отбиваться и от ФБР, и от криминального босса. Все потому, что убийца отказался нарушить свой моральный кодекс.\n
Страна: США
Жанр: боевик, триллер
Рейтинг: 6.9 ★ (Кинопоиск)
Премьера: 12 мая 2022г.
В ролях: Лиам Нисон, Моника Беллуччи, Гай Пирс, Рэй Стивенсон, Луис Мэндилор`, buyTicket
      );
    }
    if (data === "4") {
      await bot.sendPhoto(chatid, "img/kaz.jpg", trail3);
      return bot.sendMessage(
        chatid,
        `Казнь (2021) ❘ 18+ ❘ 2 ч. 18 мин.\n
О фильме:
В деле серийных убийств, которое расследовалось долгие 10 лет и было официально закрыто, появляется новое обстоятельство - выжившая жертва. Следователь по особо важным делам Исса Давыдов вынужден срочно выехать на место, чтобы разобраться в ситуации, ведь именно он осудил невиновных по этому делу. Ему предстоит исправить свою ошибку. Но Исса и не подозревает, что на самом деле это приглашение на казнь.\n
Страна: Россия
Жанр: триллер
Рейтинг: 6.9 ★ (Кинопоиск)
Премьера: 21 апреля 2021г.
В ролях: Нико Тавадзе, Юлия Снигирь, Виктория Толстоганова, Даниил Спиваковский, Евгений Ткачук`, buyTicket
      );
    }
    if (data === "5") {
      await bot.sendPhoto(chatid, "img/крут2.jpg", trail4);
      return bot.sendMessage(
        chatid,
        `Крутые яйца-2 (2021) ❘ 6+ ❘ 1 ч. 29 мин.\n
О фильме:
Тото и его друзья должны спасти его детёнышей из яиц, которых забрали для того, чтобы подать к столу.\n
Страна: Мексика
Жанр: комедия, мультфильм, приключения, фэнтези
Продолжительность: 1 ч. 29 мин.
Рейтинг: 6.9 ★ (Кинопоиск)
Премьера: 19 мая 2022г.
В ролях: Нико Тавадзе, Юлия Снигирь, Виктория Толстоганова, Даниил Спиваковский, Евгений Ткачук`, buyTicket
      );
    }
    if (data === "6") {
      await bot.sendPhoto(chatid, "img/ботан.jpg", trail5);
      return bot.sendMessage(
        chatid,
        `Ботан и Супербаба (2022) ❘ 16+ ❘ 1 ч. 25 мин.\n
О фильме:
Стеснительный парень-ботаник Иван, ученый из «Сколково», которого в школе все называли Калом, сокращенно от фамилии Калинин, для похода на встречу выпускников крадет девушку-андроида из научного центра и приделывает к ее кибертелу лицо первой красавицы школы. Чтобы выдать покорного робота за свою жену. Он думает, что успех e одноклассников теперь обеспечен, но есть одно «но». Андроид оказался спецразработкой для ведения боевых действий, которой только предстоит узнать, что такое доброта и человечность. Если удастся спастись от иностранных разведок, устроивших охоту за сверхсекретной разработкой…\n
Страна: Россия
Жанр: комедия
Рейтинг: 6.9 ★ (Кинопоиск)
Премьера: 12 мая 2022г.
В ролях: София Каштанова, Григорий Калинин`, buyTicket
      );
    }
    if (data === "7") {
      await bot.sendMessage(chatid, "Вы находитесь на главном меню:", main);
    }
    if (data === "8") {
      await bot.sendMessage(chatid, "Расписание:", schedule2);
    }
    if (data === "9") {
      await bot.sendMessage(chatid, "Фильмы:", films);
    }
    if (data === "ticketBuka") {
      return bot.sendMessage(chatid, "Выберите формат:", sched2)
    }
    if (data === "10") {
      return bot.sendMessage(
        chatid,
        (URL = "https://www.youtube.com/watch?v=oPDcRJVd3dU&t=1s"), backBtn
      );
    }
    if (data === "12") {
      return bot.sendMessage(
        chatid,
        (URL = "https://www.youtube.com/watch?v=28bBU7DPDPI"), backBtn
      );
    }
    if (data === "13") {
      return bot.sendMessage(
        chatid,
        (URL = "https://www.youtube.com/watch?v=q-bNkLPjnFU"), backBtn
      );
    }
    if (data === "14") {
      return bot.sendMessage(
        chatid,
        (URL = "https://www.youtube.com/watch?v=jF3YmtXyPPc"), backBtn
      );
    }
    if (data === "15") {
      return bot.sendMessage(
        chatid,
        (URL = "https://www.youtube.com/watch?v=FT-mSyyWejY"), backBtn
      );
    }
    if (data === "16") {
      return bot.sendMessage(
        chatid,
        (URL = "https://www.youtube.com/watch?v=dtCDDoGAEN8"), backBtn
      );
    }
  });
};
start();