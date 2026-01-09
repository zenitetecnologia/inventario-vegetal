import React from 'react';

function Sidebar({ isOpen, onClose, aoClicarSobre, usuario, aoSair }) {
    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={onClose}
            ></div>

            <div className={`sidebar-menu ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Menu</h3>
                    <button className="btn-close" onClick={onClose}>✖</button>
                </div>

                <nav className="sidebar-nav">
                    <a href="#" className="menu-item active" onClick={(e) => { e.preventDefault(); onClose(); }}>
                        Início
                    </a>

                    <a href="#" className="menu-item" onClick={(e) => {
                        e.preventDefault();
                        aoClicarSobre();
                    }}>
                        Sobre
                    </a>
                </nav>

                <div className="sidebar-footer-user">
                    {usuario && (
                        <div className="user-profile">
                            <img
                                src={usuario.picture}
                                alt="Avatar"
                                className="user-avatar"
                                referrerPolicy="no-referrer"
                            />
                            <div className="user-info">
                                <span className="user-name">{usuario.name}</span>
                                <span className="user-email">{usuario.email}</span>
                            </div>
                        </div>
                    )}

                    <button className="btn-logout" onClick={aoSair}>
                        Sair da Conta ➜
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;