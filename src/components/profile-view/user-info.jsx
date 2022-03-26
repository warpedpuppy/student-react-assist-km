import React from "react";

function UserInfo({ email, name, birthday }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Birthday: {birthday}</p>
    </>
  )
}

export default UserInfo