import { GoogleGenerativeAI } from '@google/generative-ai';
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '../../../../_types/Message';
import { selectAccessTokenByUsername } from '../../dataAccess/users/SELECT/selectAccessTokenByUsername';

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

type AccessOptions = {
  accessToken: string;
  username: string;
};

const AI = new GoogleGenerativeAI(process.env.GOOGLE_AI_APIKEY!);

const handleMessageGemini = async(req: StartGeminiChatNextApiReq, res: NextApiResponse<StartGeminiChatResponseBody>) => {
    if(req.method === 'POST'){
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Content-Type', 'application/json');

      const cookies = parse(req.headers.cookie || '' );
      const stringifiedAccessOptions = cookies['accessOptions'];
      const accessOptions: AccessOptions = JSON.parse(stringifiedAccessOptions);

      if(!accessOptions.accessToken || accessOptions.accessToken !== await selectAccessTokenByUsername(accessOptions.username)) {res.status(401).send({auth: false, message: ''}); return;};

  	  const model = AI.getGenerativeModel({ model: 'gemini-pro' });

      let aiRes;

      console.log(req.body.history);

      try{
        const chat = model.startChat({
          history: [...req.body.history],
          generationConfig: {
            temperature: req.body.temp
          }
        });

        aiRes = await chat.sendMessageStream(req.body.message)
      }catch(error){
        console.log(error)
        res.send({auth: true, message: 'Sorry, we have detected an unsafe response from the AI. Please try again with a different message or change the safety settings on your profile page.'})
        return;
      };

      res.send({auth: true, message: (await aiRes.response).text()});
      return;
    }else{
      res.status(405).end();
      return;
    };
};

export default handleMessageGemini;