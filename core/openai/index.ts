import {Configuration, OpenAIApi} from "openai"
import {User} from "node-telegram-bot-api"

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function openaiTelegramConnector(promt: string, user?: User): Promise<string> {
	if (!user) return "Не удалось определить пользователя"

	console.log(promt, user.id, user.username)

	const chatCompletion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo-16k-0613",
		messages: [{role: "user", content: promt}],
		max_tokens: 1000,
	})

	const result = chatCompletion.data.choices[0].message?.content
	console.log(promt, user.id, user.username, result)

	if (!result) return "Error"
	return result
}
