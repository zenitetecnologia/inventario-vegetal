import { Component } from 'react';
import { Kitchen, Inventory2, Edit, Delete } from '@mui/icons-material';

class Tabela extends Component {
    render() {
        const { listaProdutos, aoRemover, aoEditar } = this.props;

        if (!listaProdutos || listaProdutos.length === 0) {
            return (
                <div className="empty-state">
                    <p>Nenhum item registrado nesta categoria.</p>
                </div>
            );
        }

        return (
            <div className="table-container">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th style={{ width: '30%', textAlign: 'left' }}>Descrição</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Data</th>
                            <th style={{ width: '10%', textAlign: 'center' }}>Qtd</th>
                            <th style={{ width: '15%', textAlign: 'center' }}>Tipo</th>
                            <th style={{ width: '30%', textAlign: 'center' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProdutos.map((produto) => (
                            <tr key={produto.id}>
                                <td style={{ textAlign: 'left' }}>
                                    {produto.descricao}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {new Date(produto.data).toLocaleDateString()}
                                </td>
                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                    {produto.quantidade}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    {produto.geladeira ? (
                                        <span className="badge badge-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                            <Kitchen fontSize="small" /> Geladeira
                                        </span>
                                    ) : (
                                        <span className="badge badge-gray" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                            <Inventory2 fontSize="small" /> Seco
                                        </span>
                                    )}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        className="btn-edit"
                                        onClick={() => aoEditar(produto)}
                                        title="Editar"
                                        style={{ marginRight: '10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        <Edit fontSize="small" /> Editar
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => aoRemover(produto.id)}
                                        title="Excluir"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        <Delete fontSize="small" /> Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Tabela;