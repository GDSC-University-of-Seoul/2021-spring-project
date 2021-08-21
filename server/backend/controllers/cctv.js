import { Sequelize } from "../../database/models/transform";
import CCTVRepository from "../repositories/cctv";

const create = async (req, res, next) => {
  const { center_id, cctv_name, cctv_mac, install_date, quality } = req.body;

  try {
    const cctv = await CCTVRepository.create(
      center_id,
      cctv_name,
      cctv_mac,
      install_date,
      quality
    );
    res.status(201).json(cctv);
  } catch (err) {
    if (err instanceof Sequelize.UniqueConstraintError) {
      res.status(409).send({ message: err.errors });
    } else {
      next(err);
    }
  }
};

const findAll = async (req, res, next) => {
  try {
    const { list_size, page, range } = req.query;
    const cctv = await CCTVRepository.findAll(list_size, page, range);
    res.json(cctv);
  } catch (err) {
    next(err);
  }
};

const updateByCctvMac = async (req, res, next) => {
  try {
    const { cctv_name, install_date, uninstall_date, quality } = req.body;
    const cctv = CCTVRepository.updateByCctvMac(
      req.params.cctv_mac,
      cctv_name,
      install_date,
      uninstall_date,
      quality
    );
    res.json(cctv);
  } catch (err) {
    next(err);
  }
};

const deleteByCctvMac = async (req, res, next) => {
  try {
    CCTVRepository.deleteByCctvMac(req.params.cctv_mac);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export default { create, findAll, updateByCctvMac, deleteByCctvMac };
