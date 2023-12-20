import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../_types/Message';

type startGeminiChatReqBody = {
  history: Message[];
  message: string;
  temp: number;
};

type startGeminiChatNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: startGeminiChatReqBody;
};

const AI = new GoogleGenerativeAI(process.env.GOOGLE_AI_APIKEY!);


const handleMessageGemini = async(req: startGeminiChatNextApiReq, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'no-cache');

    if(req.method === 'POST'){
      res.setHeader('Content-Type', 'application/json');
  	  const model = AI.getGenerativeModel({ model: 'gemini-pro' });

      const chat = model.startChat({
        history: req.body.history,
        generationConfig: {
          temperature: req.body.temp
        }
      });

      const aiRes = await chat.sendMessageStream(req.body.message);

      for await(const x of aiRes.stream){
      console.log(x.text())
        res.write(x.text());
      };

      res.end();
    }else{
      res.status(405).end();
    };
};

export default handleMessageGemini;