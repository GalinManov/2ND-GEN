import Container from 'react-bootstrap/esm/Container';
import star from '../star.png'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const Details = () => {

    const [product, setProduct] = useState({});

    const [stars, _] = useState([1, 2, 3, 4, 5]);

    const [rating, setRating] = useState(0);

    const [avgRating, setAvgRating] = useState([]);

    const [favorite, setFavorite] = useState(false);

    const [checkedRemove, setCheckedRemove] = useState(false);

    const [checkedSold, setCheckedSold] = useState(false);

    const id = useParams();

    const nav = useNavigate();

    const currentUser = localStorage.getItem("userID");

    const isOwner = currentUser == product?.owner?._id;

    console.log(currentUser);


    useEffect(() => {
        try {
            axios.get(`http://localhost:3001/products/getone/${id.id}`)
                .then((res) => { setProduct(res.data); setAvgRating(res.data.rating) });

            axios.get(`http://localhost:3001/products/favorites/${currentUser}`)
                .then((res) => { res?.data?.favIds?.includes(id.id) ? setFavorite(true) : setFavorite(false) });
        } catch (err) {
            console.log(err)
        }
    }, []);


    async function handleRatingClick(rating) {
        setRating(rating);
        const res = await axios.patch(`http://localhost:3001/products/${id.id}`, { rating });
        setAvgRating(res.data.rating);
    };


    async function handleAddFavorite() {
        try {
            await axios.post(`http://localhost:3001/products/favorites/${id.id}`, { userID: currentUser });
            console.log(favorite);
    
            setFavorite(true);
        } catch (err) {
            console.log(err)
        }   
    };

    async function handleRemoveFavorite() {
        await axios.patch(`http://localhost:3001/products/favorites/delete/${currentUser}`, { productId: id.id });
        setFavorite(false);
    };

    function handleRemoveClick() {
        setCheckedRemove(true);
    };

    async function handleRemoveListing() {
        await axios.delete(`http://localhost:3001/products/delete/${id.id}`);
        nav(`/products/${product.type}`);
    };

    function handleSoldClick() {
        setCheckedSold(true);
    };


    async function handleSold() {
        await axios.post(`http://localhost:3001/products/sell/${id.id}`);
        nav(`/products/${product.type}`);
    };



    return (
        <Container className='details-container'>
            <div className="details-box">

                <img src={product.image} className="pic" />

                <div className="box-1">
                    <h2 className="name">{product.productName}</h2>
                    <h5 className="price">Category: {product?.type?.toUpperCase()}</h5>
                    <h5 className="price">Price: {product.price} BGN</h5>
                    <h5 className="desc">Description from the seller: </h5>
                    <div className="span">{product.description}</div>
                    <div className="rating">Rate this product: {rating === 0 ? stars.map(st => <img src={star} key={st} className="star" onClick={() => handleRatingClick(st)}></img>) : <div>You already rated this product {rating} stars!</div>} </div>
                    <div>Average rating: {(avgRating?.reduce((a, b) => a + b, 0) / avgRating?.length).toFixed(2)} out of 5 stars! (Based on {avgRating?.length} user ratings)</div>

                    {!isOwner && !favorite ?
                        <button className="btn btn-primary favourite" onClick={handleAddFavorite}>Add to favorites</button>
                        : !isOwner && <button className='btn btn-primary favourite' onClick={handleRemoveFavorite}>Remove from favorites</button>
                    }
                    
                    {isOwner &&
                        <div className='details-buttons'>
                            <a href={`/products/edit/${product._id}`} className="btn btn-primary favourite">Edit</a>
                            <a className="btn btn-primary favourite" onClick={handleSoldClick}>Mark as Sold</a>
                            <a className="btn btn-primary favourite" onClick={handleRemoveClick} >Remove listing</a>
                        </div>
                    }

                    {checkedRemove &&
                        <div className='confirmation-window'>
                            <p>Are you sure you want to remove this listing?</p>
                            <button className='btn btn-primary' onClick={handleRemoveListing}>Yes</button>
                            <button className='btn btn-primary' onClick={() => setCheckedRemove(false)}>No</button>
                        </div>}

                    {checkedSold &&
                        <div className='confirmation-window' style={{ "backgroundColor": "green" }}>
                            <p>Are you sure you want to mark this listing as sold?</p>
                            <button className='btn btn-primary' onClick={handleSold}>Yes</button>
                            <button className='btn btn-primary' onClick={() => setCheckedSold(false)}>No</button>
                        </div>}

                </div>
            </div>

            <div className='contact-seller'>
                <h4>Seller information:</h4>
                <p>Username: {product.owner?.username}</p>
                <p>Sofia, Bulgaria</p>
                <a href={`/profile/${product?.owner?._id}`} className='btn btn-primary'>View profile</a>
            </div>
        </Container>
    )
};