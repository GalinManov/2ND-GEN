import Container from "react-bootstrap/esm/Container";
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";

export const Favorites = () => {

    const [favorites, setFavorites] = useState([]);

    const currentUser = localStorage.getItem("userID");

    useEffect(() => {
        axios.get(`http://localhost:3001/products/favorites/${currentUser}`)
            .then(res => setFavorites(res.data.favorites));

    }, [])

    console.log(favorites);



    return (
        <Container>
            <h2 style={{ "textAlign": "center", "marginTop": "2rem" }}>Your favorite products</h2>
            
            {favorites.length > 0 ?
                <div className="grid-favorite">
                    {favorites.map(fav =>
                        <Card style={{ width: '18rem' }} key={fav._id}>
                            <Card.Img variant="top" src={fav.image} />
                            <Card.Body>
                                <Card.Title>{fav.productName}</Card.Title>
                                <Card.Text>
                                    Price: {fav.price} BGN
                                </Card.Text>
                                <Card.Text>
                                    Seller: {fav.owner?.username}
                                </Card.Text>

                                <Link
                                    className="btn btn-primary btn-md"
                                    role="button"
                                    to={`/products/peripherals/${fav._id}`}
                                >
                                    View details
                                </Link>
                            </Card.Body>
                        </Card>)}
                </div>
                :
                <h3>No products added to favorites yet!</h3>
            }
        </Container>
    )
}