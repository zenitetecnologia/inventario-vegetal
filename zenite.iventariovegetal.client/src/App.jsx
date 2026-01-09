import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Formulario from './components/Formulario.jsx';
import ModalConfirmacao from './components/ModalConfirmacao.jsx';
import Sidebar from './components/Sidebar';
import GridProdutos from './components/GridProdutos';

function App() {
    // Estado para controlar qual tela está visível: 'geladeira' ou 'prateleira'
    const [abaAtiva, setAbaAtiva] = useState('geladeira');

    const [estoque, setEstoque] = useState([]);
    const [formularioAberto, setFormularioAberto] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState(null);
    const [itemParaEditar, setItemParaEditar] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);

    const API_URL = 'http://localhost:5000/api/ItemEstoque';

    const carregarDados = async () => {
        try {
            const resposta = await fetch(API_URL);
            if (resposta.ok) {
                const dados = await resposta.json();
                setEstoque(dados);
            }
        } catch (erro) {
            console.error("Erro de conexão com o Backend:", erro);
            // Dados de teste
            setEstoque([
                { id: 1, descricao: 'Tucunaré (Caldeira)', quantidade: 13.00, data: '2024-06-13', geladeira: true },
                { id: 2, descricao: 'Farinha Dágua', quantidade: 5.00, data: '2024-06-13', geladeira: false },
                { id: 3, descricao: 'Caupuri 2º Apuro', quantidade: 3.25, data: '2024-06-13', geladeira: true }
            ]);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const salvarProduto = async (produto) => {
        // Força o tipo baseado na aba ativa se for um novo cadastro
        const produtoFormatado = {
            ...produto,
            geladeira: produto.id ? produto.geladeira : (abaAtiva === 'geladeira')
        };

        if (produtoFormatado.id) {
            await fetch(`${API_URL}/${produtoFormatado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produtoFormatado)
            });
        } else {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produtoFormatado)
            });
        }
        carregarDados();
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

    const confirmarRemocao = async () => {
        if (idParaExcluir !== null) {
            await fetch(`${API_URL}/${idParaExcluir}`, { method: 'DELETE' });
            carregarDados();
        }
        fecharModal();
    };

    const fecharModal = () => {
        setModalAberto(false);
        setIdParaExcluir(null);
    };

    // Filtros e Cálculos baseados na aba atual
    const itensGeladeira = estoque.filter(item => item.geladeira === true);
    const itensSecos = estoque.filter(item => item.geladeira === false);

    // Define qual lista mostrar na tela
    const listaAtual = abaAtiva === 'geladeira' ? itensGeladeira : itensSecos;
    const totalAtual = listaAtual.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <div className="layout-container">
            <Sidebar isOpen={menuAberto} onClose={() => setMenuAberto(false)} />
            <Header aoAbrirMenu={() => setMenuAberto(true)} />

            <main className="white-canvas" style={{ padding: 0 }}>
                <ModalConfirmacao
                    estaAberto={modalAberto}
                    aoConfirmar={confirmarRemocao}
                    aoCancelar={fecharModal}
                />

                {formularioAberto ? (
                    <div style={{ padding: '20px' }}>
                        <Formulario
                            aoCadastrar={salvarProduto}
                            aoCancelar={cancelarFormulario}
                            itemInicial={itemParaEditar}
                        />
                    </div>
                ) : (
                    <>
                        {/* BARRA DE TOTAL DA TELA ATUAL */}
                        <div className="barra-total">
                            <span>TOTAL</span>
                            <span className="valor-total">
                                {totalAtual.toFixed(2).replace('.', ',')}
                            </span>
                            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#888' }}>
                                {abaAtiva === 'geladeira' ? 'Geladeira' : 'Prateleira'}
                            </span>
                        </div>

                        {/* LISTA DE PRODUTOS */}
                        <GridProdutos
                            listaProdutos={listaAtual}
                            aoRemover={solicitarRemocao}
                            aoEditar={prepararEdicao}
                        />
                    </>
                )}
            </main>

            {/* BOTÃO FLUTUANTE DE ADICIONAR (+) */}
            {!formularioAberto && (
                <div className="fab-container">
                    <button className="btn-fab" onClick={() => setFormularioAberto(true)}>
                        +
                    </button>
                </div>
            )}

            {/* BARRA DE NAVEGAÇÃO INFERIOR */}
            <nav className="bottom-nav">
                <button
                    className={`nav-item ${abaAtiva === 'geladeira' ? 'active' : ''}`}
                    onClick={() => setAbaAtiva('geladeira')}
                >
                    <span className="nav-icon">❄️</span>
                    <span>Geladeira</span>
                </button>

                <button
                    className={`nav-item ${abaAtiva === 'prateleira' ? 'active' : ''}`}car
                    onClick={() => setAbaAtiva('prateleira')}
                >
                    <span className="nav-icon">📦</span>
                    <span>Prateleira</span>
                </button>
            </nav>
        </div>
    );
}

export default App;