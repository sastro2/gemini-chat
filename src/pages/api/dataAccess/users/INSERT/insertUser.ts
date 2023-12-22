import databaseInstance from '../../db';

export async function insertUser(username: string, password: string, salt: string) {
  const users = await databaseInstance`
    INSERT INTO users(username, password, created, salt)
    VALUES(${username}, ${password}, NOW(), ${salt})
  `

  return users;
};