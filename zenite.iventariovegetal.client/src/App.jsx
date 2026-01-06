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
    const [itemParaEditar, setItemParaEditar] = useState(null);

    const salvarProduto = (produto) => {
        if (produto.id) {
            setEstoque(estoque.map(p => p.id === produto.id ? produto : p));
        } else {
            const produtoComId = { ...produto, id: Date.now() };
            setEstoque([...estoque, produtoComId]);
        }
        setFormularioAberto(false);
        setItemParaEditar(null);
    };

    const prepararEdicao = (produto) => {
        setItemParaEditar(produto);
        setFormularioAberto(true);
    };

    const cancelarFormulario = () => {
        setFormularioAberto(false);
        setItemParaEditar(null);
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
                            + Novo Item
                        </button>
                    </div>
                ) : (
                    <Formulario
                        aoCadastrar={salvarProduto}
                        aoCancelar={cancelarFormulario}
                        itemInicial={itemParaEditar}
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
                    aoEditar={prepararEdicao}
                />

                <div className="spacer"></div>

                <div className="section-header">
                    <h2>📦 Estoque Seco</h2>
                    <span className="total-badge">Total: {totalSecos.toFixed(2)}</span>
                </div>
                <Tabela
                    listaProdutos={itensSecos}
                    aoRemover={solicitarRemocao}
                    aoEditar={prepararEdicao}
                />

            </main>
        </div>
    );
}

export default App;