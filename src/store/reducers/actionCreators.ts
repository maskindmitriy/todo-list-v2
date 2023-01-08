import {AuthActionCreators} from "./auth/authActionCreators";
import {TodoActionCreators} from "./todos/todoActionCreators";

export const AllActionCreators = {
  ...AuthActionCreators,
  ...TodoActionCreators
}