import { Status } from "../enum/status.enum";
import { User } from "./user";

export interface Queue {

    id? : number;
    name : string;
    tel : string;
    servico : string;
    status? : Status;
    user?:User;
}   
   