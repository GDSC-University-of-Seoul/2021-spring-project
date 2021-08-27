import { useCallback, useEffect, useState } from "react";

function useAsync(callback, deps = [], dataAttr) {
  const [asyncData, setAsyncData] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await callback();

    setAsyncData(dataAttr ? data[dataAttr] : data);
  }, [callback, dataAttr]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [asyncData, fetchData];
}
export default useAsync;
