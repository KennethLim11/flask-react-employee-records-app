import React, { useState, useEffect } from "react";

const Form = ({ currentUser, updateCallback }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    role: "",
    number: "",
    birthday: "",
  });

  useEffect(() => {
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return d.toISOString().split("T")[0]; 
    };

    setUser({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      address: currentUser.address || "",
      role: currentUser.role || "",
      number: currentUser.number || "",
      birthday: formatDate(currentUser.birthday) || "",
    });
  }, [currentUser]);

  const updating = Object.entries(currentUser).length !== 0;

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      role: user.role,
      number: user.number,
      birthday: user.birthday,
    };
    const url = `http://127.0.0.1:5001/` + (updating ? `update_user/${currentUser.id}` : `create_user`);
    const response = await fetch(url, {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 201 && response.status !== 200) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback()
    }
  };

  return (
    <form action="" onSubmit={onSubmit} id="CreateForm">
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name
        </label>
        <input
          type="text"
          className="form-control"
          name="firstName"
          placeholder="Juan"
          value={user.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          className="form-control"
          name="lastName"
          placeholder="Dela Cruz"
          value={user.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          name="address"
          placeholder="123 abc st."
          value={user.address}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select className="form-select" name="role" aria-label="Default select example" value={user.role} onChange={handleChange}>
          <option defaultValue="">Open this select menu</option>
          <option value="Developer">Developer</option>
          <option value="QA">QA</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Number
        </label>
        <input
          type="text"
          className="form-control"
          name="number"
          placeholder="0123456789"
          value={user.number}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="birthday" className="form-label">
          Birthday
        </label>
        <input
          type="date"
          className="form-control"
          name="birthday"
          value={user.birthday}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Form;
