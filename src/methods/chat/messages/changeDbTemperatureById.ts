export const changeDbTemperatureById = async(id: number, temperature: number) => {
  console.log('hi')
  await fetch(`http://localhost:3000/api/endpoints/histories/changeTemperatureById`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: id,
      historyTemperature: temperature
    })
  });
};