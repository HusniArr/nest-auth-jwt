export type Provider = 'google';

export class User {
    id:number;
    provider:string;
    provider_id:string;
    username:string;
    email:string;
    password:string;
}