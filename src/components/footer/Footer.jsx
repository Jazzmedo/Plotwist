import React from 'react'
import './footer.css'
import Separator from '../Home/Separator'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';



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
                            <Link to="/Plotwist">Home</Link>
                        </li>
                        <li>
                            <Link to="/Plotwist/Movies">Movies</Link>
                        </li>
                        <li>
                            <Link to="/Plotwist/TV">TV Shows</Link>
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
                    <h3>&lt; Developed By /&gt;</h3>
                    <div className="social">
                        <a href="https://github.com/Jazzmedo" target='_blank'>
                            {" "}
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <h5>JazzMedo ❤</h5>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
