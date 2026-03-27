import mysql from "mysql2/promise"


export const db=await mysql.createConnection({
    password:"SunnySky42!",
    port:"3306",
    host:"localhost",
    user:"root",
    database:"AutoSouq"
})