import { WarningAmber } from '@mui/icons-material';

function ModalConfirmacao({ estaAberto, aoConfirmar, aoCancelar }) {
    if (!estaAberto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <WarningAmber color="error" /> Confirmar Exclusão
                </h3>
                <p>Tem certeza que deseja remover este item?</p>

                <div className="modal-actions">
                    <button className="btn-cancel" onClick={aoCancelar}>
                        Cancelar
                    </button>
                    <button className="btn-confirm-delete" onClick={aoConfirmar}>
                        Sim, Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirmacao;