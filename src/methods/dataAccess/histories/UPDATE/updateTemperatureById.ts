import databaseInstance from '../../db';

export async function updateTemperatureById(id: number, temperature: number) {
  await databaseInstance`
    Update histories
    SET temperature = ${temperature}
    WHERE id = ${id}
  `
};
