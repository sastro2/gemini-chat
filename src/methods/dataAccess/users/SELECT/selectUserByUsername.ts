import databaseInstance from '../../db';

export async function selectUserByUsername(username: string) {
  const user = await databaseInstance`
    SELECT
      *
    FROM users
    WHERE username = ${username}
  `

  return user
}