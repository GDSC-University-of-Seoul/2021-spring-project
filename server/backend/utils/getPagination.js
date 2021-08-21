export default async (listSize, page, range) => {
  const rangeSize = 10;

  const currentPage = (range - 1) * rangeSize + page;
  const offset = (currentPage - 1) * listSize;

  return offset;
};
