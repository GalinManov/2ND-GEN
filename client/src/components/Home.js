import Container from 'react-bootstrap/esm/Container';
import Carousel from 'react-bootstrap/Carousel';
import HardWareImg from '../assets/images/caro-products.jpg';
import ProductImg from '../assets/images/products.jpg';


export const Home = () => {
    
    return (
        <Container className='home-container'>

            <div className='home-intro'>
                <h1>Welcome to 2ND RIGS!</h1>
                <h3>A place where you can find the best quality in second-hand electronics!</h3>
            </div>
            
            <Carousel style={{"marginTop":"70px", "width":"90vw"}}>
                <Carousel.Item style={{"height":"550px"}}>
                    <img className='home-imgs' src={HardWareImg} /> 
                    <Carousel.Caption>
                        <h3>Hardware and components</h3>
                        <p>Discover second-hand computer hardware with exceptionally retained quality!</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item style={{"height":"550px"}}>
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