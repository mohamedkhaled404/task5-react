import { useState, useEffect, useContext } from 'react';
import AppContext from '../context/Context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function MyForm() {
    const { productToEdit, handleformdata, setProductToEdit: clearEdit } = useContext(AppContext);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        freeShipping: false,
    });

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            setProduct({
                name: '',
                price: '',
                quantity: '',
                category: '',
                freeShipping: false,
            });
        }
    }, [productToEdit]);

    const handlesubmit = (e) => {
        e.preventDefault();

        handleformdata(product);
        setProduct({
            name: '',
            price: '',
            quantity: '',
            category: '',
            freeShipping: false,
        });
    }

    const handlechange = (e) => {
        const { name, value, type, checked } = e.target;

        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    const cancelEdit = () => {
        clearEdit(null);
    }

    return (
        <Form className='m-auto w-50'  >
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handlechange}
                    placeholder="Enter product name"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Product Price:</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handlechange}
                    placeholder="Enter product price"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicQuantity">
                <Form.Label>Product Quantity:</Form.Label>
                <Form.Control
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={handlechange}
                    placeholder="Enter product quantity"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Product Category:</Form.Label>
                <Form.Control
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handlechange}
                    placeholder="Enter product category"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    name="freeShipping"
                    checked={product.freeShipping}
                    onChange={handlechange}
                    label="Free Shipping"
                />
            </Form.Group>

            <div className="d-flex gap-2">
                <Button variant={productToEdit ? "warning" : "primary"} type="submit" onClick={handlesubmit} className="flex-grow-1">
                    {productToEdit ? "Update Product" : "+ Add Product"}
                </Button>
                {productToEdit && (
                    <Button variant="secondary" onClick={cancelEdit}>
                        Cancel
                    </Button>
                )}
            </div>
        </Form>
    );
}

export default MyForm;