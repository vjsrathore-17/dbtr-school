// import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/navbar.scss';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function NavBar({children}: any) {
    return (
        <>
            <div className="top_app_bar">
                <div className="top_app_bar__left">
                    <img src="/logo.png" alt="image" />
                </div>
                <div className="top_app_bar__center">
                    <Link to="/">The school</Link>
                    <Link to="/academics">Academics</Link>
                    <Link to="/life-at-dtbr">Life@DTBR</Link>
                    <Link to="/contact-us">Contact us</Link>
                </div>
                <div className="top_app_bar__right">
                    <button
                        type='button'
                        className="btn btn-secondary"
                    >
                        CSR
                    </button>
                    <button
                        type='button'
                        className="btn btn-primary"
                    >
                        Donate
                    </button>
                </div>
            </div>
            <div className="body">{children}</div>
        </>
    );
}