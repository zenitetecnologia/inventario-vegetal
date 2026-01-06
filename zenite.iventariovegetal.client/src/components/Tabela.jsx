function Tabela({ listaProdutos, aoRemover }) {

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
                        <th>Descrição</th>
                        <th>Data</th>
                        <th>Qtd</th>
                        <th>Tipo</th>
                        <th style={{ textAlign: 'center' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProdutos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.descricao}</td>
                            <td>{new Date(produto.data).toLocaleDateString()}</td>
                            <td style={{ fontWeight: 'bold' }}>
                                {produto.quantidade}
                            </td>
                            <td>
                                {produto.geladeira ? (
                                    <span className="badge badge-blue">❄️ Geladeira</span>
                                ) : (
                                    <span className="badge badge-gray">📦 Seco</span>
                                )}
                            </td>


                            <td style={{ textAlign: 'center' }}>
                                <button
                                    className="btn-delete"
                                    onClick={() => aoRemover(produto.id)}
                                    title="Excluir Item"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tabela;
