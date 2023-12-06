// Sign in page

import { useNavigate } from "react-router-dom";
import { UseAuthValue } from "../../contexts/authContext";
import { useRef } from "react";
import styles from "./SignIn.module.css";
import { NavLink } from "react-router-dom";
export function SignIn() {
  const { SignIn } = UseAuthValue();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();

  // Form Submission
  async function Submission(e) {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    // Sign in user
    const status = await SignIn(data);

    // If user sign in redirecting to corredponding page
    {
      status ? navigate("/") : navigate("/signin");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        <h1> SignIn</h1>
        <form onSubmit={Submission}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            ref={emailRef}
          />
          <br />
          <br />

          <input
            type="password"
            placeholder="Enter password"
            required
            ref={passRef}
          />
          <br />
          <button>Submit</button>
        </form>
        <br />
        <span>or &nbsp;</span>
        <NavLink to="/signup">Create a New Account</NavLink>
      </div>
    </div>
  );
}
