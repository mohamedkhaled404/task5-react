import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import MyProducts from './components/MyProducts';
import MyForm from './components/MyForm';
import AppContext from './context/Context.js';

function App() {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleformdata = async (data) => {
    try {
      if (data.id) {
        await axios.put(`http://localhost:3000/products/${data.id}`, data);
        await fetchProducts();
        setProductToEdit(null);
      } else {
        await axios.post("http://localhost:3000/products", data);
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <AppContext.Provider
    value={{
      products,
      setProducts,
      productToEdit,
      setProductToEdit,
      handleformdata,
      deleteProduct}}>
      
      <div className="bg-light min-vh-100 py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              <div className="bg-white p-5 rounded shadow-lg border-top border-primary border-5">
                <header className="text-center mb-5">
                  <h1 className="display-4 fw-bold text-primary">Product List</h1>
                </header>
                <MyForm />
                <hr className="my-5" />
                <MyProducts />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </AppContext.Provider>

  );
}

export default App;
