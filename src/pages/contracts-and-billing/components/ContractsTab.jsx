import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import apiClient from '../../../services/api';
// Aquí irían los componentes de la tabla y el modal para contratos.
// Por ahora, lo mantenemos simple para ilustrar la estructura.

const ContractsTab = () => {
    const [contracts, setContracts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/contracts')
            .then(response => setContracts(response.data))
            .catch(error => console.error("Error fetching contracts:", error))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">Listado de Contratos</h2>
                    <p className="text-muted-foreground">Visualiza y administra todos los contratos.</p>
                </div>
                <Button iconName="FilePlus">Registrar Contrato</Button>
            </div>
            {/* Aquí iría el componente ContractsTable, pasando {contracts} */}
            {isLoading 
                ? <p>Cargando contratos...</p> 
                : <p>{contracts.length} contratos encontrados.</p>
            }
        </div>
    );
};

export default ContractsTab;