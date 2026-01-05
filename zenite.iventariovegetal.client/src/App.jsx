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
    const totalGeladeira = itensGeladeira.reduce((acc, item) => acc + item.quantidade, 0);
    const totalSecos = itensSecos.reduce((acc, item) => acc + item.quantidade, 0);

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
            <div className="section-header">
                <h2>❄️ Estoque Refrigerado</h2>
                <span className="total-badge">
                    Total: {totalGeladeira.toFixed(2)}
                </span>
            </div>
            <div className="section-header">
                <h2>📦 Estoque Seco</h2>
                <span className="total-badge">
                    Total: {totalSecos.toFixed(2)}
                </span>
            </div>

        </div>
    );
}

export default App;