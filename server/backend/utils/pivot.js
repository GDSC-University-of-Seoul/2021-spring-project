export const districtPivot = (anomalies) => {
  let districts = {};
  for (let anomaly of anomalies) {
    let code = anomaly.district_code;
    if (!(code in districts)) {
      districts[code] = {
        district_code: anomaly.district_code,
        district_name: anomaly.district_name,
        parent_code: anomaly.parent_code,
      };
    }

    if (anomaly.anomaly_type == "폭행") {
      districts[code].assualt_count = anomaly.count;
    } else if (anomaly.anomaly_type == "싸움") {
      districts[code].fight_count = anomaly.count;
    } else if (anomaly.anomaly_type == "실신") {
      districts[code].swoon_count = anomaly.count;
    } else {
      districts[code].anomaly_count = anomaly.count;
    }
  }

  let res = [];
  for (let value of Object.values(districts)) {
    if (!("assualt_count" in value)) {
      value["assualt_count"] = "0";
    }
    if (!("fight_count" in value)) {
      value["fight_count"] = "0";
    }
    if (!("swoon_count" in value)) {
      value["swoon_count"] = "0";
    }
    res.push(value);
  }
  return res;
};

export const centerPivot = (anomalies) => {
  let centers = {};
  for (let anomaly of anomalies) {
    let center_id = anomaly.center_id;
    if (!(center_id in centers)) {
      centers[center_id] = {
        center_id: anomaly.center_id,
        center_name: anomaly.center_name,
        operation_type: anomaly.anomaly_type,
        operation_status: anomaly.anomaly_status,
        zip_code: anomaly.zip_code,
        address: anomaly.address,
        center_phone: anomaly.center_phone,
        fax: anomaly.fax,
        web_page: anomaly.web_page,
        latitude: anomaly.latitude,
        longitude: anomaly.longitude,
        district_code: anomaly.district_code,
        district_name: anomaly.district_name,
      };
    }

    if (anomaly.anomaly_type == "폭행") {
      centers[center_id].assualt_count = anomaly.count;
    } else if (anomaly.anomaly_type == "싸움") {
      centers[center_id].fight_count = anomaly.count;
    } else if (anomaly.anomaly_type == "실신") {
      centers[center_id].swoon_count = anomaly.count;
    } else {
      centers[center_id].anomaly_count = anomaly.count;
    }
  }

  let res = [];
  for (let value of Object.values(centers)) {
    if (!("assualt_count" in value)) {
      value["assualt_count"] = "0";
    }
    if (!("fight_count" in value)) {
      value["fight_count"] = "0";
    }
    if (!("swoon_count" in value)) {
      value["swoon_count"] = "0";
    }
    res.push(value);
  }
  return res;
};
