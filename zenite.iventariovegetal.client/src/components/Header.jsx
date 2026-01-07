function Header({ aoAbrirMenu }) {
    return (
        <header className="app-header">

            <button className="btn-menu" onClick={aoAbrirMenu}>
                ☰
            </button>

            <h1>Inventário Vegetal</h1>

            <style>{`
                .app-header {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 0 20px; 
                }
                .btn-menu {
                    background: none;
                    border: none;
                    color: white; 
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                }
            `}</style>
        </header>
    );
}

export default Header;