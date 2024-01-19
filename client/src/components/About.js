import Container from "react-bootstrap/esm/Container";

export const About = () => {
    return (
        <Container className="about-container">
            <div className="col-1">
                <div className="about-box">
                    <h1>About us</h1>
                    <p>
                        We aim to deliver the best possible experience for users when they are looking to sell their hardware and components!
                        You can list your own products in no time and find a suitable buyer who is in the market for second-hand gear.
                        Simply connect with an interested buyer and arange a price which suits the both of you!
                    </p>
                </div>
                <div className="about-2nd-row">
                    <h1>Terms and conditions</h1>
                    <p>To ensure that both parties are happy with the deal, we ask of users to comply with the following basic requirements:</p>
                    <div className="about-sellers">
                        <p>For <strong>sellers</strong>:</p>
                        <ul>
                            <li>
                                In order to use the services that the application provides, users must first register an account with valid credentials.
                            </li>
                            <li>
                                When listing products for sale, users must provide truthful and detailed information regarding the said products.
                                Please do not advertise false information relating to what you are selling!
                            </li>
                            <li>
                                After a deal has been finalized and the product successfully sold, please mark your product as <strong>SOLD</strong>.
                            </li>
                        </ul>
                    </div>
                    <div className="about-buyers">
                        <p>For <strong>buyers</strong>:</p>
                        <ul>
                            <li>
                                In order to use the services that the application provides, users must first register an account with valid credentials.
                            </li>
                            <li>
                                Be cautious of what you are buying by making sure that it fits what you are looking for.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-2">
                <p style={{"marginBottom":"5rem"}} >Do not hesitate to contact us! We will be more than happy to help you out and answer any questions you may have!</p>
                <p><strong>Email:</strong> galin.manov00@gmail.com</p>
                <p><strong>Tel.:</strong> 0889756789</p>
            </div>


        </Container>
    )
};