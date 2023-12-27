import databaseInstance from '../../db';

export async function updateTemperatureById(id: number, temperature: number) {
  console.log(id, temperature, 'passeed to updateTemperatureById')
  await databaseInstance`
    Update histories
    SET temperature = ${temperature}
    WHERE id = ${id}
  `
};
