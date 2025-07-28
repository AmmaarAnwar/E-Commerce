import React from 'react';
import { Link } from 'react-router-dom';
import Rectangle_long from '../assets/Rectangle-long.svg';

const Footer = () => {
    return (
        <footer className="w-full mt-auto mb-6">
            <div className="">
                <img src={Rectangle_long} alt="Long Rectangle" className="mb-8"/>
                <div className="flex justify-center space-x-6 text-xl font-inika font-normal text-amazon-blue">
                    <Link to="/" className="hover:underline">Conditions of Use</Link>
                    <Link to="/" className="hover:underline">Privacy Notice</Link>
                    <Link to="/" className="hover:underline">Help</Link>
                </div>
                <p className="mt-3 text-xl font-plex text-center">
                    © 1996-2024, Amazon.com, Inc. or its affiliates
                </p>
            </div>
        </footer>
    );
};

export default Footer;