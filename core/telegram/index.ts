import TelegramBot from "node-telegram-bot-api"
import {openaiTelegramConnector} from "../openai"

const token = process.env.TELEGRAM_TOKEN

if (!token) throw Error("Telegram token not defined")

const bot = new TelegramBot(token, {polling: true})

const OPENAI_ENABLED = process.env.OPENAI_ENABLED

bot.on("message", (msg) => {
	const chatId = msg.chat.id

	if (!msg.text) return bot.sendMessage(chatId, "Ничего не введено")
	if (msg.text === "/start") return bot.sendMessage(chatId, "Добро пожаловать в бота! \n Напишите ваш запрос")

	if (!OPENAI_ENABLED) return bot.sendMessage(chatId, "ChatGPT пока отключен")

	openaiTelegramConnector(msg.text, msg.from).then((result) => {
		bot.sendMessage(chatId, result)
	})
})

console.log("BOT STARTED")
