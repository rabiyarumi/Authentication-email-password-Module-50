import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.init";
import { useState } from "react";

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        //reset error message
        setErrorMessage("");
        setSuccessMessage(false);

        //check password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

        if(!passwordRegex.test(password)){
          setErrorMessage("Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
        return;
        }
        if(password.length < 6) {
          setErrorMessage("Password must be 6 characters or longer")
          return;
        }



        //creat authentication from firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log(result.user);
          setSuccessMessage(true)
        })
        .catch((error) => {
          console.log(error.message)
          console.log(error.code)
          setErrorMessage(error.code)
          setSuccessMessage(false)
        })

    }
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-sky-400  border-sky-400 my-10">
        Sign Up
      </h2>
      <form onSubmit={handleSignUp} className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto p-6">
           
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
      
          
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
           
            <div className="form-control mt-6">
              <button className="btn bg-sky-400 text-white font-bold text-lg">Sign Up</button>
        </div>
      </form>
      {
        errorMessage && <p className="text-red-600 my-3">Error: {errorMessage}</p>
      }
      {
        successMessage && <p className="text-green-600">Successfully Singed Up!</p>
      }
    </div>
  );
};

export default SignUp;
