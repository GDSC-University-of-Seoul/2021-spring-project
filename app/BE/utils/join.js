import ChildCareCenter from "../../DB/models/transform/childCareCenter";
import CCTV from "../../DB/models/transform/cctv";
import Video from "../../DB/models/transform/video";
import Anomaly from "../../DB/models/transform/anomaly";

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
