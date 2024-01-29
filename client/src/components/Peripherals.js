import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { PaginationComp } from './PaginationComp';
import { useAuthContext } from '../contexts/useAuthContext';


export const Peripherals = () => {

    const [peripherals, setPeripherals] = useState([]);

    const [err, setErr] = useState("");

    const params = useParams();

    const type = Object.values(params)[0];

    const { user } = useAuthContext();

    //  axios.get(`http://localhost:3001/products/${type}`, { headers: { "Authorization": localStorage.getItem("token") } })
    //    .then((res) => res.data.errMessage ? setErr(res.data.errMessage) : setPeripherals(res.data));


    useEffect(() => {
        try {
            axios.get(`http://localhost:3001/products/${type}`, { headers: { "Authorization": localStorage.getItem("token") } })
                .then((res) => res.data.errMessage ? setErr(res.data.errMessage) : setPeripherals(res.data));

        } catch (err) {
            console.log(err);
        }

    }, [user]);


    const filtered = (filteredPosts) => {
        return filteredPosts.map(p =>
            <Card style={{ "width": '18rem' }} key={p._id}>
                <Card.Img variant="top" src={p.image} style={{ "height": "50%" }} />
                <Card.Body >
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
                        to={`/products/type/${p._id}`}
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