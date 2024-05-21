"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
}
interface UserAddress {
  Id: string;
  AddressLine1: string;
  AddressLine2?: string;
  PostalCode: string;
  City: string;
}
export default function EditUserInfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<UserAddress | null>(null);
  const [status, setStatus] = useState({ error: '', success: '' });

  useEffect(() => {
    const Id = searchParams.get("Id");

    const fetchUser = async (userId: string) => {
      try {
        const response = await fetch(`https://accountprovider--silicon.azurewebsites.net/api/GetUserInformation?code=aNTtpYLpi-kJwhT7UwxIh3Bg-d_wgAl7i9ZwkTB93ca9AzFucxov5g%3D%3D`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setStatus({ ...status, error: 'Failed to fetch user information, please try again' });
          console.error("Failed to fetch user information:", response.statusText);
        }
      } catch (error) {
        setStatus({ ...status, error: 'Error fetching user information, please try again' });
        console.error("Error fetching user information:", error);
      }
    };

    if (Id) {
      fetchUser(Id);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await fetch("https://accountprovider--silicon.azurewebsites.net/api/UpdateUserInformation?code=5qeaYssH-26LfFNyO3KApmRHWQQVDbgMOywfZ-xgDHDSAzFu-XqzmQ%3D%3D", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            userId: user.Id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber
          }),
        });

        if (response.ok) {
          router.push("/adminUsers");
        } else {
          setStatus({ ...status, error: 'Failed to update user, please try again' });
          console.error("Failed to update user:", response.statusText);
        }
      } catch (error) {
        setStatus({ ...status, error: 'Error updating user, please try again' });
        console.error("Error updating user:", error);
      }
    }
  };
  useEffect(() => {
    const Id = searchParams.get("Id");

    const fetchAddress = async (userId: string) => {
      try {
        const response = await fetch(`https://accountprovider--silicon.azurewebsites.net/api/GetUserAddressInfo?code=6cfnRqXK6Gi1L5msrQC5PxW4n8RF1ojt9eorln6zmcjLAzFubG8-pQ%3D%3D`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId : Id }),
        });

        if (response.ok) {
          const data = await response.json();
          setAddress(data);
        } else {
          setStatus({ ...status, error: 'Failed to fetch user address information, please try again' });
          console.error("Failed to fetch user address information:", response.statusText);
        }
      } catch (error) {
        setStatus({ ...status, error: 'Error fetching user address information, please try again' });
        console.error("Error fetching user address information:", error);
      }
    };

    if (Id) {
      fetchAddress(Id);
    }
  }, [searchParams]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (address) {
      setAddress({ ...address, [name]: value });
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (address) {
      try {
        const Id = searchParams.get("Id");
        const response = await fetch("https://accountprovider--silicon.azurewebsites.net/api/UpdateAddress?code=KJF8bVQuYjpOP2TTvU-05IQqPw02GhkVigR_LigalStJAzFuKAttKg%3D%3D", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            userId: Id,
            AddressLine1: address.AddressLine1,
            AddressLine2: address.AddressLine2,
            PostalCode: address.PostalCode,
            City: address.City
          }),
        });

        if (response.ok) {
          router.push("/adminUsers");
        } else {
          setStatus({ ...status, error: 'Failed to update user address, please try again' });
          console.error("Failed to update user address:", response.statusText);
        }
      } catch (error) {
        setStatus({ ...status, error: 'Error updating user address, please try again' });
        console.error("Error updating user address:", error);
      }
    }
  };


  if (!user) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (!address) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main>
      <h1>Edit User</h1>
      {status.error && (
        <div className="alert alert-danger" role="alert">
          {status.error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input type="text" name="FirstName" className="form-control" value={user.FirstName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" name="LastName" className="form-control" value={user.LastName} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="Email" className="form-control" value={user.Email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="text" name="PhoneNumber" className="form-control" value={user.PhoneNumber} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
      <hr />
      <h1>Edit User Address</h1>
      {status.error && (
        <div className="alert alert-danger" role="alert">
          {status.error}
        </div>
      )}
      <h5 className="address-info">Address Info</h5>
      <form className="second-form" onSubmit={handleAddressSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="AddressLine1">Address Line 1</label>
          <input className="form-control" type="text" name="AddressLine1" value={address.AddressLine1} onChange={handleAddressChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="AddressLine2">Address Line 2</label>
          <input className="form-control" type="text" name="AddressLine2" value={address.AddressLine2 || ''} onChange={handleAddressChange}/>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="PostalCode">Postal Code</label>
          <input className="form-control" type="text" name="PostalCode" value={address.PostalCode} onChange={handleAddressChange} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="City">City</label>
          <input className="form-control" type="text" name="City" value={address.City} onChange={handleAddressChange} />
        </div>
        <div className="form-buttons">
          <button id="save" className="btn btn-primary" type="submit">Save Changes</button>
          <button id="cancel" className="btn " type="button" onClick={() => router.push('/adminUsers')}>Cancel</button>
        </div>
      </form>
    </main>
    
  );
}
