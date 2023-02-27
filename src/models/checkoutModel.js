const pool = require("../config/db");

const select = ({ limit, offset }) => {
  return pool.query("SELECT * FROM checkout ORDER BY id_checkout ASC LIMIT $1 OFFSET $2", [limit, offset]);
};
const countCheckout = () => {
    return pool.query("SELECT COUNT (*) AS total FROM member");
  };

module.exports = {
    select,
    countCheckout
  };