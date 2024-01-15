import databaseInstance from '../../db';

export async function updateProfileImage(profileImage: Buffer, userId: number): Promise<Buffer> {
  const result = await databaseInstance`
    UPDATE public.users
    SET "profilePicture"= ${profileImage}
    WHERE id = ${userId}
    RETURNING "profilePicture"
  `

  if(Buffer.isBuffer(result[0].profilePicture)) {
    return result[0].profilePicture;
  }

  return Buffer.from('');
}