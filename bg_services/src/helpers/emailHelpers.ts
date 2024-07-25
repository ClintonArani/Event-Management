import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { mail_configs } from '../interfaces/mail_configs'
dotenv.config()

function createTransporter(configs: mail_configs){
    const transporter = nodemailer.createTransport(configs)

    return transporter
}

let mailConfigurations: mail_configs = ({
    service: 'gmail',
    host:'smtp.gmail.com',
    port: 587,
    requireTLS: true,
    auth:{
        user: process.env.EMAIL as string,
        pass: process.env.PASSWORD as string
    }
})

export const sendMail = async(messageOptions: any)=>{
    const transporter = createTransporter(mailConfigurations)
    await transporter.verify()

    await transporter.sendMail(messageOptions, (error, info) =>{
       if(error){
            console.log(error);
        
       }else{
            console.log(info.response);
       }
    })
}