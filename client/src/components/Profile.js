import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import ProfilePic from '../assets/images/profile-pic.jpg'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Profile = () => {

    const currentUser = localStorage.getItem("userID");

    const id = useParams();

    const isUser = currentUser == id.id;

    console.log(isUser);

    const [profile, setProfile] = useState({});

    const [active, setActive] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/users/${id.id}`)
            .then(res => setProfile(res.data));

        axios.get(`http://localhost:3001/products/active/${id.id}`)
            .then(res => setActive(res.data.products));

    }, []);


    return (
        <Container >
            <Container className="profile-container">
                <div className="profile-section">

                    <img className='profile-img' src={ProfilePic} />


                    <div className="profile-info">
                        <div>
                            <h4>General information:</h4>
                            <p>Date joined: {profile?.createdAt?.slice(0, 10)} </p>
                            <p>Username: {profile.username} </p>
                            <p>Email: {profile.email}</p>
                        </div>
                    </div>

                    {isUser &&
                        <button className='btn btn-primary'> Edit Profile</button>
                    }


                </div>

                <div className='profile-more'>
                    <h2 className='mb-4'>More</h2>
                    {isUser &&
                        <>
                            <a className='btn btn-primary mb-2' href={`/productHistory/${id.id}`}>View listing history</a>
                            <a href={`/products/favorites/${currentUser}`} className='btn btn-primary mb-2'>View Favorite products</a>
                        </>}
                </div>
            </Container>

            <div className='line-seperate'></div>

            <h3>Active listings:</h3>

            {active.length > 0 ?
                <div className='profile-active'>
                    {active.map(pr =>
                        <div className='active-card' key={pr._id}>
                            <h5>{pr.productName}</h5>
                            <p>Price: {pr.price}</p>
                            <a className='btn btn-primary btn-sm' href={`/products/peripherals/${pr._id}`}>View details </a>
                        </div>)}
                </div>
                
                : <h4 style={{ "marginTop": "2rem" }}>You have no active listings!</h4>}

        </Container>

    );
};