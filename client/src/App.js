import React, { useState, useEffect } from "react";
import { Container, Button, Alert, Spinner, Modal } from "react-bootstrap";
import PersonService from "./PersonService";
import PersonList from "./PersonList";
import PersonForm from "./PersonForm";
import SearchBar from "./SearchBar";
//import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Charger toutes les personnes au démarrage
  useEffect(() => {
    loadPersons();
  }, []);

  // Charger toutes les personnes
  const loadPersons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await PersonService.getAllPersons();
      setPersons(data);
      setFilteredPersons(data);
      setIsSearching(false);
    } catch (err) {
      setError(
        "Impossible de charger les personnes. Assurez-vous que le serveur est démarré sur http://localhost:8080/serveur"
      );
      console.error("Error loading persons:", err);
    } finally {
      setLoading(false);
    }
  };

  // Afficher le message de succès temporairement
  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Ouvrir le formulaire pour ajouter
  const handleAdd = () => {
    setSelectedPerson(null);
    setShowForm(true);
  };

  // Ouvrir le formulaire pour modifier
  const handleEdit = (person) => {
    setSelectedPerson(person);
    setShowForm(true);
  };

  // Sauvegarder (créer ou modifier)
  const handleSave = async (personData) => {
    try {
      if (selectedPerson) {
        // Mise à jour
        await PersonService.updatePerson(selectedPerson.id, personData);
        showSuccess(`${personData.name} a été modifié(e) avec succès !`);
      } else {
        // Création
        await PersonService.createPerson(personData);
        showSuccess(`${personData.name} a été ajouté(e) avec succès !`);
      }
      loadPersons();
      setShowForm(false);
    } catch (err) {
      console.error("Error saving person:", err);
      throw err;
    }
  };

  // Confirmer la suppression
  const confirmDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    setPersonToDelete(person);
    setShowDeleteModal(true);
  };

  // Supprimer une personne
  const handleDelete = async () => {
    try {
      await PersonService.deletePerson(personToDelete.id);
      showSuccess(`${personToDelete.name} a été supprimé(e) avec succès !`);
      setShowDeleteModal(false);
      setPersonToDelete(null);
      loadPersons();
    } catch (err) {
      setError("Erreur lors de la suppression. Veuillez réessayer.");
      console.error("Error deleting person:", err);
    }
  };

  // Rechercher
  const handleSearch = async (searchType, searchValue) => {
    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);

      if (searchType === "id") {
        // Recherche par ID
        const person = await PersonService.getPersonById(parseInt(searchValue));
        setFilteredPersons([person]);
      } else {
        // Recherche par nom
        const results = await PersonService.searchPersonsByName(searchValue);
        setFilteredPersons(results);
        if (results.length === 0) {
          setError(`Aucune personne trouvée avec le nom "${searchValue}"`);
        }
      }
    } catch (err) {
      setError(
        `Aucune personne trouvée avec ${
          searchType === "id" ? "l'ID" : "le nom"
        } "${searchValue}"`
      );
      setFilteredPersons([]);
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };

  // Effacer la recherche
  const handleClearSearch = () => {
    setFilteredPersons(persons);
    setIsSearching(false);
    setError(null);
  };

  return (
    <div className="app-container">
      <Container>
        {/* En-tête */}
        <div className="text-center mb-4 text-white">
          <h1 className="display-4 fw-bold">
            <i className="bi bi-people-fill me-3"></i>
            Gestion des Personnes
          </h1>
          <p className="lead">Application React avec Bootstrap - REST API</p>
        </div>

        {/* Messages de succès */}
        {successMessage && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setSuccessMessage(null)}
            className="fade-in"
          >
            <i className="bi bi-check-circle-fill me-2"></i>
            {successMessage}
          </Alert>
        )}

        {/* Messages d'erreur */}
        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setError(null)}
            className="fade-in"
          >
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        {/* Barre de recherche */}
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

        {/* Bouton Ajouter + Stats */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="text-white">
            <h5>
              {isSearching ? (
                <>
                  <i className="bi bi-funnel-fill me-2"></i>
                  Résultats de recherche: {filteredPersons.length}
                </>
              ) : (
                <>
                  <i className="bi bi-list-ul me-2"></i>
                  Total: {persons.length} personne(s)
                </>
              )}
            </h5>
          </div>
          <div className="d-flex gap-2">
            {isSearching && (
              <Button variant="outline-light" onClick={handleClearSearch}>
                <i className="bi bi-arrow-left me-2"></i>
                Voir tout
              </Button>
            )}
            <Button variant="light" size="lg" onClick={handleAdd}>
              <i className="bi bi-person-plus-fill me-2"></i>
              Ajouter une personne
            </Button>
          </div>
        </div>

        {/* Liste des personnes */}
        <div className="bg-white rounded p-4 shadow">
          {loading ? (
            <div className="spinner-container">
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
            </div>
          ) : (
            <PersonList
              persons={filteredPersons}
              onEdit={handleEdit}
              onDelete={confirmDelete}
            />
          )}
        </div>

        {/* Formulaire d'ajout/modification */}
        <PersonForm
          show={showForm}
          onHide={() => setShowForm(false)}
          onSave={handleSave}
          person={selectedPerson}
        />

        {/* Modal de confirmation de suppression */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
              Confirmer la suppression
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {personToDelete && (
              <p>
                Êtes-vous sûr de vouloir supprimer{" "}
                <strong>{personToDelete.name}</strong> ? Cette action est
                irréversible.
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Annuler
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              <i className="bi bi-trash me-2"></i>
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Footer */}
        <div className="text-center mt-5 text-white">
          <p className="mb-0">
            <i className="bi bi-server me-2"></i>
            Backend API: <a href="http://localhost:8080/serveur/api/persons"> http://localhost:8080/serveur/api/persons</a>
          </p>
        </div>
      </Container>
    </div>
  );
}

export default App;
