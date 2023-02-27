const createError = require("http-errors");
const memberModel = require("../models/memberModel");
const commonHelper = require("../helper/common");

exports.getAllMember = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const result = await memberModel.select({ offset, limit });

    // pagination
    const {
      rows: [count],
    } = await memberModel.countMember();
    const totalData = parseInt(count.total);
    const totalPage = Math.ceil(totalData / limit);

    // commonHelper.response(res, result, 200, "data berhasil di dapat");
    res.status(200).json({
      pagination: {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      },
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};
exports.insertMember = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const data = { id, name };
    await memberModel.insert(data);
    commonHelper.response(res, data, 201, "data berhasil di tambahkan");
  } catch (err) {
    console.log(err);

    next(new createError.InternalServerError());
  }
};
exports.updateMember = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const data = { id, name };
    await memberModel.update(id, name);
    commonHelper.response(res, data, 200, "data berhasil di update");
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};
exports.deleteMember = async (req, res, next) => {
  try {
    const id = req.params.id;
    await memberModel.deleteCategory(id);
    // commonHelper.response(res, data, 200, "data berhasil di hapus");
    res.json({
      message: `data id ${id} berhasil di hapus`,
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};
