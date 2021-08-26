import { Provider } from "src/common/types/user";
export class CreateUserDto {
    provider:Provider;
    provider_id:string;
    username:string;
    email:string;
}
