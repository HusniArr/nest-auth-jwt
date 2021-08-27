import { Provider } from "../../common/types/user";
import { Entity,Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
@PrimaryGeneratedColumn()
id:number;
@Column({nullable:false})
provider:Provider
@Column({nullable:false})
providerId:string;
@Column({nullable:false})
username:string;
@Column({nullable:false})
email:string;

}
