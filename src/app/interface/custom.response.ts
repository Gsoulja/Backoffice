import { Category } from "./category";
import { Queue } from "./queue";
import { User } from "./user";

export interface CustomResponse{
    timeStamp:Date;
    statusCode:number;
    status:string;
    reason:string;
    message:string;
    developerMessage:String;
    data: {queues?: Queue[],queue?: Queue,categorys?: Category[],category?: Category, users?: User[],user?: Category};
}