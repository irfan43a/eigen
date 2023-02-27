const pool = require("../config/db");

const select = ({ limit, offset }) => {
  return pool.query("SELECT * FROM member ORDER BY id ASC LIMIT $1 OFFSET $2", [limit, offset]);
};
const insertMember = ({ id, name }) => {
  return pool.query("INSERT INTO member(id,name)VALUES($1,$2)", [id, name]);
};
const updateMember = (id, name) => {
  return pool.query("UPDATE member SET name = $1 WHERE id = $2", [name, id]);
};
const deleteMember = (id) => {
  return pool.query("DELETE FROM member WHERE id = $1", [id]);
};
const countMember = () => {
  return pool.query("SELECT COUNT (*) AS total FROM member");
};
module.exports = {
  select,
  insertMember,
  updateMember,
  deleteMember,
  countMember,
};
