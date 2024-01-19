import Container from 'react-bootstrap/esm/Container';
import Carousel from 'react-bootstrap/Carousel';
import HardWareImg from '../assets/images/caro-products.jpg';
import ProductImg from '../assets/images/products.jpg';


export const Home = () => {
    
    return (
        <Container className='home-container'>
            
            <Carousel style={{"marginTop":"150px", "width":"90vw"}}>
                <Carousel.Item style={{"height":"50vh"}}>
                    <img className='home-imgs' src={HardWareImg} /> 
                    <Carousel.Caption>
                        <h3>Hardware and components</h3>
                        <p>Discover second-hand computer hardware with exceptionally retained quality!</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item style={{"height":"50vh"}}>
                    <img className='home-imgs' src={ProductImg} /> 
                    <Carousel.Caption>
                        <h3>Hardware and components</h3>
                        <p>Discover second-hand computer hardware with exceptionally retained quality!</p>
                    </Carousel.Caption>
                </Carousel.Item>
              
            </Carousel>

        </Container>
    );
}