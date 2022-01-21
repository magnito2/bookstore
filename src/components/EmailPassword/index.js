import React, { useState } from "react";
import "./styles.scss";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { auth } from "../../firebase/utils";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom"; 

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  let navigate = useNavigate()

  const reset = () => {
    setEmail('');
    setErrors([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };

      await sendPasswordResetEmail(auth, email, config)
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          const err = ["Email Not Found, please try again"];
          setErrors(err);
        });
    } catch (error) {
      //console.log(error)
    }
  };

  const configAuthWrapper = {
    headline: "Email Password",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 ? (
          <ul>
            {errors.map((err, idx) => {
              return <li key={idx}>{err}</li>;
            })}
          </ul>
        ) : null}

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
