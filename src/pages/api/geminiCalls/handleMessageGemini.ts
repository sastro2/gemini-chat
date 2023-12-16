import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../_types/Message';

type startGeminiChatReqBody = {
  history: Message[];
  message: string;
  temp: number;
}

type startGeminiChatNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: startGeminiChatReqBody;
}

const AI = new GoogleGenerativeAI(process.env.GOOGLE_AI_APIKEY!);

const handleMessageGemini = async(req: startGeminiChatNextApiReq, res: NextApiResponse) => {
    if(req.method === 'POST'){
      res.setHeader('Content-Type', 'application/json');
  	  const model = AI.getGenerativeModel({ model: 'gemini-pro' });

      const chat = model.startChat({
        history: req.body.history,
        generationConfig: {
          temperature: req.body.temp
        }
      });

      const stream = await chat.sendMessage(req.body.message);

      res.send({text: stream.response.text()})
    }else{
      res.status(405).end();
    };
};

export default handleMessageGemini;