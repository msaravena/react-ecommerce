import { useSelector, useDispatch } from "react-redux"
import { getProductsThunk, filterCategoriesThunk } from "../store/slices/products.slice"
import { useEffect, useState } from "react"
import { Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom"
import axios from "axios"
import { addFavoriteThunk } from "../store/slices/favorites.slice"

const  Home = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products)
    const [ categories, setCategories ] = useState([])

    useEffect( () => {

        dispatch( getProductsThunk())

        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/products/categories")
        .then( resp => setCategories(resp.data.data.categories))
        .catch(error => console.error(error))

    }, [])

   

    

    return (

        <div>
            

            {
                categories.map( category => (
                    <Button 
                    key={category.id} 
                    variant="primary"
                    onClick={() => dispatch(filterCategoriesThunk(category.id))}
                    >
                        {category.name}
                    </Button>
                ))
            }
            <Button
            onClick={() => dispatch(getProductsThunk())}>
                All Products</Button>

            <Row xs={1} xm={2} lg={3}>
                {
                    products?.map(productItem => (

                        <Col key={productItem.id} className="col-products">
                            
                            <Card className="products-card" 
                                as={ Link } 
                                to={`/products/${productItem.id}`}
                                style={{textDecoration: 'none', color:'inherit'}}
                                >
                                <div className="img-wrapper">
                                    <Card.Img 
                                    variant="top cover-img" 
                                    src={productItem.productImgs[0]} 
                                    style={{height: 200, objectFit: 'contain', padding:20}}                                 
                                    />
                                    <Card.Img 
                                    variant="top btm-img" 
                                    src={productItem.productImgs[1]} 
                                    style={{height: 200, objectFit: 'contain', padding:20}}                                 
                                    />
                                </div>
                                <Card.Body style={{borderTop:"1px solid lightGrey" }}>
                                    <Card.Title>{productItem.title}</Card.Title>
                                    <Card.Text style={{display: 'flex', justifyContent: 'space-between', marginTop: 30}}>
                                    <span>${productItem.price}</span>                                     
                                    <Button                                 
                                    variant="primary" 
                                    className="home-btn"                                    
                                    style={{height: 35, width: 35, borderRadius: '50%', display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                                        <i className='bx bx-cart-alt' ></i></Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                        </Col>
                    ))
                }
            </Row>
        </div>

    )

}

export default Home