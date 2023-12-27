import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../../_types/Message';
import { validateAccessOptions } from '../../../../methods/server/validateAccessOptions';

type StartGeminiChatReqBody = {
  history: Message[];
  message: string;
  temp: number;
  username: string;
};

type StartGeminiChatNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: StartGeminiChatReqBody;
};

type StartGeminiChatResponseBody = {
  message: string;
  auth: boolean;
};

const AI = new GoogleGenerativeAI(process.env.GOOGLE_AI_APIKEY!);

const handleMessageGemini = async(req: StartGeminiChatNextApiReq, res: NextApiResponse<StartGeminiChatResponseBody>) => {
    if(req.method === 'POST'){
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'application/json');

      await validateAccessOptions(req.headers.cookie, res, false);

  	  const model = AI.getGenerativeModel({ model: 'gemini-pro' });

      let aiRes;

      try{
        const chat = model.startChat({
          history: [...req.body.history],
          generationConfig: {
            temperature: req.body.temp
          }
        });

        aiRes = await chat.sendMessageStream(req.body.message)
      }catch(error){
        //log error to db
        res.send({auth: true, message: 'Sorry, we have detected an unsafe response from the AI. Please try again with a different message or change the safety settings on your profile page.'})
        return;
      };

      res.send({auth: true, message: (await aiRes.response).text()? (await aiRes.response).text(): 'Sorry, we have detected an unsafe response from the AI. Please try again with a different message or change the safety settings on your profile page.'});
      return;
    }else{
      res.status(405).end();
      return;
    };
};

export default handleMessageGemini;