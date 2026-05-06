import { useEffect, useContext, useState } from "react";
import AppContext from "../context/Context";
import { Table, Button, Stack, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
function MyProducts() {
  const { products, setProducts, deleteProduct: onDelete, setProductToEdit } = useContext(AppContext);
  const [search, setSearch] = useState("");


  const filteredProducts = products.filter(product => {
    const searchTerm = search.toLowerCase().trim();
    if (!searchTerm) return true;

    return (
      product.id.toString() === searchTerm ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.price.toString().includes(searchTerm)
    );
  });

  const showDetails = (product) => {
    alert(`Product Details:
    ID: ${product.id}
    Name: ${product.name}
    Price: $${product.price}
    Quantity: ${product.quantity}
    Category: ${product.category}
    Free Shipping: ${product.freeShipping ? "Yes" : "No"}
    Description: ${product.description}`);
  };

  return (
    <div className="m-auto w-100 bg-light p-4 rounded shadow-sm mt-5">
      <h2 className="text-center mb-4">Products List</h2>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">Search</InputGroup.Text>
        <Form.Control
          id="basic-url"
          aria-describedby="basic-addon3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by ID, Name or Price..."
        />
      </InputGroup>

      <Table striped bordered hover responsive>
        <thead className="table-dark text-center">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Free Shipping</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id} className="text-center align-middle">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>{product.freeShipping ? "Yes" : "No"}</td>
                <td>
                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="justify-content-center"
                  >
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => showDetails(product)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => setProductToEdit(product)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted py-4">
                {search ? "No products found matching your search." : "No products added yet."}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default MyProducts;
