import databaseInstance from '../../db';

export async function selectAllUsers() {
  const users = await databaseInstance`
    select
      *
    from users
  `

  return users
};