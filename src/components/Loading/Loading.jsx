import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loading.css'

function Loading({ isLoading }) {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${require("../../back.jpg")})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        
        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
        };
    }, []);

    return (
        <CSSTransition
            in={isLoading}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
            <div className="loading-container">
                <div className="loading-content">
                    <div className="spinner-border text-light custom-spinner" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h2 className="loading-text">Loading...</h2>
                </div>
            </div>
        </CSSTransition>
    )
}

export default Loading