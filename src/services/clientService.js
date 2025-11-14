import clientRepo from "../repositories/clientRepository.js";

export default {
  createClient: async (data) => {
    return clientRepo.create(data);
  },
  updateClient: async (id, data) => {
    await clientRepo.update(id, data);
    return clientRepo.findById(id);
  },
  getClients: () => clientRepo.findAll(),
  getClientById: (id) => clientRepo.findById(id)
};
