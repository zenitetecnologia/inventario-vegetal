import { useState } from 'react';
import { Add, Remove, CalendarToday, Description } from '@mui/icons-material';

function Formulario({ aoCadastrar, aoCancelar, itemInicial }) {

    const [item, setItem] = useState(() => {
        if (itemInicial) {
            return {
                ...itemInicial,
                data: itemInicial.data ? itemInicial.data.split('T')[0] : ''
            };
        } else {
            return {
                descricao: '',
                quantidade: 0,
                data: new Date().toISOString().split('T')[0],
                geladeira: false
            };
        }
    });

    const alterarQuantidade = (valor) => {
        const qtdAtual = parseFloat(item.quantidade) || 0;
        const novaQtd = (qtdAtual + valor).toFixed(2);

        if (parseFloat(novaQtd) >= 0) {
            setItem({ ...item, quantidade: novaQtd });
        }
    };

    const lidarComMudancaManual = (e) => {
        const valor = e.target.value;
        if (valor === '' || parseFloat(valor) >= 0) {
            setItem({ ...item, quantidade: valor });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item.descricao) return;
        aoCadastrar({ ...item, quantidade: Number(item.quantidade) });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-header-line"></div>

            <div className="form-group">
                <label className="modern-label"><Description fontSize="small" /> Descrição</label>
                <input
                    className="modern-input"
                    type="text"
                    value={item.descricao}
                    autoFocus
                    onChange={e => setItem({ ...item, descricao: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="modern-label">Quantidade</label>
                <div className="modern-stepper">
                    <button type="button" className="stepper-btn-mini" onClick={() => alterarQuantidade(-0.01)}>
                        <Remove fontSize="small" />
                    </button>

                    <input
                        type="number"
                        className="stepper-input-clean"
                        value={item.quantidade}
                        onChange={lidarComMudancaManual}
                        step="0.01"
                        min="0"
                    />

                    <button type="button" className="stepper-btn-mini" onClick={() => alterarQuantidade(0.01)}>
                        <Add fontSize="small" />
                    </button>
                </div>
            </div>

            {/* Agrupando Data e Geladeira na mesma linha para compactar */}
            <div className="form-row">
                <div className="form-group half">
                    <label className="modern-label"><CalendarToday fontSize="small" /> Data</label>
                    <input
                        className="modern-input"
                        type="date"
                        value={item.data}
                        onChange={e => setItem({ ...item, data: e.target.value })}
                    />
                </div>

                <div className="form-group half">
                    <label className="modern-label">Geladeira</label>
                    <div className="modern-toggle">
                        <button
                            type="button"
                            className={`toggle-pill ${!item.geladeira ? 'active' : ''}`}
                            onClick={() => setItem({ ...item, geladeira: false })}
                        >
                            Não
                        </button>
                        <button
                            type="button"
                            className={`toggle-pill ${item.geladeira ? 'active' : ''}`}
                            onClick={() => setItem({ ...item, geladeira: true })}
                        >
                            Sim
                        </button>
                    </div>
                </div>
            </div>

            <div className="form-actions-modern">
                <button type="button" className="btn-modern secondary" onClick={aoCancelar}>
                    Cancelar
                </button>
                <button type="submit" className="btn-modern primary">
                    Salvar
                </button>
            </div>
        </form>
    );
}

export default Formulario;