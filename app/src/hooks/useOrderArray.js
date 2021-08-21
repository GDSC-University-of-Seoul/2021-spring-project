import { useState } from "react";

function useOrderArray(start, end) {
  const [arr, setArr] = useState(() => {
    const orderArr = [];
    for (let i = start; i <= end; i++) orderArr.push(i);
    return orderArr;
  });

  // start ~ end까지 순차적인 원소를 저장한 배열 설정
  const setOrderArr = (start, end) => {
    const orderArr = [];
    for (let i = start; i <= end; i++) orderArr.push(i);

    setArr(orderArr);
  };

  return [arr, setOrderArr];
}

export default useOrderArray;
