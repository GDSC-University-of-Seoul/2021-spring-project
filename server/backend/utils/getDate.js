export default () => {
  let endDate = new Date();
  let startDate = new Date();

  endDate.setHours(endDate.getHours() + 9);
  startDate.setHours(startDate.getHours() + 9);
  startDate.setDate(endDate.getDate() - 60);

  endDate = endDate.toISOString().slice(0, 19).replace("T", " ");
  startDate = startDate.toISOString().slice(0, 19).replace("T", " ");

  return { start: startDate, end: endDate };
};
