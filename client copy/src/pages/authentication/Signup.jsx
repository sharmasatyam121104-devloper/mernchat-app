import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../store/slice/userSlice/user.thunk";
import { toast } from "react-hot-toast";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { buttonLoding, isAuthenticated } = useSelector((state) => state.user);
  // const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signupData.fullname ||
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.gender
    ) {
      return toast.error("Please fill all fields.");
    }

    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and Confirm Password do not match.");
    }

    // Dispatch register thunk
    const response = await dispatch(registerUserThunk(signupData));

    if (response.payload?.success) {
      // Reset form
      setSignupData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
      toast.success(response.payload.message || "Registered successfully!");
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen overflow-y-hidden"
    >
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-5 gap-3 h-[53%] md:h-[40%] md:w-[59%] lg:h-[60%] lg:w-[30%] xl:h-[59%] xl:w-[30%] 2xl:h-[59%] 2xl:w-[30%]">
        <p className="text-2xl text-center font-semibold">Welcome To TalkTo</p>
        <legend className="fieldset-legend text-3xl">Sign Up</legend>

        <label className="label text-xl py-2">Full Name</label>
        <input
          type="text"
          name="fullname"
          value={signupData.fullname}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="input h-12 w-full"
        />

        <label className="label text-xl py-1">Email</label>
        <input
          type="email"
          name="email"
          value={signupData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input h-12 w-full"
        />

        <label className="label text-xl py-1">Password</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
          placeholder="Password"
          className="input h-12 w-full"
        />

        <label className="label text-xl py-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="input h-12 w-full"
        />

        <label className="label text-xl py-1">Gender</label>
        <select
          name="gender"
          value={signupData.gender}
          onChange={handleChange}
          className="select select-error my-1 w-full"
        >
          <option value="" disabled>
            Choose Your Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          type="submit"
          disabled={buttonLoding}
          className="btn btn-neutral mt-3 h-12 text-2xl"
        >
          {buttonLoding ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="mt-2">
          Already have an account?
          <span className="mx-1 underline text-blue-700">
            <NavLink to="/login">Login</NavLink>
          </span>
        </p>
      </fieldset>
    </form>
  );
};

export default Signup;
