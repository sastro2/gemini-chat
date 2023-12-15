import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextApiRequest, NextApiResponse } from 'next';

type startGeminiChatReqBody = {

}

type startGeminiChatNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: startGeminiChatReqBody;
}

const AI = new GoogleGenerativeAI(process.env.GOOGLE_AI_APIKEY!);

export default function handleStartGeminiChat(req: startGeminiChatNextApiReq, res: NextApiResponse) {
  	const model = AI.getGenerativeModel({ model: 'gemini-pro' });

    const chat = model.startChat({
      history: [

      ],
      generationConfig: {}
    })
}