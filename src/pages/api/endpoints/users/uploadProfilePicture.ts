import { NextApiRequest, NextApiResponse } from 'next';
import { DefaultApiResponseBody } from '../../../../_types/DefaultApiResponseBody';
import { insertError } from '../../../../methods/dataAccess/errors/INSERT/insertError';
import { updateProfileImage } from '../../../../methods/dataAccess/users/UPDATE/updateProfileImage';
import { confirmAccessClient } from '../../../../methods/server/confirmAccessClient';

type UploadPfpReqBody = {
  profileImg: string;
};

type UploadPfpNextApiReq = Omit<NextApiRequest, 'body'> & {
  body: UploadPfpReqBody;
};

export type UploadPfpResponseBody = DefaultApiResponseBody & {
  profileImage?: Buffer;
};

export const config = {
  api: {
    bodyParser: false
  }
};

const UploadPfp = async(req: UploadPfpNextApiReq, res: NextApiResponse<UploadPfpResponseBody>) => {
  const resBody: UploadPfpResponseBody = {auth: false, profileImage: Buffer.from(''), error: {errorCode: 0, errorId: 0}};

  if(req.method !== 'POST') {res.status(405).send(resBody); return;}

  const userId: number = await confirmAccessClient(req.headers.cookie, res, resBody);
  console.log()
  const pfp = await updateProfileImage(req.body as unknown as Buffer, userId);

  if(!pfp) {
    const id =await insertError(30, 'Profile image could not be uploaded.')
    resBody.error.errorCode = 30;
    resBody.error.errorId = id || 0;

    res.status(500).send(resBody);
    return;
  }

  resBody.profileImage = pfp;
  res.status(200).send(resBody);
  return;
};

export default UploadPfp;