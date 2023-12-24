import { GoogleGenerativeAI } from '@google/generative-ai';
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../../_types/Message';

type StartGeminiChatReqBody = {
  history: Message[];
  message: string;
  temp: number;
};

type StartGeminiChatNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: StartGeminiChatReqBody;
};

type StartGeminiChatResponseBody = {
  message: string;
  auth: boolean;
}

const AI = new GoogleGenerativeAI(process.env.GOOGLE_AI_APIKEY!);

const handleMessageGemini = async(req: StartGeminiChatNextApiReq, res: NextApiResponse<StartGeminiChatResponseBody>) => {
    if(req.method === 'POST'){
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'application/json');

      const cookies = parse(req.headers.cookie || '' );
      const accessToken = cookies['accessToken'];

      if(!accessToken || accessToken !== '') {res.status(401).send({auth: false, message: ''}); return;};

  	  const model = AI.getGenerativeModel({ model: 'gemini-pro' });

      const chat = model.startChat({
        history: [...req.body.history],
        generationConfig: {
          temperature: req.body.temp
        }
      });

      const aiRes = await chat.sendMessageStream(req.body.message);

      res.send({auth: true, message: (await aiRes.response).text()})
    }else{
      res.status(405).end();
    };
};

export default handleMessageGemini;