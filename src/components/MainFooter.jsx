import amazonLogo from "../assets/Amazon.png";

const MainFooter = () => {
  return (
    <footer className="bg-[#232F3E] text-white">
      {/* Back to Top */}
      
      {/* Links */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 py-10 text-sm">
        <div>
          <h3 className="font-bold mb-2">Get to know Us</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Amazon Science</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Connect with Us</h3>
          <ul className="space-y-1">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Make Money with Us</h3>
          <ul className="space-y-1">
            <li>Sell on Amazon</li>
            <li>Sell under Amazon Accelerator</li>
            <li>Protect and Build Your Brand</li>
            <li>Amazon Global Selling</li>
            <li>Supply to Amazon</li>
            <li>Become an Affiliate</li>
            <li>Fulfilment by Amazon</li>
            <li>Advertise Your Products</li>
            <li>Amazon Pay on Merchants</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-2">Let Us Help You</h3>
          <ul className="space-y-1">
            <li>Your Account</li>
            <li>Returns Center</li>
            <li>Recalls and Product Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Amazon App Download</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#131A22] py-4 text-center text-xs text-gray-400">
        <img src={amazonLogo} alt="Amazon" className="mx-auto mb-2 h-10" />
        <p>Conditions of Use & Sale | Privacy Notice | Interest-Based Ads</p>
        <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default MainFooter;
