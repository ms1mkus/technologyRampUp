const setTimeToZero = (day: Date): void => {
  day.setUTCHours(48);
  day.setUTCMinutes(0);
  day.setUTCSeconds(0);
  day.setUTCMilliseconds(0);
};

export default setTimeToZero;
