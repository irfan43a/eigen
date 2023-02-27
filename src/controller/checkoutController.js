const createError = require("http-errors");
const checkoutModel = require("../models/checkoutModel");
const commonHelper = require("../helper/common");

exports.getAllCheckout = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const result = await checkoutModel.select({ offset, limit });

    // pagination
    const {
      rows: [count],
    } = await checkoutModel.countCheckout();
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
      data: result.rows,
    });
  } catch (err) {
    console.log(err);
    next(new createError.InternalServerError());
  }
};