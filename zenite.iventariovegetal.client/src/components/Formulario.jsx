import { useState } from 'react';

function Formulario({ aoCadastrar, aoCancelar }) {
    const [item, setItem] = useState({
        descricao: '',
        quantidade: '',
        data: new Date().toISOString().split('T')[0],
        geladeira: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item.descricao || !item.quantidade) return;

        aoCadastrar({ ...item, quantidade: Number(item.quantidade) });

        setItem({ descricao: '', quantidade: '', data: new Date().toISOString().split('T')[0], geladeira: false });
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>

            <div className="form-group grow">
                <label>Descrição</label>
                <input
                    type="text"
                    autoFocus
                    placeholder="Ex: Tucunacá"
                    value={item.descricao}
                    onChange={e => setItem({ ...item, descricao: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Quantidade</label>
                <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={item.quantidade}
                    onChange={e => setItem({ ...item, quantidade: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label>Data</label>
                <input
                    type="date"
                    value={item.data}
                    onChange={e => setItem({ ...item, data: e.target.value })}
                />
            </div>

            <div className="form-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={item.geladeira}
                        onChange={e => setItem({ ...item, geladeira: e.target.checked })}
                    />
                    Geladeira?
                </label>
            </div>


            <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={aoCancelar}>
                    Cancelar
                </button>
                <button type="submit" className="btn-add">
                    + Adicionar
                </button>
            </div>
        </form>
    );
}

export default Formulario;