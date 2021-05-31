import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LineGraph from "../components/LineGraph";
import { fetchData } from "../modules/mapbox";

function LineGraphContainer() {
  const {
    loading,
    data: { districtsGeojson, districts },
    error,
  } = useSelector((state) => state.mapboxReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!districtsGeojson && !districts && !error) {
      dispatch(fetchData());
    }
  }, [districtsGeojson, districts, error, dispatch]);

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러발생!</div>;

  const chartData = [{}];

  return <LineGraph data={JSON.stringify(chartData)} />;
}

export default LineGraphContainer;
