import axios from "axios";

// Configuration de l'API
const API_BASE_URL = "http://localhost:8080/serveur/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Service pour gérer les personnes
const PersonService = {
  // Récupérer toutes les personnes
  getAllPersons: async () => {
    try {
      const response = await api.get("/persons");
      return response.data;
    } catch (error) {
      console.error("Error fetching persons:", error);
      throw error;
    }
  },

  // Récupérer une personne par ID
  getPersonById: async (id) => {
    try {
      const response = await api.get(`/persons/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching person with id ${id}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle personne
  createPerson: async (person) => {
    try {
      const response = await api.post("/persons", person);
      return response.data;
    } catch (error) {
      console.error("Error creating person:", error);
      throw error;
    }
  },

  // Mettre à jour une personne
  updatePerson: async (id, person) => {
    try {
      const response = await api.put(`/persons/${id}`, person);
      return response.data;
    } catch (error) {
      console.error(`Error updating person with id ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une personne
  deletePerson: async (id) => {
    try {
      await api.delete(`/persons/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting person with id ${id}:`, error);
      throw error;
    }
  },

  // Rechercher des personnes par nom (filtrage côté client)
  searchPersonsByName: async (name) => {
    try {
      const allPersons = await PersonService.getAllPersons();
      return allPersons.filter((person) =>
        person.name.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error) {
      console.error("Error searching persons:", error);
      throw error;
    }
  },
};

export default PersonService;
