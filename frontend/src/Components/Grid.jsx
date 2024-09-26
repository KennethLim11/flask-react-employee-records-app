import React from "react";

const Grid = ({ users, editUser, deleteUser }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {users.map((user) => (
        <div className="col" key={user.id}>
          <div className="card h-100">
            <div className="card-header d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#formModal" onClick={() => editUser(user)}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                Delete
              </button>
            </div>
            <div className="card-body">
              <h5 className="card-title">{user.firstName} {user.lastName}</h5>
              <p className="card-text">Address: {user.address}</p>
              <p className="card-text">Role: {user.role}</p>
              <p className="card-text">Number: {user.number}</p>
              <p className="card-text">Birthday: {user.birthday}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Grid;
