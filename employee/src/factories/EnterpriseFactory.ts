import EnterpriseDTO from "../DTOs/EnterpriseDTO";
import Enterprise from "../models/entities/Enterprise";

class EnterpriseFactory {
    create(data: EnterpriseDTO) {
        const enterprise = new Enterprise(data.nome, data.cnpj, data.endereco, data.idIntegracao);
        enterprise.id = data.id || 0;
        return enterprise;
    }
}

export default EnterpriseFactory;