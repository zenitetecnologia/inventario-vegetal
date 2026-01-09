import { useState } from 'react';

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
                quantidade: 0.00,
                data: new Date().toISOString().split('T')[0],
                geladeira: false
            };
        }
    });

    const alterarQuantidade = (valor) => {
        const novaQtd = parseFloat(item.quantidade) + valor;
        if (novaQtd >= 0) {
            setItem({ ...item, quantidade: novaQtd });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item.descricao) return;
        aoCadastrar({ ...item, quantidade: Number(item.quantidade) });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Descrição <span style={{ color: '#ffd700' }}>*</span></label>
                <input
                    className="custom-input"
                    type="text"
                    value={item.descricao}
                    onChange={e => setItem({ ...item, descricao: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Quantidade <span style={{ color: '#ffd700' }}>*</span></label>
                <div className="stepper-container">
                    <span className="stepper-input">
                        {Number(item.quantidade).toFixed(2).replace('.', ',')}
                    </span>

                    <button type="button" className="stepper-btn" onClick={() => alterarQuantidade(-1)}>
                        −
                    </button>
                    <button type="button" className="stepper-btn" onClick={() => alterarQuantidade(1)}>
                        +
                    </button>
                </div>
            </div>

            <div className="form-group">
                <label>Data</label>
                <input
                    className="custom-input"
                    type="date"
                    value={item.data}
                    onChange={e => setItem({ ...item, data: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Geladeira <span style={{ color: '#ffd700' }}>*</span></label>
                <div className="toggle-group">
                    <button
                        type="button"
                        className={`toggle-btn ${!item.geladeira ? 'selected' : ''}`}
                        onClick={() => setItem({ ...item, geladeira: false })}
                    >
                        N
                    </button>
                    <button
                        type="button"
                        className={`toggle-btn ${item.geladeira ? 'selected' : ''}`}
                        onClick={() => setItem({ ...item, geladeira: true })}
                    >
                        Y
                    </button>
                </div>
            </div>


            <div className="form-actions">
                <button type="button" className="btn-text cancel" onClick={aoCancelar}>
                    Cancel
                </button>
                <button type="submit" className="btn-text save">
                    Save
                </button>
            </div>
        </form>
    );
}

export default Formulario;