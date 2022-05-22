import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMembers } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.members);
  useEffect(() => {
    getMembers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    //de(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              alt=""
            />
            {params.row.FirstName + " " + params.row.LastName}
          </div>
        );
      },
    },
    { field: "Email", headerName: "Email", width: 200 },
    {
      field: "IsAdmin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "UserName",
      headerName: "Username",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={members}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        checkboxSelection
      />
    </div>
  );
}
