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
                        <img src="/heart.svg" alt="image" />
                    </button>
                </div>
            </div>
            <div className="body">{children}</div>
            <div className="footer">
                <div className="top">
                    <div className="school-details">
                        <div className="school-logo">
                            <img src="/logo.png" alt="image" />
                        </div>
                        <div className="school-info">
                            <div className="name">
                                DBTR National Higher Secondary School
                            </div>
                            <div className="quote">
                                Virtuousness is Life
                            </div>
                            <div className="desc">
                                Established in 1901, DBTR is situated in the temple town of Mayiladuthurai.
                            </div>
                        </div>
                    </div>
                    <div className="quick-links">
                        <div className="header">QUICK LINKS</div>
                        <Link to="/">Admissions</Link>
                        <Link to="/">Alumni association</Link>
                        <Link to="/">Donate</Link>
                        <Link to="/">Events</Link>
                    </div>
                    <div className="contact">
                        <div className="header">CONTACT</div>
                        DBTR NHSS,
                        Mahadhana Street, 
                        Kamarajar Salai,
                        Mayiladuthurai,
                        Tamilnadu - 609001
                        +91.436.422.3272
                        contact@nationalhighschool.in
                    </div>
                    <div className="donate">
                        Big or small, you can make an impact.
                        <button
                            type='button'
                            className="btn btn-primary"
                        >
                            Donate
                        <img src="/heart.svg" alt="heart" />
                    </button>
                    </div>
                </div>
                <div className="bottom">
                    <div className="left">
                        © DBTR 2024, All Rights Reserved | Sitemap
                    </div>
                    <div className="right">
                        <img src="/twitter.svg" alt="image" />
                        <img src="/linkedin.svg" alt="image" />
                        <img src="/instagram.svg" alt="image" />
                        <img src="/facebook.svg" alt="image" />
                        <img src="/youtube.svg" alt="image" />
                    </div>
                </div>
                <div className="watermark">
                    Designed By
                    <img src="/Pepper_Square_Logo.svg" alt="image" />
                </div>
            </div>
        </>
    );
}