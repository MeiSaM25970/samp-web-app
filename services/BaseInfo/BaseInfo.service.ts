import axios from "axios";
import { BaseInfoUrls } from "./urls";
import { ILoginResult, IUserInfo } from "./models";

export class BaseInfoService {
  async Login(data: IUserInfo) {
    try {
      const response = await axios.post<ILoginResult>(BaseInfoUrls.Login, data);
      return response;
    } catch (err) {
      throw console.log(err);
    }
  }
}
