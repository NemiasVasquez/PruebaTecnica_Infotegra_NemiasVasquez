import React, { useState, useEffect } from 'react';

const Card = ({ texto, codigoHtml, paddinLados = '20px', background, cardStyle, minimizado = false }) => {
    const [collapsed, setCollapsed] = useState(minimizado);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div style={{ paddingRight: paddinLados, paddingLeft: paddinLados }}>
            <div className={`card ${cardStyle}`}>
                <div className="card-header" style={{ background }}>
                    <h3 className="card-title">{texto}</h3>
                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                            <i className="fas fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    {codigoHtml}
                </div>
            </div>
        </div>
    );
};

export default Card;
