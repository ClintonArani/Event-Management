import mssql from 'mssql';
import { sqlConfig } from '../config/sqlConfig';

export default class Connection {
    static query (arg0: string) {
        throw new Error('Method not implemented.');
    }
    static execute(arg0: string, arg1: {id: string; firstName: string; lastName: string; phoneNumber: string; email: string; password: string; createdAt: string}) {
        throw new Error ('Method not implemented.');
    }

    executeQury(query: string) {
        let pool = mssql.connect(sqlConfig);
    }
}