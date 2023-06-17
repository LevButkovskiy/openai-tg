import {Configuration, OpenAIApi} from "openai"
import {User} from "node-telegram-bot-api"

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function openaiTelegramConnector(promt: string, user?: User): Promise<string> {
	if (!user) return "Не удалось определить пользователя"

	console.log(promt, user.id, user.username)

	const chatCompletion = await openai
		.createChatCompletion({
			model: "gpt-3.5-turbo-0613",
			messages: [{role: "user", content: promt}],
			max_tokens: 1000,
		})
		.then((res) => res.data.choices[0].message?.content)
		.catch((e: Error) => {
			console.error("openaiTelegramConnector ERROR", e)
			return e.message
		})

	console.log(promt, user.id, user.username, chatCompletion)

	if (!chatCompletion) return "Error"
	return chatCompletion
}
