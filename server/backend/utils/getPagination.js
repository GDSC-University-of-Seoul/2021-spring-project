export default async (listSize, page, range) => {
  const rangeSize = 10;

  const current = (range - 1) * rangeSize + page;
  const offset = (current - 1) * listSize;
  const limit = current * listSize;

  return { offset, limit };
};
