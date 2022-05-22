import React from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ExitToAppSharp,
} from "@material-ui/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/apiCalls";

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    logout(dispatch);
    history.push("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">CPS Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <MenuItem>Hi {user?.FirstName + " " + user?.LastName} </MenuItem>
          </div>
          <div className="topbarIconContainer">
            <MenuItem onClick={handleLogout}>
              <ExitToAppSharp />
            </MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
}
