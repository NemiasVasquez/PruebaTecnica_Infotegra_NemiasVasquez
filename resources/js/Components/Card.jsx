import React from 'react';

const Card = ({ texto, codigoHtml }) => {
    return (
        <div style={{paddingRight: '20px', paddingLeft: '20px'}}>
            <div className="card">
                <div className="card-header">
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
    )
}

export default Card;