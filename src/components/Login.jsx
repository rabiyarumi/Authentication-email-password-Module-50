import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    //manage state
    setSuccess(false);
    setError("");

    //login users
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        
        if(!result.user.emailVerified){
          setError("Please verify your email address.")
          return;
        }
        else{
          setSuccess(true);
          
        }
      })
      .catch((error) => {
        console.log(error.message);
        setSuccess(false);
        setError(error.message);
      });
  };

  const handleForgetPassword = () => {
    console.log('email:', emailRef.current.value);
    const email = emailRef.current.value;

    if(!email){
      console.log("provide valid email")
      // return;
    }
    else{
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password Reset email sent, Please check your email")
      })
    }
  }
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-sky-400  border-sky-400">Login</h2>

      <form onSubmit={handleLogin}>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-10 p-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
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
              <a onClick={handleForgetPassword}  href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-sky-400 text-white font-bold text-lg">
              Login
            </button>
          </div>
        </div>
      </form>
      <div>
        {success && (
          <p className="text-green-600 mt-2">User login successfully</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </div>
      <p> Don't have an account? Please <Link to={'/signup'} className="text-sky-400 mb-4 hover:underline">Sign Up</Link> </p>
      
    </div>
  );
};

export default Login;
