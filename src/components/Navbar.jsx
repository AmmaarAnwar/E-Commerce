import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FIREBASE_AUTH } from "../firebase/config";
import { Menu, ShoppingCart } from "lucide-react";
import amazonLogo from "../assets/Amazon.png";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";

const Navbar = () => {
  const { currentUser } = useAuth();
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    FIREBASE_AUTH.signOut()
      .then(() => {
        console.log("User signed out successfully.");
        dispatch(clearUser());
        dispatch(clearCart());
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  }

  return (
    <div className="w-full">
      {/* الصف العلوي */}
      <div className="bg-[#131921] text-white flex items-center justify-between px-4 py-2">
        {/* الشعار */}
        <Link to="/" className="flex items-center">
          <img src={amazonLogo} alt="Amazon" className="h-8" />
        </Link>

        {/* البحث */}
        <div className="flex-1 mx-4 hidden md:flex">
          <input
            type="text"
            placeholder="Search Amazon"
            className="w-full p-2 rounded-l-md"
          />
          <button className="bg-amazon-yellow px-4 rounded-r-md">🔍</button>
        </div>

        {/* حساب المستخدم */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="text-sm">Hello, {currentUser.name || "User"}</span>
              <button
                onClick={handleSignOut}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-sm hover:underline">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
              >
                Register
              </Link>
            </>
          )}

          {/* عربة التسوق */}
          <Link to="/cart" className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart size={28} />
              {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="font-bold hidden md:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* الصف الثاني */}
      <div className="bg-[#232f3e] text-white px-4 py-2 flex items-center gap-6 text-lg overflow-x-auto">
        <div className="flex items-center gap-1 cursor-pointer">
          <Menu size={20} />
          <span>All</span>
        </div>
        <Link to="/product" className="hover:underline">
          Amazon mini TV
        </Link>
        <Link to="/product" className="hover:underline">
          Best Sellers
        </Link>
        <Link to="/product" className="hover:underline">
          Today's Deals
        </Link>
        <Link to="/product" className="hover:underline">
          Customer Service
        </Link>
        <Link to="/product" className="hover:underline">
          Mobiles
        </Link>
        <Link to="/product" className="hover:underline">
          Electronics
        </Link>
        <Link to="/Product" className="hover:underline">
          Fashion
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
