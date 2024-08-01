import React from 'react'
import './footer.css'
import Separator from '../Home/Separator'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <footer>
            <Separator />

            <div className="foot">
                <div className="foot1">
                    <img src={require("../../logo/wlogo.png")} alt="" />
                </div>
                <div className="foot2">
                    <h3>COMPANY</h3>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/movies">Movies</Link>
                        </li>
                        <li>
                            <Link to="/tv">TV Shows</Link>
                        </li>
                    </ul>
                </div>
                <div className="foot2">
                    <h3>CONTACT</h3>
                    <ul>
                        <li>Support@plotwist.org</li>
                    </ul>
                </div>
                <div className="foot3">
                    <h3>&lt; Developed By &gt;</h3>
                    <div className="social">
                        <a href="">
                            {" "}
                            <i className="fa-brands fa-facebook" />
                        </a>
                        <a href="x.com">
                            {" "}
                            <i className="fa-brands fa-x-twitter" />
                        </a>
                        <a href="">
                            {" "}
                            <i className="fa-brands fa-linkedin-in" />
                        </a>
                        <a href="">
                            {" "}
                            <i className="fa-brands fa-instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
