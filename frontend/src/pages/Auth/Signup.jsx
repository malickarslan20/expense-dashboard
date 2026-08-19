import React, {useState, useContext} from 'react'
import AuthLayout from "../../components/layouts/Authlayout";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";
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
  const [isLoading, setIsLoading] = useState(false);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  //handle SignUp form submit
  const handleSignup = async (e) => {
    e.preventDefault();

    let profileImageURL = "";

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
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full px-4 sm:px-6 lg:w-[70%] lg:px-0 h-auto lg:h-full flex flex-col justify-center py-8 lg:py-0">
        <h3 className="text-lg sm:text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join Us Today by entering your details below.
        </p>

        <form onSubmit={handleSignup}>
          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
            <div className='sm:col-span-2'>
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
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-sm text-slate-700 mt-4 text-center sm:text-left">
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