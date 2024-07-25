import mssql from 'mssql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import { login_details } from '../interfaces/user.interface';
import { sqlConfig } from '../config/sqlConfig';

export class authService{

    async login(logins: login_details){
        let pool = await mssql.connect(sqlConfig)

        let user = (await pool.request()
        .input("email", logins.email)
        .input("password", logins.password).execute("loginUser")).recordset

        if(user.length < 1){
            return {
                error: "user not found"
            }
        }else{
            
            let hashedPassword = user[0].password

            //compare password
            let passwordMatches = bcrypt.compareSync(logins.password, hashedPassword)

            if(passwordMatches){
                let {createdAt, password, phone_number, ...rest } = user[0]

                let token = jwt.sign(rest, process.env.SECRET_KEY as string, {
                    expiresIn: '2h'
                })

                return {
                    message: "Logged in successfully",
                    token
                }
                
            }else{
                return {
                    error: "Incorrect password"
                }
            }
           
        }
    }
}