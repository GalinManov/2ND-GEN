import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export const Edit = () => {
    const id = useParams();
    const nav = useNavigate();

    const [product, setProduct] = useState({
        productName: '',
        price: '',
        description: '',
        image: ''
    });

    function onChange(e) {
        setProduct(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        console.log(product);

    };

    async function onSubmit(e) {
        e.preventDefault();

        try {

            const productName = product.productName;
            const price = product.price;
            const description = product.description;
            const image = product.image;

            if (productName == "" || price == "" || description == "") {
                return alert("Please enter more information about your product!");
            };

            await axios.patch(`http://localhost:3001/products/edit/${id.id}`, product);

            nav(`/products/peripherals`);

        } catch (err) {
            console.log(err)
        };


    };


    return (
        <Container>
            <Form onSubmit={onSubmit} onChange={onChange} style={{ "width": "30%", "margin": "auto" }}>

                <Form.Group className="mb-3" controlId="product">
                    <Form.Label>Product</Form.Label>
                    <Form.Control name='productName' type="text" placeholder="Product name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price in BGN</Form.Label>
                    <Form.Control name="price" type="number" placeholder="Price" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="descr">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" type="text" placeholder="Describe your product" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="img">
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" type="text" placeholder="Add an image of the product" />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Update
                </Button>

            </Form>
        </Container>
    )

};