import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PaginationComp } from './PaginationComp';
import { useCookies } from 'react-cookie';


export const Peripherals = () => {

    const [peripherals, setPeripherals] = useState([]);

    const [err, setErr] = useState("");

    const [cookies, setCookies] = useCookies("access-token");

    console.log(cookies.access_token);

    useEffect(() => {

        try {
            axios.get('http://localhost:3001/products/peripherals', {headers: {authorization: cookies.access_token} })
                .then((res) => res.data.errMessage ? setErr(res.data.errMessage) : setPeripherals(res.data));

        } catch (err) {
            console.log(err);

        }

    }, []);




    const filtered = (filteredPosts) => {
        return filteredPosts.map(p =>
            <Card style={{ width: '18rem' }} key={p._id}>
                <Card.Img variant="top" src={p.image} />
                <Card.Body>
                    <Card.Title>{p.productName}</Card.Title>
                    <Card.Text>
                        Price: {p.price} BGN
                    </Card.Text>
                    <Card.Text>
                        Seller: {p.owner?.username}
                    </Card.Text>
                    <Link
                        className="btn btn-primary btn-md"
                        role="button"
                        to={`/products/peripherals/${p._id}`}
                    >
                        View details
                    </Link>

                </Card.Body>
            </Card>)
    };


    return (
        <>
            {err != "" ? <h1>{err}</h1> : <PaginationComp posts={peripherals} filtered={filtered} />}
        </>
    )

}