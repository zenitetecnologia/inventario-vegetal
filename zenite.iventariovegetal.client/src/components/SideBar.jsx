import React from 'react';

function Sidebar({ isOpen, onClose }) {
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
                    <a href="#" className="menu-item active"> Início</a>
                    <a href="#" className="menu-item"> Sobre</a>
                    <a href="#" className="menu-item"> Configurações</a>
                </nav>

                <div className="sidebar-footer">
                    <span>Versão 1.0</span>
                </div>
            </div>
        </>
    );
}

export default Sidebar;