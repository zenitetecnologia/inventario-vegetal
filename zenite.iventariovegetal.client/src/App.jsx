import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from "jwt-decode";
import { googleLogout } from '@react-oauth/google';
import './App.css';
import Header from './components/Header';
import Formulario from './components/Formulario.jsx';
import ModalConfirmacao from './components/ModalConfirmacao.jsx';
import ModalSobre from './components/ModalSobre.jsx';
import Sidebar from './components/SideBar';
import GridProdutos from './components/GridProdutos';
import Login from './components/Login.jsx';

const API_URL = 'http://localhost:5000/api/ItemEstoque';

function App() {
    const [usuario, setUsuario] = useState(null);
    const [abaAtiva, setAbaAtiva] = useState('prateleira');
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
        } catch (erro) { console.error(erro); }
    }, []);

    useEffect(() => {
        if (usuario) {
            const timeoutId = setTimeout(() => { carregarDados(); }, 0);
            return () => clearTimeout(timeoutId);
        }
    }, [usuario, carregarDados]);

    const lidarComLoginGoogle = (credentialResponse) => {
        try {
            if (credentialResponse.credential) {
                const dadosUsuario = jwtDecode(credentialResponse.credential);
                setUsuario(dadosUsuario);
            }
        } catch (error) { console.error(error); }
    };

    const fazerLogout = () => {
        googleLogout();
        setUsuario(null);
        setMenuAberto(false);
    };

    if (!usuario) {
        return <Login aoFazerLogin={lidarComLoginGoogle} />;
    }

    const salvarProduto = async (produto) => {
        const produtoFormatado = {
            ...produto,
            geladeira: produto.id ? produto.geladeira : (abaAtiva === 'geladeira')
        };

        try {
            const url = produtoFormatado.id ? `${API_URL}/${produtoFormatado.id}` : API_URL;
            const metodo = produtoFormatado.id ? 'PUT' : 'POST';

            const resposta = await fetch(url, {
                method: metodo,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produtoFormatado)
            });

            if (resposta.ok) {
                carregarDados();
                setFormularioAberto(false);
                setItemParaEditar(null);
            }
        } catch (erro) {
            console.error(erro);
        }
    };

    const prepararEdicao = (produto) => { setItemParaEditar(produto); setFormularioAberto(true); };
    const solicitarRemocao = (id) => { setIdParaExcluir(id); setModalAberto(true); };

    const confirmarRemocao = async () => {
        if (idParaExcluir !== null) {
            try {
                await fetch(`${API_URL}/${idParaExcluir}`, { method: 'DELETE' });
                carregarDados();
            } catch (erro) {
                console.error(erro);
            }
        }
        setModalAberto(false);
        setIdParaExcluir(null);
    };

    const listaAtual = estoque.filter(item =>
        abaAtiva === 'geladeira' ? item.geladeira === true : item.geladeira === false
    );
    const totalAtual = listaAtual.reduce((acc, item) => acc + (Number(item.quantidade) || 0), 0);

    return (
        <div className="layout-container">
            <Sidebar
                isOpen={menuAberto}
                onClose={() => setMenuAberto(false)}
                aoClicarSobre={() => { setMenuAberto(false); setSobreAberto(true); }}
                usuario={usuario}
                aoSair={fazerLogout}
            />

            <Header aoAbrirMenu={() => setMenuAberto(true)} />

            <main className="white-canvas" style={{ padding: 0 }}>
                <ModalConfirmacao
                    estaAberto={modalAberto}
                    aoConfirmar={confirmarRemocao}
                    aoCancelar={() => setModalAberto(false)}
                />
                <ModalSobre estaAberto={sobreAberto} aoFechar={() => setSobreAberto(false)} />

                {formularioAberto ? (
                    <Formulario
                        aoCadastrar={salvarProduto}
                        aoCancelar={() => { setFormularioAberto(false); setItemParaEditar(null); }}
                        itemInicial={itemParaEditar}
                    />
                ) : (
                    <>
                        <div className="barra-total">
                            <span>TOTAL</span>
                            <span className="valor-total">{totalAtual.toFixed(2).replace('.', ',')}</span>
                            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#888' }}>
                                {abaAtiva === 'geladeira' ? 'Refrigerado' : 'Prateleira'}
                            </span>
                        </div>
                        <GridProdutos listaProdutos={listaAtual} aoRemover={solicitarRemocao} aoEditar={prepararEdicao} />
                    </>
                )}
            </main>

            {!formularioAberto && (
                <div className="fab-container">
                    <button className="btn-fab" onClick={() => setFormularioAberto(true)}>+</button>
                </div>
            )}

            <nav className="bottom-nav">
                <button className={`nav-item ${abaAtiva === 'prateleira' ? 'active' : ''}`} onClick={() => setAbaAtiva('prateleira')}>
                    <span className="nav-icon">📦</span><span>Prateleira</span>
                </button>
                <button className={`nav-item ${abaAtiva === 'geladeira' ? 'active' : ''}`} onClick={() => setAbaAtiva('geladeira')}>
                    <span className="nav-icon">❄️</span><span>Geladeira</span>
                </button>
            </nav>
        </div>
    );
}

export default App;