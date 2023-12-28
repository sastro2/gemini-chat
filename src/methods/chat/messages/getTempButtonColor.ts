export const getTempButtonColor = (temperatureInput: number) => {
  if (temperatureInput >= 0 && temperatureInput <= 0.3) {
    return 'success';
  } else if (temperatureInput >= 0.4 && temperatureInput <= 0.7) {
    return 'warning';
  } else if (temperatureInput >= 0.8 && temperatureInput <= 1) {
    return 'error';
  } else {
    return 'success';
  }
};