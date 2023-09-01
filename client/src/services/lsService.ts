import { lsConstants } from "../constants/constants";

const isLoggedIn = () => localStorage.getItem(lsConstants.CURRENT_USER) ? JSON.parse(localStorage.getItem(lsConstants.CURRENT_USER)!) : false;
const getCurrentUser = () => localStorage.getItem(lsConstants.CURRENT_USER) ? JSON.parse(localStorage.getItem(lsConstants.CURRENT_USER)!) : false;

const logOut = () => {
  localStorage.clear();
}

export { isLoggedIn, logOut, getCurrentUser };