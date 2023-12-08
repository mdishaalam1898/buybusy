import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UseAuthValue } from "../../contexts/authContext";
import styles from "./SignUp.module.css";

/**    Sign Up page  **/
export function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();

  const { createUser } = UseAuthValue();

  function Submission(e) {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    createUser(data);
    navigate("/signin");
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1>SignUp</h1>
        <form onSubmit={Submission}>
          <input
            type="text"
            placeholder="Enter Your name"
            required
            ref={nameRef}
          />
          <input
            type="email"
            placeholder="Enter your email"
            required
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Enter password"
            required
            ref={passRef}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
