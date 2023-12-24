import databaseInstance from '../../db';

export async function selectAccessTokenByUsername(username: string): Promise<string | null> {
  const result = await databaseInstance`
    SELECT
      accessToken
    FROM users
    WHERE username = ${username}
  `

  if (result.length > 0) {
    const { accesstoken } = result[0];
    return accesstoken;
  } else {
    return null;
  }
};