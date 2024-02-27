import React, { useEffect, useState } from "react";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import Api from "../../../Services/axios";
import { FaRegEyeSlash } from "react-icons/fa6";
import UserListingModal from "../../../Components/Admin/UserListingModal";
import { listUser } from "../../../Api/admin";
import { toast } from "react-toastify";

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  const [modal, setModal] = useState(false);
  const [listId, setListId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.get("/admin/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [ ]);

  const handleModal = async (id:string) => {
    try {
      setModal(true);
      setListId(id); 
      console.log(id)
    } catch (error) {
      console.log(error);
    }
  };

  const userStatusChangeHandle = async () => {
    try {
      const res = await  listUser(listId); 
      console.log('resd',listId);
      
      console.log(res);
      console.log('User listed successfully');
      if(res.data.data){
        setModal(false)
        toast.success("User permission changed")
      }else{
        toast.error('something error')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex">
        <Home />
        <div className="block w-full">
          <div>
            <h1 className="font-bold m-3">User</h1>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr className="hover:bg-gray-50" key={user.id}>
                      <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">{user.name}</div>
                          <div className="text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.status}</td>
                      <td className="px-6 py-4">
  {console.log(user.isBlocked)}
  {user.isBlocked ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
      <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
      UnListed
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
      Listed
    </span>
  )}
</td>

                      <td className="px-6 py-4">
                        <div className="flex justify-start gap-4">
                          <button onClick={() => handleModal(user._id)}>
                            <FaRegEyeSlash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modal && <UserListingModal setModal={setModal} userStatusChangeHandle={userStatusChangeHandle} />}
    </>
  );
};

export default User;
