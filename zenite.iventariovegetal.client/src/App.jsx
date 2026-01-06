import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Tabela from './components/Tabela.jsx';
import Formulario from './components/Formulario.jsx';
import ModalConfirmacao from './components/ModalConfirmacao.jsx';

function App() {
    const [estoque, setEstoque] = useState([]); 
    const [formularioAberto, setFormularioAberto] = useState(false); 
    const [modalAberto, setModalAberto] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);

    const adicionarProduto = (novoProduto) => {
        const produtoComId = { ...novoProduto, id: Date.now() };
        setEstoque([...estoque, produtoComId]);
        setFormularioAberto(false);
    };

    const solicitarRemocao = (id) => {
        setIdParaExcluir(id);
        setModalAberto(true);
    };

    const confirmarRemocao = () => {
        if (idParaExcluir !== null) {
            setEstoque(estoque.filter(item => item.id !== idParaExcluir));
        }
        fecharModal();
    };

    const fecharModal = () => {
        setModalAberto(false);
        setIdParaExcluir(null);
    };

    const itensGeladeira = estoque.filter(item => item.geladeira === true);
    const itensSecos = estoque.filter(item => item.geladeira === false);

    const totalGeladeira = itensGeladeira.reduce((acc, item) => acc + item.quantidade, 0);
    const totalSecos = itensSecos.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <div className="layout-container">
            <Header />

            <main className="white-canvas">
                <ModalConfirmacao
                    estaAberto={modalAberto}
                    aoConfirmar={confirmarRemocao}
                    aoCancelar={fecharModal}
                />

                {!formularioAberto ? (
                    <div className="actions-bar">
                        <button
                            className="btn-open-form"
                            onClick={() => setFormularioAberto(true)}
                        >
                            + Novo Produto
                        </button>
                    </div>
                ) : (
                    <Formulario
                        aoCadastrar={adicionarProduto}
                        aoCancelar={() => setFormularioAberto(false)}
                    />
                )}

                <div className="spacer"></div>

                <div className="section-header">
                    <h2>❄️ Estoque Refrigerado</h2>
                    <span className="total-badge">Total: {totalGeladeira.toFixed(2)}</span>
                </div>
                <Tabela
                    listaProdutos={itensGeladeira}
                    aoRemover={solicitarRemocao}
                />

                <div className="spacer"></div>

                <div className="section-header">
                    <h2>📦 Estoque Seco</h2>
                    <span className="total-badge">Total: {totalSecos.toFixed(2)}</span>
                </div>
                <Tabela
                    listaProdutos={itensSecos}
                    aoRemover={solicitarRemocao}
                />

            </main>
        </div>
    );
}

export default App;