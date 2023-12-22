import { NextApiRequest, NextApiResponse } from 'next';
import { insertUser } from '../../dataAccess/users/INSERT/insertUser';

const addUser = async(req: NextApiRequest, res: NextApiResponse) => {
  insertUser('test', 'test', 'test');

  res.send('hi');
};

export default addUser;