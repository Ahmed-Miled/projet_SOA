import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";

const SearchBar = ({ onSearch, onClear }) => {
  const [searchType, setSearchType] = useState("name"); // 'name' ou 'id'
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchType, searchValue.trim());
    }
  };

  const handleClear = () => {
    setSearchValue("");
    onClear();
  };

  return (
    <div className="search-box">
      <Form onSubmit={handleSearch}>
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Rechercher par</Form.Label>
              <Form.Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">Nom</option>
                <option value="id">ID</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>Valeur de recherche</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type={searchType === "id" ? "number" : "text"}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchType === "id" ? "Entrez l'ID" : "Entrez le nom"
                  }
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={3}>
            <div className="d-flex gap-2">
              <Button
                type="submit"
                variant="primary"
                className="flex-fill btn-gradient"
                disabled={!searchValue.trim()}
              >
                <i className="bi bi-search me-1"></i>
                Rechercher
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={handleClear}
                disabled={!searchValue}
              >
                <i className="bi bi-x-circle"></i>
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBar;
