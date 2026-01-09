import React from 'react';

function ModalSobre({ estaAberto, aoFechar }) {
    if (!estaAberto) return null;

    return (
        <div className="modal-overlay" onClick={aoFechar}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ color: '#333', borderBottom: '2px solid #ffd700', display: 'inline-block', paddingBottom: '5px' }}>
                    Sobre
                </h3>

                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '30px 0', color: '#555' }}>
                    2026 Z&ecirc;nite Tecnologia. Todos os direitos reservados.
                </p>

                <div className="modal-actions" style={{ justifyContent: 'center' }}>
                    <button className="btn-cancel" onClick={aoFechar}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalSobre;