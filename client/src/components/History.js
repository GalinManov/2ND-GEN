import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export const History = () => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const id = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/products/soldproducts/${id.id}`)
            .then(res => setProducts(res.data.productsHistory))

    }, []);

    function onChange(e) {
        setSearch(e.target.value);
        console.log(search)
    };

    const filteredPr = products.filter(p => p.productName.toLowerCase().includes(search.toLowerCase()));
    
    return (
        <Container>
            <input on onChange={onChange} placeholder="Search by name" style={{ "marginTop": "1rem" }}/>
            <h2 style={{ "marginTop": "1rem" }}>All products you have sold:</h2>
            <table style={{ "marginTop": "1rem" }}>
                <tr>
                    <th style={{ "border": "1px solid #dddddd", "fontWeight": "bold" }}>Product name</th>
                    <th style={{ "border": "1px solid #dddddd", "fontWeight": "bold" }}>Category</th>
                    <th style={{ "border": "1px solid #dddddd", "fontWeight": "bold" }}>Sold for</th>
                    <th style={{ "border": "1px solid #dddddd", "fontWeight": "bold" }}>Date sold on</th>
                </tr>
                {filteredPr.map(pr =>
                    <tr>
                        <th style={{ "border": "1px solid #dddddd" }}>{pr.productName}</th>
                        <th style={{ "border": "1px solid #dddddd" }}>{pr.type.toUpperCase()}</th>
                        <th style={{ "border": "1px solid #dddddd" }}>{pr.price} BGN</th>
                        <th style={{ "border": "1px solid #dddddd" }}>{pr.soldDate.slice(0,21)}</th>
                    </tr>
                )}


            </table>
        </Container>

    )
}