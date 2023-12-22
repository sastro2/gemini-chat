import { NextApiRequest, NextApiResponse } from 'next';
import { selectAllUsers } from '../../dataAccess/users/SELECT/selectAllUsers';

const getAllUsers = async(req: NextApiRequest, res: NextApiResponse) => {
  selectAllUsers();

  res.send('hi');
};

export default getAllUsers;