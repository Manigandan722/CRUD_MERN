import React, { useEffect, useState } from "react";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "./Services/userService";

const Userlist = () => {
  const [display, setdisplay] = useState(false);
  const [createDisplay, setcreateDisplay] = useState(true);
  const [users, setUser] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await getUser();
    setUser(res.data);
  };

  const handleCreateUser = async () => {
    await createUser(newUser);
    fetchUser();
    setNewUser({
      name: "",
      email: "",
      age: "",
      id: "",
    });
  };

  const setUserUpdate = (users) => {
    setcreateDisplay(false);
    setdisplay(true);
    setFormData({
      name: users.name,
      email: users.email,
      age: users.age,
      id: users._id,
    });
  };

  const handleUpdateUser = async () => {
    try {
      console.log(formData);
      await updateUser(formData.id, formData);
      alert("User updated successfully");
      fetchUser();
      setFormData({
        name: "",
        email: "",
        age: "",
        id: "",
      });
      setdisplay(false);
      setcreateDisplay(true);
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  const handleDeleteUser = async (user) => {
    const mindset = confirm(`Confirm delete ${user.name}`);
    if (mindset) {
      await deleteUser(user._id);
      fetchUser();
    } else {
    }
  };

  return (
    <>
      <div>
        {createDisplay && (
          <div>
            <h2>User Create user</h2>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Age"
                value={newUser.age}
                onChange={(e) =>
                  setNewUser({ ...newUser, age: e.target.value })
                }
              />
              <button onClick={handleCreateUser}>Add User</button>
            </div>
          </div>
        )}

        {display && (
          <div>
            <div>
              <h2>Update User</h2>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
              />
              <button onClick={handleUpdateUser}>Update User</button>
            </div>
          </div>
        )}
        {/* <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} ({user.email}) - {user.age} years old
              <button onClick={() => setUserUpdate(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))}
        </ul> */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button onClick={() => setUserUpdate(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDeleteUser(user)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Userlist;
