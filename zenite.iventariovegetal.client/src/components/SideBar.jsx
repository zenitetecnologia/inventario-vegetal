import React from 'react';
import { Close, Logout } from '@mui/icons-material';

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
                    <button className="btn-close" onClick={onClose}>
                        <Close />
                    </button>
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

                    <button className="btn-logout" onClick={aoSair} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Sair da Conta <Logout fontSize="small" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Sidebar;