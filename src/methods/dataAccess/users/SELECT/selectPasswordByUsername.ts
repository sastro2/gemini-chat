import databaseInstance from '../../db';

export async function selectPasswordByUsername(username: string): Promise<string | null> {
  const result = await databaseInstance`
    SELECT
      password
    FROM users
    WHERE username = ${username}
  `

  if (result.length > 0) {
    const { password } = result[0];
    if(typeof password !== 'string') return null;

    return password;
  } else {
    return null;
  }
}