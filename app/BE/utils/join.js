import ChildCareCenter from "../../DB/transpile/childCareCenter";
import CCTV from "../../DB/transpile/cctv";
import Video from "../../DB/transpile/video";
import Anomaly from "../../DB/transpile/anomaly";

export const districtJoin = {
  model: ChildCareCenter,
  attributes: [],
  include: {
    model: CCTV,
    attributes: [],
    include: {
      model: Video,
      attributes: [],
      include: {
        model: Anomaly,
        attributes: [],
      },
    },
  },
};
