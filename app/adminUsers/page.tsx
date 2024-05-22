"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
}
export default function adminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState({ error: '', success: '' });
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://accountprovider--silicon.azurewebsites.net/api/GetAllUsers?code=LEEShh8u0tM7PxKfBan0SbmgePlHk2jWXurSS9t6t0fnAzFuPA-r7g%3D%3D", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          setStatus({ ...status, error: 'Can not found any users, please try agen' });
        }
      } catch (error) {
        setStatus({ ...status, error: 'Can not found any users, please try agen' });
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async ( Id: string) => {
    try {
      const response = await fetch("https://accountprovider--silicon.azurewebsites.net/api/DeleteOneUser?code=ryJXuR_b0y049VqdSpBfI-yJ4ufcDEU-k1yBQYoc_YShAzFuiYuFGg%3D%3D", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserId : Id }),
      });
      if (response.ok) {
        setStatus({ ...status, success: 'User deleted Successfully' });
        setUsers(users.filter(user => user.Id !== Id));
      } else {
        setStatus({ ...status, error: 'Failed to delete user, please try agen' });
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      setStatus({ ...status, error: 'Failed to delete user, please try agen' });
      console.error("Error deleting user:", error);
    }
  };
  const handleEdit = (user: User) => {
    const query = new URLSearchParams({
      Id: user.Id,
    });

    router.push(`/adminUsers/editUserInfo?${query}`);
  };
  
  if (!users) return 
    <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>;
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
      <h1>Admin Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.Id}>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Email}</td>
              <td>{user.PhoneNumber}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(user.Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
