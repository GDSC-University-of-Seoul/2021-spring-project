import ChildCareCenter from "../../database/models/transform/childCareCenter";
import CCTV from "../../database/models/transform/cctv";
import Video from "../../database/models/transform/video";
import Anomaly from "../../database/models/transform/anomaly";

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
