import ChildCareCenter from "../database/models/child-care-center";
import FacilityArea from "../database/models/facility-area";
import CCTV from "../database/models/cctv";
import Video from "../database/models/video";
import Anomaly from "../database/models/anomaly";

export const districtJoin = {
  model: ChildCareCenter,
  attributes: [],
  include: {
    model: FacilityArea,
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
  },
};
