import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/useAuthContext';


export const Create = () => {
    const nav = useNavigate();
    const { user } = useAuthContext();

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const type = formData.get("type");
        const productName = formData.get("productName");
        const price = formData.get("price");
        const description = formData.get("description");
        const image = formData.get('image');

        if (type == "" || productName == "" || price == "" || description == "") {
            return alert("Please enter more information about your product!");
        };

        nav(`/products/${type}`);
        await axios.post("http://localhost:3001/products", { type, productName, price, description, image, owner: user});
    };


    return (
        <div>
            <h1 style={{ "marginBottom": "70px", "marginTop": "30px", "textAlign": "center" }}>
                List a product you would like to sell!
            </h1>
            <Form onSubmit={onSubmit} style={{ "width": "30%", "margin": "auto" }}>

                <Form.Group className="mb-3" controlId="type">
                    <Form.Label>Type</Form.Label>
                    <Form.Select name='type' aria-label="Default select example">
                        <option value="peripheral">Peripheral</option>
                        <option value="component">Component</option>
                        <option value="desktop">Desktop setup</option>
                        <option value="laptop">Laptop</option>
                    </Form.Select>
                </Form.Group>

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

                <Button variant="primary" type="submit">
                    Put up for sale!
                </Button>

            </Form>
        </div>
    )
}