import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import amazonLogo from "../assets/Amazon.svg";
import arrowIcon from "../assets/arrow.svg";
import rectangle from "../assets/Rectangle.svg";
import { Link, useNavigate } from "react-router-dom";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase/config.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {
  setUser,
  setLoading as setUserLoading,
  setError as setUserError,
} from "../redux/userSlice";

const SignUp = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !password) {
      alert("Please fill out all fields.");
      setError("Please enter all fields.");
      return;
    }

    if (mobile.length < 11) {
      alert("Please enter a valid mobile number.");
      setError(
        "Please enter a valid mobile number. It should be 11 digits long."
      );
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setError("");
    dispatch(setUserLoading());

    try {
      const userDocRef = doc(FIREBASE_DB, "users", mobile);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setError(
          "This mobile number is already in use. Please use a different number."
        );
        setLoading(false);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        `${mobile}@test.com`,
        password
      );
      const user = userCredential.user;
      console.log("Successfully signed up with Auth:", user);
      const userData = {
        uid: user.uid,
        name: name,
        mobile: mobile,
        email: user.email,
      };
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        ...userData,
        createdAt: serverTimestamp(),
      });

      console.log("Successfully saved user data to Firestore.");
      dispatch(setUser(userData));
      alert("Sign up successful!");
      navigate("/signin");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        setError(
          "This mobile number is already in use. Please try a different one."
        );
      } else {
        setError(error.message);
      }
      dispatch(setUserError(error.message));
      console.error("Firebase Error: ", errorCode, error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 mb-4 bg-white">
      <div className="w-full max-w-md text-black bg-white gap-7 ">
        <Link to="/" className="flex justify-center mb-7">
          <img src={amazonLogo} alt="Amazon Logo" className="h-8" />
        </Link>

        <div className="border border-gray-300 rounded-md px-7 py-9">
          <h2 className="mb-4 text-4xl font-medium text-left font-plex">
            Create Account
          </h2>

          {error && (
            <div
              className="relative px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSignUp}
            className="space-y-4 text-xl font-semibold text-left font-plex"
          >
            <div>
              <label className="block text-xl font-semibold font-plex">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 mt-1 text-xl font-inika border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon-yellow"
              />
            </div>
            <div>
              <label className="block text-xl font-semibold font-plex">
                Mobile number
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-1.5 mt-1 text-xl font-inika border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon-yellow"
              />
            </div>
            <div>
              <label className="block text-xl font-semibold font-plex">
                Password
              </label>
              <input
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1.5 mt-1 text-sm border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon-yellow"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 text-xl font-normal border rounded-lg font-plex bg-amazon-yellow border-amazon-yellow hover:bg-yellow-400"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify mobile number"}
              </button>
            </div>
          </form>

          <div className="w-full h-.5 border-[1px] border-[#D9D9D9] mt-4"></div>

          <div className="mt-4 text-[24px] text-left ">
            <p className="mb-2 font-semibold font-plex">
              Buying for work?{" "}
              <Link
                to="/signup"
                className="inline-block font-normal text-amazon-blue hover:underline font-inika"
              >
                Create a free business account
              </Link>
            </p>

            <img src={rectangle} alt="Rectangle" className="w-full h-1 my-4" />

            <p className="font-inika font-normal text-xl gap-2.5">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="ml-1 text-amazon-blue hover:underline"
              >
                Sign in
                <img
                  src={arrowIcon}
                  alt="Arrow Icon"
                  className="inline-block self-center w-2.5 h-2.5 ml-2 -mt-0.5"
                />
              </Link>
            </p>
          </div>

          <p className="mt-4 text-xl font-normal text-left font-plex">
            By creating an account, you agree to Amazon’s
            <Link to="/" className="text-amazon-blue hover:underline">
              {" "}
              Conditions of Use
            </Link>{" "}
            and
            <Link to="/" className="text-amazon-blue hover:underline">
              {" "}
              Privacy Notice
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
