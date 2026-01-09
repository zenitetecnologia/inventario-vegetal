import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Formulario from './components/Formulario.jsx';
import ModalConfirmacao from './components/ModalConfirmacao.jsx';
import ModalSobre from './components/ModalSobre.jsx';
import Sidebar from './components/SideBar';
import GridProdutos from './components/GridProdutos';

const API_URL = 'http://localhost:5000/api/ItemEstoque';

function App() {
    const [abaAtiva, setAbaAtiva] = useState('geladeira');
    const [estoque, setEstoque] = useState([]);

    const [formularioAberto, setFormularioAberto] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [sobreAberto, setSobreAberto] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false);

    const [idParaExcluir, setIdParaExcluir] = useState(null);
    const [itemParaEditar, setItemParaEditar] = useState(null);

    const carregarDados = useCallback(async () => {
        try {
            const resposta = await fetch(API_URL);
            if (resposta.ok) {
                const dados = await resposta.json();
                setEstoque(dados);
            }
        } catch (erro) {
            console.error(erro);
        }
    }, []);

    useEffect(() => {
        const buscar = async () => {
            await carregarDados();
        };
        buscar();
    }, [carregarDados]);

    const salvarProduto = async (produto) => {
        const produtoFormatado = {
            ...produto,
            geladeira: produto.id ? produto.geladeira : (abaAtiva === 'geladeira')
        };

        try {
            let resposta;
            if (produtoFormatado.id) {
                resposta = await fetch(`${API_URL}/${produtoFormatado.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(produtoFormatado)
                });
            } else {
                resposta = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(produtoFormatado)
                });
            }

            if (resposta.ok) {
                carregarDados();
                setFormularioAberto(false);
                setItemParaEditar(null);
            }
        } catch (erro) {
            console.error(erro);
        }
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
            try {
                await fetch(`${API_URL}/${idParaExcluir}`, { method: 'DELETE' });
                carregarDados();
            } catch (erro) {
                console.error(erro);
            }
        }
        fecharModal();
    };

    const fecharModal = () => {
        setModalAberto(false);
        setIdParaExcluir(null);
    };

    const abrirSobre = () => {
        setMenuAberto(false);
        setSobreAberto(true);
    };

    const itensGeladeira = estoque.filter(item => item.geladeira === true);
    const itensSecos = estoque.filter(item => item.geladeira === false);

    const listaAtual = abaAtiva === 'geladeira' ? itensGeladeira : itensSecos;
    const totalAtual = listaAtual.reduce((acc, item) => acc + item.quantidade, 0);

    return (
        <div className="layout-container">
            <Sidebar
                isOpen={menuAberto}
                onClose={() => setMenuAberto(false)}
                aoClicarSobre={abrirSobre}
            />

            <Header aoAbrirMenu={() => setMenuAberto(true)} />

            <main className="white-canvas" style={{ padding: 0 }}>

                <ModalConfirmacao
                    estaAberto={modalAberto}
                    aoConfirmar={confirmarRemocao}
                    aoCancelar={fecharModal}
                />

                <ModalSobre
                    estaAberto={sobreAberto}
                    aoFechar={() => setSobreAberto(false)}
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
                        <div className="barra-total">
                            <span>TOTAL</span>
                            <span className="valor-total">
                                {totalAtual.toFixed(2).replace('.', ',')}
                            </span>
                            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#888' }}>
                                {abaAtiva === 'geladeira' ? 'Geladeira' : 'Prateleira'}
                            </span>
                        </div>

                        <GridProdutos
                            listaProdutos={listaAtual}
                            aoRemover={solicitarRemocao}
                            aoEditar={prepararEdicao}
                        />
                    </>
                )}
            </main>

            {!formularioAberto && (
                <div className="fab-container">
                    <button className="btn-fab" onClick={() => setFormularioAberto(true)}>
                        +
                    </button>
                </div>
            )}

            <nav className="bottom-nav">
                <button
                    className={`nav-item ${abaAtiva === 'geladeira' ? 'active' : ''}`}
                    onClick={() => setAbaAtiva('geladeira')}
                >
                    <span className="nav-icon">❄️</span>
                    <span>Geladeira</span>
                </button>

                <button
                    className={`nav-item ${abaAtiva === 'prateleira' ? 'active' : ''}`}
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