import databaseInstance from '../../db';

export async function selectUserIdByUsername(username: string): Promise<number | null> {
  const result = await databaseInstance`
    SELECT
      id
    FROM users
    WHERE username = ${username}
  `

  if(result.length > 0) {
    const { id } = result[0];
    return id;
  } else {
    return null;
  }
};