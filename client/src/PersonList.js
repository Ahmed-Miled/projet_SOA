import React from "react";
import { Card, Button, Badge, Row, Col } from "react-bootstrap";

const PersonList = ({ persons, onEdit, onDelete }) => {
  if (!persons || persons.length === 0) {
    return (
      <div className="text-center py-5">
        <i
          className="bi bi-inbox"
          style={{ fontSize: "3rem", color: "#999" }}
        ></i>
        <p className="mt-3 text-muted">
          Aucune personne trouvée. Ajoutez-en une !
        </p>
      </div>
    );
  }

  return (
    <Row>
      {persons.map((person) => (
        <Col key={person.id} md={6} lg={4} className="mb-4">
          <Card className="person-card fade-in h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="mb-1">{person.name}</h5>
                  <Badge bg="secondary" className="badge-custom">
                    ID: {person.id}
                  </Badge>
                </div>
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "2.5rem", color: "#667eea" }}
                ></i>
              </div>

              <Card.Text>
                <strong>Âge:</strong> {person.age} ans
              </Card.Text>

              <div className="d-flex gap-2 mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-fill btn-gradient"
                  onClick={() => onEdit(person)}
                >
                  <i className="bi bi-pencil-square me-1"></i>
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="flex-fill"
                  onClick={() => onDelete(person.id)}
                >
                  <i className="bi bi-trash me-1"></i>
                  Supprimer
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default PersonList;
