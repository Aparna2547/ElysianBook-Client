import React, { useEffect, useState } from "react";
import Home from "../../../Components/Admin/Sidebar/Sidebarcheck";
import Api from "../../../Services/axios";
import { FaRegEyeSlash } from "react-icons/fa6";
import UserListingModal from "../../../Components/Admin/UserListingModal";
import { listUser } from "../../../Api/admin";
import { toast } from "react-toastify";
import Pagination from "../../../Components/Admin/Pagination";

type userType = {
  id?: string;
  _id: string;
  name: string;
  email: string;
  status: string;
  isBlocked: boolean;
};
const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<userType[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [modal, setModal] = useState(false);
  const [listId, setListId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.get(
          `/admin/users?search=${searchTerm}&page=${currentPage}`
        );
        console.log(response.data.showUser);
        setUsers(response.data.showUser);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [searchTerm, modal, currentPage]);

  const handleModal = async (id: string) => {
    try {
      setModal(true);
      setListId(id);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  const userStatusChangeHandle = async () => {
    try {
      const res = await listUser(listId);
      console.log("resd", listId);

      console.log('res',res.data.data);
      console.log("User listed successfully");
      if (res) {
        setModal(false);
        toast.success("User permission changed");
      } else {
        toast.error("something error");
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
          <div className="flex m-5">
            <div>
              <h1 className="font-bold  w-3/4">User</h1>
            </div>

            <div className="pt-2 relative mx-auto text-gray-600 flex justify-end  w-3/4">
              <input
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  xmlSpace="preserve"
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr className="hover:bg-gray-50" key={user.id}>
                      <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {user.name}
                          </div>
                          <div className="text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.status}</td>
                      <td className="px-6 py-4">
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
          
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      {modal && (
        <UserListingModal
          setModal={setModal}
          userStatusChangeHandle={userStatusChangeHandle}
        />
      )}
    </>
  );
};

export default User;
