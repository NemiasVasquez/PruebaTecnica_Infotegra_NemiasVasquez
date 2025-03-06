import React from 'react';

const Preload = ({ }) => {
    return (
        <div className="preloader flex-column justify-content-center align-items-center" style={{width:"100%", height:"100%"}}>
            <img className="animation__shake" src="/LogoSystemFood.png" alt="Logo AppexIA" height="60" width="60" />
        </div>
    )
}

export default Preload;