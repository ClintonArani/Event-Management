import mssql from 'mssql'
import dotenv from 'dotenv'
import path from 'path'
import ejs from 'ejs'
dotenv.config()

import { sqlConfig } from '../config/sqlConfig'
import { sendMail } from '../helpers/emailHelpers'


export const welcomeUser = async()=>{
    const pool = await mssql.connect(sqlConfig)

    //list of all users
    const users = (await pool.request().query('SELECT * FROM users WHERE isCreated = 0')).recordset

    // console.log(users);
    
    
    for(let user of users){
        const templatePath = path.resolve(__dirname, '../../templates/welcomeUser.ejs')

        ejs.renderFile(templatePath, { UserName: `${user.firstName} ${user.lastName}` }, async(error, data)=>{
            
            
            let messageOptions = {
                from: process.env.EMAIL as string,
                to: user.email,
                subject: "Welcome to event management",
                html: data
            }

            try {
                await sendMail(messageOptions);
                await pool.request().query('UPDATE users SET isCreated = 1 WHERE isCreated = 0')

                console.log("Emails send to new users");
                
            } catch (error) {
               console.log(error);
                
            }
        })
    }
    
}