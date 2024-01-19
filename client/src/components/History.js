import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const History = () => {

    const [products, setProducts] = useState([]);

    const id = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/products/soldproducts/${id.id}`)
            .then(res => setProducts(res.data.productsHistory))

    }, []);


    return (
        <Container>
            <h2 style={{"marginTop":"1rem"}}>All products you have sold:</h2>
            <table style={{"marginTop":"1rem"}}>
                <tr>
                    <th style={{"border":"1px solid #dddddd", "fontWeight":"bold"}}>Product</th>
                    <th style={{"border":"1px solid #dddddd", "fontWeight":"bold"}}>Sold for</th>
                    <th style={{"border":"1px solid #dddddd", "fontWeight":"bold"}}>Date sold on</th>
                </tr>
                {products.map(pr => 
                <tr>
                    <td style={{"border":"1px solid #dddddd"}}>{pr.productName}</td>
                    <td style={{"border":"1px solid #dddddd"}}>{pr.price}</td>
                    <td style={{"border":"1px solid #dddddd"}}>date</td>
                </tr>)}
            </table>
        </Container>

    )
}