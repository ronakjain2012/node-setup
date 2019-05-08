var mysql = require('mysql');
var db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: '',
	database: 'test',
	dateStrings: true,
  multipleStatements : true,
});
db.connect();
module.exports = db; 