"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Role: string;
}

export default function adminAdmins() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [status, setStatus] = useState({ error: '', success: '' });
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://accountprovider--silicon.azurewebsites.net/api/GetAllAdmins?code=pn8D1V6OLT3HqCFpO8B1heRNhzOkx--NIN0OOH13n4sAAzFuLdtHpQ%3D%3D", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setFilteredUsers(data);
        } else {
          setStatus({ ...status, error: 'Cannot find any admins, please try again' });
        }
      } catch (error) {
        setStatus({ ...status, error: 'Cannot find any admins, please try again' });
        console.error("Error fetching admins:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (userIdToDelete) {
      try {
        const response = await fetch("https://accountprovider--silicon.azurewebsites.net/api/DeleteOneUser?code=ryJXuR_b0y049VqdSpBfI-yJ4ufcDEU-k1yBQYoc_YShAzFuiYuFGg%3D%3D", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ UserId: userIdToDelete }),
        });
        if (response.ok) {
          setStatus({ ...status, success: 'User deleted successfully' });
          const updatedUsers = users.filter(user => user.Id !== userIdToDelete);
          setUsers(updatedUsers);
          filterUsers(updatedUsers, searchQuery); // Filter users after deletion
        } else {
          setStatus({ ...status, error: 'Failed to delete user, please try again' });
          console.error("Failed to delete user:", response.statusText);
        }
      } catch (error) {
        setStatus({ ...status, error: 'Failed to delete user, please try again' });
        console.error("Error deleting user:", error);
      }
      setShowModal(false);
    }
  };

  const handleShowModal = (userId: string, email: string) => {
    setUserIdToDelete(userId);
    setEmailToDelete(email);
    setShowModal(true);
  };

  const handleEdit = (user: User) => {
    const query = new URLSearchParams({
      Id: user.Id,
    });

    router.push(`/adminAdmins/editAdminInfo?${query}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterUsers(users, query);
  };

  const filterUsers = (users: User[], query: string) => {
    setFilteredUsers(
      users.filter(user =>
        user.Email.toLowerCase().includes(query)
      )
    );
  };

  if (!users) return (
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );

  return (
    <main>
      {status.error && (
        <div className="alert alert-danger" role="alert">
            {status.error}
        </div>
        )}
        {status.success && (
        <div className="alert alert-success" role="alert">
            {status.success}
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Admin admins</h1>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by email"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="table-responsive" style={{ maxHeight: "80vh" }}>
        <table className="table table-striped">
          <thead className="bg-white" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.Id}>
                <td>{user.FirstName}</td>
                <td>{user.LastName}</td>
                <td>{user.Email}</td>
                <td>{user.PhoneNumber}</td>
                <td>{user.Role}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => handleEdit(user)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => handleShowModal(user.Id, user.Email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`modal mt-5 fade ${showModal ? 'show d-block' : 'd-none'}`} tabIndex={-1} role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Confirm Deletion</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the user with email: <strong>{emailToDelete}</strong>?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
