const dbClient = require("../database/dbconfig");
const bcrypt = require("bcrypt");
const query = require("../database/db_query")


exports.register = (req, res) => {

  const { nom, prenom, age, tel, adr, email,password ,type_u } = req.body;
  bcrypt.hash(password, 10, function (err, hash) {
   const values = [[[nom, prenom, age, tel, adr, email, hash,type_u]]];
    const sql = "INSERT INTO users (nom, prenom, age, tel, adr, email,password,type_u) VALUES ?";
     query.sql_request(sql, values, res);
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  let sql =  `SELECT DISTINCT * from users where email=? ` ;

  dbClient.query(sql, [email], (err, rows) => {
    if (err) {
      return res.status(500).json({
        err: true,
        message: "An error occured in server !  ",
      });
    }
    if (rows.length == 1) {
      bcrypt.compare(password, rows[0].password, (err, same) => {
        if (err) {
          return res.status(500).json({
            err: true,
            message: "An error occured in server !  ",
          });
        }
        if (same) {
          return res.status(200).json({
            err: false,
            message: "Auth successfull !",
            user:rows[0]
          });

          
        } else {
          return res.status(404).json({
            err: true,
            message: "Auth failed ! Check email AND/OR password ",
          });
        }
      });
    } else {
      return res.status(404).json({
        err: true,
        message: "Auth failed ! Check email AND/OR password ",
      });
    }
  });


};
// get user b id w update user 
exports.get_user_by_id = (req, res) => {
  
  const  id  = req.params.id;

    sql = `SELECT * FROM users WHERE id_users = ${id}`;
    
  query.sql_request(sql, null, res, true);
};

exports.update = (req, res) => {
  const { nom, prenom,age, tel, adr, email } = req.body;
  const  id_users  = req.params.id  ;

  const values = [nom, prenom,age, tel, adr, email];
  const sql =
  `UPDATE users SET nom = ?, prenom = ?,age = ?,tel = ?,adr = ?,email = ? WHERE id_users = ${id_users} `;
  query.sql_request(sql, values, res);
};
//