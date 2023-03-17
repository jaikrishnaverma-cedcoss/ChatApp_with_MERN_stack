import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../customHooks/useFetch";
import { MyContext } from "../../../myContext/MyContext";

const UsersList = () => {
  const { user } = useContext(MyContext);
  const [state, setState] = useState({
    users: [],
    toasts: [],
  });
  const { data, loading, error } = useFetch(
    "/api/user",
    user ? user.token : ""
  );
  useEffect(() => {
    setState({ users: data });
  }, [user]);
  const navigate = useNavigate();
  return (
    <div
      className="col-12 bg-white "
      style={{ height: "84.2vh", overflowY: "scroll" }}
    >
      <div className="my-3 p-2 rounded container">
        <h6 className="border-bottom pb-2 mb-0">Users & Groups</h6>
        {data &&
          data.map((x) => (
            <div
              className="d-flex text-muted pt-3"
              onClick={() => navigate(`/chat/${x._id}`)}
            >
              <img
                className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width="35"
                height="35"
                alt={x.name}
                src={x.pic}
              />
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{x.name}</strong>
                  {/* <a href="#">Follow</a> */}
                </div>
                <span className="d-block">{x.mobile}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersList;