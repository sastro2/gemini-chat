export const getTempButtonSize = (temperatureInput: number) => {
  if (temperatureInput >= 0 && temperatureInput <= 0.3) {
    return 'small';
  } else if (temperatureInput >= 0.4 && temperatureInput <= 0.7) {
    return 'medium';
  } else if (temperatureInput >= 0.8 && temperatureInput <= 1) {
    return 'large';
  } else {
    return 'small';
  }
};