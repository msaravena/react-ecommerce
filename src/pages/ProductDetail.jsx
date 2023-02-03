import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Col, Row, Card} from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import { getProductsThunk } from "../store/slices/products.slice"
import { addFavoriteThunk } from "../store/slices/favorites.slice"

const  ProductDetail = () => {

    const { id } = useParams()    
    const [ quantity, setQuantity ] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()   
    
    useEffect( () => {
        
        dispatch(getProductsThunk()) 
        
        
    }, [id])
    
    const allProducts = useSelector( state => state.products)
    const detail = allProducts.find( product => product.id === Number(id))
    const productsRelated = allProducts.filter(product => product.category.name === detail.category.name)

    const addToFavorites = () => {

        const token = localStorage.getItem("token")

        if(token) {

            const product = {
                id: detail.id,
                quantity: quantity, 
                
            }
            dispatch(addFavoriteThunk(product))
        } else {
            navigate("/login")

        }

    }

    return (

        <div className="pd-container">  

                 
            
        
        <Row>
            
            <Col lg={6}>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={detail?.productImgs?.[0]}
                        alt="First slide"
                        style={{height: 200, objectFit:'contain' }}
                        />
                    
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={detail?.productImgs?.[1]}
                        alt="Second slide"
                        style={{height: 200, objectFit:'contain' }}
                        />

                    
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={detail?.productImgs?.[2]}
                        alt="Third slide"
                        style={{height: 200, objectFit:'contain' }}
                        />                   
                    </Carousel.Item>
                </Carousel>
            </Col>
            <Col lg="6">
                <h4>{detail?.title}</h4>
                    <p>{detail?.description}</p>
            
        <div className="btn-container">
            
            <div className="price">
                <p>Price</p>
            <h6> <span>$</span> {detail?.price}</h6>
            </div>
            <div className="quantity">
                <p>Quantity</p>
            <Button className="btn-qty" onClick={ () => setQuantity( quantity - 1) }>-</Button>
            <span className="qty-span">{quantity}</span>
            <Button className="btn-qty" onClick={ () => setQuantity( quantity + 1) }>+</Button>
            </div>
        </div>
        <Button className="mb-3 mt-3 cart-btn" onClick={ addToFavorites }> Add to cart<i className='bx bx-cart-alt' ></i></Button>

        </Col> 
            
        </Row>

        <h5 style={{color: '#78c2ad', marginBottom: 20}}>Discover similar products</h5>

        <Row xs={1} xm={2} lg={3}>
                {
                    productsRelated?.map(productItem => (

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

export default ProductDetail
