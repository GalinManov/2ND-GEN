import { useEffect, useState } from "react"
import axios from "axios";
import { useParams } from "react-router-dom";


export const History = () => {

    const [products, setProducts] = useState([]);

    const id = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/products/soldproducts/${id.id}`)
            .then(res => setProducts(res.data.productsHistory))

    }, []);


    return (
        <div>
            {products.map(pr =>
                <div style={{"width":"500px", "backgroundColor": "grey"}}>
                    <h1>{pr.productName}</h1>
                </div>
                )}
        </div>

    )
}