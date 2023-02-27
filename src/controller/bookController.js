const createError = require("http-errors");
const bookModel = require("../models/bookModel");
const commonHelper = require("../helper/common");

exports.getAllBook = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const result = await bookModel.select({ offset, limit });

    // pagination
    const {
      rows: [count],
    } = await bookModel.countMember();
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