import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { Message } from '../../../../_types/Message';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
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

export type StartGeminiChatResponseBody = DefaultApiResponseBody & {
  message?: string;
};

const AI = new GoogleGenerativeAI(process.env.GOOGLE_AI_APIKEY!);

const handleMessageGemini = async(req: StartGeminiChatNextApiReq, res: NextApiResponse<StartGeminiChatResponseBody>) => {
    if(req.method === 'POST'){
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'application/json');

      const resBody: StartGeminiChatResponseBody = {auth: false, error: {errorCode: 0, errorId: 0}, message: ''};

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
      }catch(error: unknown){
        const testError = error as {message: string};
        const errorId = await insertError(10, typeof testError.message === 'string'? '': 'Unknown error.');

        resBody.auth = true;
        resBody.message = 'Sorry, we are having trouble communicating with Gemini please try sending your message again.';
        resBody.error = {errorCode: 10, errorId: errorId? errorId: 0};
        res.send(resBody);
        return;
      }


      resBody.auth = true;

      if((await aiRes.response).candidates){
        resBody.message = (await aiRes.response).text();
        res.send(resBody);
        return;
      }

      const errorId = await insertError(11, 'AI response was not safe.');

      resBody.message = 'Sorry, we have detected an unsafe response from Gemini. Please try again with a different message or change the safety settings on your profile page.';
      resBody.error = {errorCode: 11, errorId: errorId? errorId: 0};
      res.send(resBody);
      return;
    }else{
      res.status(405).end();
      return;
    }
};

export default handleMessageGemini;