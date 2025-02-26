const fs = require('fs');
const mysql = require('mysql2');
const { isNativeError } = require('util/types');
let conf = JSON.parse(fs.readFileSync('public/conf.json'));
conf.ssl = {
    ca: fs.readFileSync(__dirname + '/ca.pem')
}
const connection = mysql.createConnection(conf);


const executeQuery = (sql) => {
   return new Promise((resolve, reject) => {      
         connection.query(sql, function (err, result) {
            if (err) {
               console.error(err);
               reject();     
            }   
            console.log('done');
            resolve(result);         
      });
   })
}

const database = {
   createTableType: async() => {
      return await executeQuery(`
         CREATE TABLE IF NOT EXISTS type (
         id INT PRIMARY KEY AUTO_INCREMENT,
         name varchar(20)
         )
      `);
    },
    createTableBooking: async() => {
      return await executeQuery(`
         CREATE TABLE IF NOT EXISTS booking (
         id int PRIMARY KEY AUTO_INCREMENT,
         idType int NOT NULL,
         date DATE NOT NULL,
         hour INT NOT NULL,
         name VARCHAR(50),
         FOREIGN KEY (idType) REFERENCES type(id) )
      `);
    },

   insert: (book) => {
      //INSERIMENTO ELEMENTO NELLA TABELLA
      let sql = `
         INSERT INTO booking(idType, date, hour, name)
         VALUES ('${book.idType}', '${book.date}', '${book.hour}', '${book.name}')
           `;
      return executeQuery(sql)
    },

   select: () => {
      const sql = `SELECT id, name, idType, date, hour FROM booking`;
      return executeQuery(sql);
    },

   selectTips: () => {
      const sql = `SELECT id, name FROM type`;
      return executeQuery(sql);
    },

   delete: (id) => {
      //ELIMINAZIONE ELEMENTO DALLA TABELLA
      let sql = `
      DELETE FROM booking
      WHERE id = $ID
      `;
      sql = sql.replace('$ID', id)
      return executeQuery(sql);
    }, 

   update: (todo) => {
      //MODIFICARE DOPO
      let sql = `
      UPDATE todo
      SET completed=$COMPLETED
      WHERE id=$ID
         `;
      sql = sql.replace("%ID", todo.id);
      sql = sql.replace("%COMPLETED", todo.completed);
      return executeQuery(sql); 
   },

   cancellaTutto: async () => {
      return executeQuery("TRUNCATE TABLE booking");
   }
}

module.exports = database;
