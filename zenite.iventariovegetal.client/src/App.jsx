import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Tabela from './components/Tabela.jsx';

function App() {
    const [estoque, setEstoque] = useState([]);

    const removerItem = (id) => {
        if (!confirm("Tem certeza que deseja apagar?")) return;
        setEstoque(estoque.filter(item => item.id !== id));
    };

    const itensGeladeira = estoque.filter(item => item.geladeira === true);
    const itensSecos = estoque.filter(item => item.geladeira === false);

    return (
        <div className="layout-container">
            <Header />

            <main className="white-canvas">

                {/*geladeira sim*/}
                <div className="section-header">
                    <h2>❄️ Estoque Refrigerado (Geladeira)</h2>
                </div>
                <Tabela
                    listaProdutos={itensGeladeira}
                    aoRemover={removerItem}
                />

                <div className="spacer"></div>

                {/*geladeira nao*/}
                <div className="section-header">
                    <h2>📦 Estoque Seco (Ambiente)</h2>
                </div>
                <Tabela
                    listaProdutos={itensSecos}
                    aoRemover={removerItem}
                />

            </main>
        </div>
    );
}

export default App;