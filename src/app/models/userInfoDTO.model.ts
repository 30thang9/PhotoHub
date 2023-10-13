import { User } from "./user.model";
import { UserInfo } from "./userInfo.model";

export interface UserInfoDTO {
    user: User,
    userInfo: UserInfo;
}
