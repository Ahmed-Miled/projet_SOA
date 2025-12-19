import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const PersonForm = ({ show, onHide, onSave, person }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pré-remplir le formulaire si on modifie une personne
  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name || "",
        age: person.age || "",
      });
    } else {
      setFormData({
        name: "",
        age: "",
      });
    }
    setErrors({});
  }, [person, show]);

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est obligatoire";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Le nom ne peut pas dépasser 50 caractères";
    }

    // Validation de l'âge
    if (!formData.age) {
      newErrors.age = "L'âge est obligatoire";
    } else if (isNaN(formData.age)) {
      newErrors.age = "L'âge doit être un nombre";
    } else if (parseInt(formData.age) < 1) {
      newErrors.age = "L'âge doit être supérieur à 0";
    } else if (parseInt(formData.age) > 150) {
      newErrors.age = "L'âge doit être inférieur à 150";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion du changement des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const personData = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
      };

      // Si on modifie, ajouter l'ID
      if (person) {
        personData.id = person.id;
      }

      await onSave(personData);
      handleClose();
    } catch (error) {
      setErrors({
        submit: "Erreur lors de l'enregistrement. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fermeture du modal
  const handleClose = () => {
    setFormData({ name: "", age: "" });
    setErrors({});
    setIsSubmitting(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {person ? (
            <>
              <i className="bi bi-pencil-square me-2"></i>
              Modifier la personne
            </>
          ) : (
            <>
              <i className="bi bi-person-plus me-2"></i>
              Ajouter une personne
            </>
          )}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {errors.submit && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setErrors((prev) => ({ ...prev, submit: null }))}
            >
              {errors.submit}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>
              Nom <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Entrez le nom"
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Âge <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              isInvalid={!!errors.age}
              placeholder="Entrez l'âge"
              min="1"
              max="150"
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="btn-gradient"
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Enregistrement...
              </>
            ) : (
              <>
                <i className="bi bi-check-circle me-2"></i>
                {person ? "Mettre à jour" : "Ajouter"}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PersonForm;
