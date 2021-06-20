import ChildCareCenter from "../../DB/models/child-care-center";
import FacilityArea from "../../DB/models/facility-area";
import CCTV from "../../DB/models/cctv";
import Video from "../../DB/models/video";
import Anomaly from "../../DB/models/anomaly";

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
