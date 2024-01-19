import { useState } from 'react';
import '../css/paginate.css';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/esm/Container';


export const PaginationComp = ({ posts, filtered }) => {

    const [postsPerPage, __] = useState(5);
    const [currPage, setCurrPage] = useState(1);
    const lastIndex = postsPerPage * currPage;
    const firstIndex = lastIndex - postsPerPage;
    const pages = [];


    const filteredPosts = posts.slice(firstIndex, lastIndex);
    const res = filtered(filteredPosts);


    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {

        pages.push(
            <Pagination.Item key={i} onClick={() => setCurrPage(i)} >
               {i}
            </Pagination.Item>);
    };


    return (
        <Container className='products-container'>
            <div className='products-list'>
                {res}
            </div>
            <div className='paginate'>
                <Pagination>{pages}</Pagination>
                <br />
            </div>
        </Container>

    )

}