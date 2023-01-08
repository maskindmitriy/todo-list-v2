import { useDispatch } from "react-redux"
import {bindActionCreators, Dispatch} from "redux";
import {AllActionCreators} from "../store/reducers/actionCreators";

export const useActions = () => {
  const dispatch: Dispatch<any> = useDispatch()
  return bindActionCreators(AllActionCreators, dispatch)
}