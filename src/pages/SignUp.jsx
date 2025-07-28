import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import amazonLogo from '../assets/Amazon.svg';
import arrowIcon from '../assets/arrow.svg';
import rectangle from '../assets/Rectangle.svg';
import {Link, useNavigate} from 'react-router-dom';
import {FIREBASE_AUTH, FIREBASE_DB} from "../firebase/config.js";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser, setLoading as setUserLoading, setError as setUserError } from '../redux/userSlice';

const SignUp = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name || !mobile || !password) {
            alert('Please fill out all fields.');
            setError('Please enter both email/mobile and password.');
            return;
        }

        setLoading(true);
        setError('');
        dispatch(setUserLoading());

        try {
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, `${mobile}@test.com`, password);
            const user = userCredential.user;
            console.log('Successfully signed up with Auth:', user);
            const userData = {
                uid: user.uid,
                name: name,
                mobile: mobile,
                email: user.email,
            }
            await setDoc(doc(FIREBASE_DB, "users", user.uid), {
                ...userData,
                createdAt: serverTimestamp(),
            });

            console.log('Successfully saved user data to Firestore.');
            dispatch(setUser(userData));
            alert('Sign up successful!');
            navigate('/signin');

        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch(setUserError(errorMessage));
            console.error("Firebase Error: ", errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 flex items-center justify-center min-h-screen bg-white mb-4">
            <div className="w-full text-black bg-white max-w-md gap-7 ">
                <Link to="/" className="flex justify-center mb-7">
                    <img src={amazonLogo} alt="Amazon Logo" className="h-8" />
                </Link>

                <div className="px-7 py-9 border border-gray-300 rounded-md">
                    <h2 className="text-4xl font-medium mb-4 text-left font-plex">Create Account</h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                             role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSignUp} className="space-y-4 text-left text-xl font-plex font-semibold">
                        <div>
                            <label className="block text-xl font-plex font-semibold">Your name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-1.5 mt-1 text-xl font-inika border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon-yellow"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-plex font-semibold">Mobile number</label>
                            <input
                                type="text"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="w-full px-3 py-1.5 mt-1 text-xl font-inika border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon-yellow"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-plex font-semibold">Password</label>
                            <input
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-1.5 mt-1 text-sm border border-gray-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon-yellow"
                            />
                        </div>
                        <div>
                            <button type="submit" className="w-full py-2 text-xl font-normal font-plex bg-amazon-yellow border border-amazon-yellow rounded-lg hover:bg-yellow-400" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify mobile number'}
                            </button>
                        </div>
                    </form>

                    <div className="w-full h-.5 border-[1px] border-[#D9D9D9] mt-4"></div>


                    <div className="mt-4 text-[24px] text-left ">
                        <p className="mb-2 font-plex font-semibold">Buying for work? <Link to="/signup" className="text-amazon-blue hover:underline inline-block font-inika font-normal">Create a free business account</Link></p>

                        <img src={rectangle} alt="Rectangle" className="w-full h-1 my-4" />

                        <p className="font-inika font-normal text-xl gap-2.5">
                            Already have an account? <Link to="/signin" className="ml-1 text-amazon-blue hover:underline">Sign in
                            <img src={arrowIcon} alt="Arrow Icon" className="inline-block self-center w-2.5 h-2.5 ml-2 -mt-0.5" /></Link>
                        </p>
                    </div>

                    <p className="mt-4 text-xl text-left font-plex font-normal">
                        By creating an account, you agree to Amazon’s
                        <Link to="/" className="text-amazon-blue hover:underline"> Conditions of Use</Link> and
                        <Link to="/" className="text-amazon-blue hover:underline"> Privacy Notice</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;