const query = require("../database/db_query")
const dbClient = require("../database/dbconfig");

exports.getAllConge = (req, res) => {

    sql = `SELECT * from conge `;
    query.sql_request(sql, null, res, true);
};

exports.getCongeByUser = (req, res) => {
    const id = req.params.id;
    sql = `SELECT * from conge WHERE id_user = ${id}`;
    query.sql_request(sql, null, res, true);
};

exports.demandeConge = (req, res) => {

    const { id_user, date_d, date_f, type_conge, duree } = req.body;

    sql = `SELECT *  FROM users  WHERE id_user = ${id_user}`;
    query.sql_request(sql, null, res, true);
    if (type_conge === "paye") {
        dbClient.query(sql, (err, rows) => {

            if (rows[0].solde_conge > 0) {
                var day1 = new Date(date_d);
                var day2 = new Date(date_f);
                const utc1 = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
                const utc2 = Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());
                const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24))
                console.log(days)
                console.log(rows[0].solde_conge - days)
                if (rows[0].solde_conge - days > 0) {
                    values = [[[id_user, date_d, date_f, type_conge]]]
                    //VALUES ('" + req.body.key + "', '" + domain_id +"');"
                    const sql = "INSERT INTO conge (id_user, date_d, date_f, type_conge) VALUES ?";
                    query.sql_request(sql, values, res);
                } else {
                    console.log("you can't")
                }
            }
        });
    }
    else if (type_conge === "maternale") {

        dbClient.query(sql, (err, rows) => {

            if (rows[0].etat_maternite === 0) {

                values = [[[id_user, date_d, date_f, type_conge]]]
                //VALUES ('" + req.body.key + "', '" + domain_id +"');"
                const sql = "INSERT INTO conge (id_user, date_d, date_f, type_conge) VALUES ?";
                query.sql_request(sql, values, res);

            } else {
                console.log("you can't")
            }
        });
    }
    else if (type_conge === "paternale") {
        dbClient.query(sql, (err, rows) => {

            if (rows[0].etat_paternite === 0) {

                values = [[[id_user, date_d, date_f, type_conge]]]
                //VALUES ('" + req.body.key + "', '" + domain_id +"');"
                const sql = "INSERT INTO conge (id_user, date_d, date_f, type_conge) VALUES ?";
                query.sql_request(sql, values, res);

            } else {
                console.log("you can't")
            }
        });
    }
    else if (type_conge === "rtt") {
        dbClient.query(sql, (err, rows) => {
            //console.log(rows[0].nbr_heurs_travail)
            if (rows[0].nbr_heurs_travail >= 35) {
                if (rows[0].nbr_jours_rtt - duree > 0) {
                    values = [[[id_user, date_d, date_f, type_conge, duree]]]
                    //VALUES ('" + req.body.key + "', '" + domain_id +"');"
                    const sql = "INSERT INTO conge (id_user, date_d, date_f, type_conge,duree) VALUES ?";
                    query.sql_request(sql, values, res);
                }
                else {
                    console.log("you can't")
                }
            } else {
                console.log("you can't")
            }
        });
    }
};

exports.GetcongeNonVerifier = (req, res) => {

    const etat_conge = 0;
    sql = `SELECT * from conge WHERE etat_conge = ${etat_conge}`;
    query.sql_request(sql, null, res, true);
};

exports.Accepter = (req, res) => {
    const {id_conge,  id_user, date_d, date_f, type_conge, duree } = req.body;
    if (type_conge === "paye") {
        var day1 = new Date(date_d);
        var day2 = new Date(date_f);
        const utc1 = Date.UTC(day1.getFullYear(), day1.getMonth(), day1.getDate());
        const utc2 = Date.UTC(day2.getFullYear(), day2.getMonth(), day2.getDate());
        const days = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24))
        console.log(days)
        // update etat conge 
        
        //const sql = `UPDATE conge SET etat_conge=2 WHERE id_conge= ${id_conge}  `;

       const sql = `UPDATE users u, conge c SET u.solde_conge=solde_conge - ${days} , c.etat_conge=2 WHERE c.id_conge= ${id_conge} and u.id_user= ${id_user}`;
        
        query.sql_request(sql, res);     
        //send mail  
    }
    

    else if (type_conge === "maternale") {

        const sql = `UPDATE users u, conge c SET u.etat_maternite=1 , c.etat_conge=2 WHERE c.id_conge= ${id_conge} and u.id_user= ${id_user}`;
        
        query.sql_request(sql, res);
     }
    else if (type_conge === "paternale") {
        const sql = `UPDATE users u, conge c SET u.etat_paternite=1 , c.etat_conge=2 WHERE c.id_conge= ${id_conge} and u.id_user= ${id_user}`;
        
        query.sql_request(sql, res);
     }
    else if (type_conge === "rtt") { 
        const sql = `UPDATE users u, conge c SET u.nbr_jours_rtt=nbr_jours_rtt-${duree}, c.etat_conge=2 WHERE c.id_conge= ${id_conge} and u.id_user= ${id_user}`;
        
        query.sql_request(sql, res);
     }

    }



;

exports.refuser = (req, res) => {
    const sql = `UPDATE conge SET etat_conge=2 WHERE id_conge= ${id_conge}  `;

};