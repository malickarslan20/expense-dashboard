import React, {useState, useContext} from 'react'
import AuthLayout from "../../components/layouts/AuthLayout";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/input";
import { validateEmail } from "../../utils/helper";
import ProfilePicSelector from '../../components/Inputs/ProfilePicSelector';
import axiosInstance  from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apipath";
import {UserContext} from "../../context/UserContext";
import uploadImage from '../../utils/uploadImage';

function Signup() {
  const [profilePic, setProfilePic] = useState(null);
const [fullname, setFullname] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  //handle SignUp form submit
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageURL = ""; // ✅ declare variable

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError(null);
    // Signup API call

    try {

//upload image if present
if (profilePic) {
  const imgUploadRes = await uploadImage(profilePic);
  profileImageURL = imgUploadRes.imageUrl || "";
}

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
         fullname,
        email,
        password,
        profileImageURL
        
      });
     
      const {token , user} = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join Us Today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input
            value={fullname}
            onChange={({ target }) => setFullname(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />
          <div className='col-span-2'>
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="••••••••"
            type="password"
          />
          </div>
           </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="btn-primary w-full"
          >
            Sign Up
          </button>

          <p className="text-sm text-slate-700 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              className="text-primary hover:underline focus:outline-none"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </p>
         
        </form>

      </div>
    </AuthLayout>
  )
}

export default Signup