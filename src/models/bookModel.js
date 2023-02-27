const pool = require("../config/db");

const select = ({ limit, offset }) => {
  return pool.query("SELECT * FROM book ORDER BY book_id ASC LIMIT $1 OFFSET $2", [limit, offset]);
};
const countMember = () => {
    return pool.query("SELECT COUNT (*) AS total FROM member");
  };

module.exports = {
    select,
    countMember
  };