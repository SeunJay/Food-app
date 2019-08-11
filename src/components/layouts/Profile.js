import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { isAuthenticated } from "../../auth/index";
import { Link } from "react-router-dom";
import { readUser, update, updateUser } from "../../user/apiuser";

export default function Profile({ match }) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    error: false,
    success: false
  });

  const { firstName, lastName, password, error, success } = values;

  const { token } = isAuthenticated();

  const init = userId => {
    readUser(userId, token).then(data => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  return (
    <div>
      <NavBar brand="Omnifood" />
      {JSON.stringify(values)}
    </div>
  );
}
