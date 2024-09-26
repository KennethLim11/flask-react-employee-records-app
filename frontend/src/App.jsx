import { useEffect, useState } from "react";
import Grid from "./Components/Grid";
import Modal from "./Components/Modal";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/users`);
      const data = await response.json();
      console.log("Fetched users:", data.users);
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const editUser = (user) => {
    console.log(user)
    setCurrentUser(user)
  }

  const resetForm = () => {
    setCurrentUser({});
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/delete_user/${id}`, {
        method: "DELETE",
      });
      if (response.status == 200) {
        fetchUsers();
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-lg">
      <h1 className="text-center">Employee Records</h1>
      <button
        type="button"
        className="btn btn-primary addBtn"
        data-bs-toggle="modal"
        data-bs-target="#formModal"
        onClick={resetForm}
      >
        Create Employee
      </button>
      {users && <Grid users={users} editUser={editUser} deleteUser={deleteUser} />}
      <Modal updateCallback={fetchUsers} currentUser={currentUser} />
      
    </div>
  );
}

export default App;
