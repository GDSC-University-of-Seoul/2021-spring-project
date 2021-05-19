import xml2js from "xml2js";

const xmlParser = (xmlData) => {
  const parser = new xml2js.Parser();

  return new Promise((resolve, reject) => {
    parser.parseString(xmlData, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default xmlParser;
