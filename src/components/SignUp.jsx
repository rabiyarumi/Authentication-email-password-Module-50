import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const terms = event.target.terms.checked;
    console.log( name, photo, email, password, terms);

    //reset error message
    setErrorMessage("");
    setSuccessMessage(false);

    //check password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be 6 characters or longer");
      return;
    }

    //check terms & condition
    if(!terms){
      setErrorMessage("Please accept our terms & condition")
      return;
    }

    //create authentication from firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccessMessage(true);

        //email verification
        sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("Email verified")
        })

        //update profile
         const profile = {
          displayName: name,
          photoURL: photo
         }

         updateProfile(auth.currentUser, profile)
         .then(() => {
          console.log("user profile Updated")
         })
         .catch(error => console.log("user update error", error))
      })




      .catch((error) => {
        console.log(error.message);
        console.log(error.code);
        setErrorMessage(error.code);
        setSuccessMessage(false);
      });
  };
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-sky-400  border-sky-400 my-10">
        Sign Up
      </h2>
      <form
        onSubmit={handleSignUp}
        className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto p-6"
      >
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input input-bordered"
          required
        />
        <label className="label">
          <span className="label-text">Photo Url</span>
        </label>
        <input
          type="text"
          name="photo"
          placeholder="Photo Url"
          className="input input-bordered"
          required
        />
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

        <div className="relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered w-full"
            required
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-xs absolute right-3 bottom-3"
          >
            {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </button>
        </div>
        

        <div className="form-control my-3 ">
          <label className="cursor-pointer label justify-start gap-4">
          <input
              type="checkbox"
              name="terms"
              className="checkbox checkbox-info"
            />
            <span className="label-text">Accept Out Terms & Condition</span>
           
          </label>
        </div>

        <div className="form-control ">
          <button className="btn bg-sky-400 text-white font-bold text-lg">
            Sign Up
          </button>
        </div>
      </form>
      {errorMessage && (
        <p className="text-red-600 my-3">Error: {errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-600">Successfully Singed Up!</p> 
      )}
            <p>Already have an account? Please <Link to={'/login'} className=" text-sky-400 hover:underline">Login</Link> </p>

    </div>
  );
};

export default SignUp;
