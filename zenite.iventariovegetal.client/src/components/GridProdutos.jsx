import React from 'react';
import { Delete, Edit } from '@mui/icons-material';

function GridProdutos({ listaProdutos, aoRemover, aoEditar }) {
    if (listaProdutos.length === 0) {
        return <div className="empty-state">Nenhum item registrado.</div>;
    }

    return (
        <div className="grid-container">
            {listaProdutos.map((item) => (
                <div key={item.id} className="item-lista">

                    <div className="item-info">
                        <span className="item-descricao">
                            {item.descricao}
                        </span>
                        <span className="item-qtd">
                            {Number(item.quantidade).toFixed(2).replace('.', ',')}
                        </span>
                    </div>

                    <div className="item-actions">
                        <button className="btn-icon delete" onClick={() => aoRemover(item.id)}>
                            <Delete />
                        </button>
                        <button className="btn-icon edit" onClick={() => aoEditar(item)}>
                            <Edit />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GridProdutos;