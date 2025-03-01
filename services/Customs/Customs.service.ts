import axios from "axios";
import { ICustoms } from "./models";
import { CustomsUrls } from "./urls";
import { IResponseWithData } from "../models";
import { IUserInfo } from "../Customer/models/result.model";

export class CustomsService {
  async Customs() {
    try {
      const response = await axios.get<IResponseWithData<ICustoms[]>>(
        CustomsUrls.Customs
      );
      return response;
    } catch (err) {
      throw console.log(err);
    }
  }
  async getUserDatielByToken() {
    try {
      const response = await axios.post<IResponseWithData<IUserInfo>>(
        CustomsUrls.get_token
      );
      return response;
    } catch (err) {
      throw console.log(err);
    }
  }
}
