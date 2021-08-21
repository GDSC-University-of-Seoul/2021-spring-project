export default async (listSize, page, range) => {
  const rangeSize = 10;

  const currentPage = (parseInt(range) - 1) * 10 + parseInt(page);
  const offset = (currentPage - 1) * listSize;

  return offset;
};
