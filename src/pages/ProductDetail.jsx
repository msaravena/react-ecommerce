import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setIsLoading } from "../store/slices/isLoading.slice"
import { Button, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
import { filterCategoriesThunk } from "../store/slices/products.slice"

const  ProductDetail = () => {

    const { id } = useParams()
    const [ detail, setDetail ] = useState({})
    const dispatch = useDispatch()
    const productsRelated = useSelector( state => state.products)

    useEffect( () => {

        dispatch(setIsLoading(true))

        axios
        .get(`https://e-commerce-api.academlo.tech/api/v1/products/${id}/`)
        .then(resp => {
            setDetail(resp.data.data.product)
            dispatch(filterCategoriesThunk(1))
        
        })
        .catch(error => console.error(error))
        .finally( () => {
            setTimeout(() => {
                dispatch(setIsLoading(false))
            }, 500)
        })        

    }, [id])

    return (

        <div>            
            <h3>{detail?.title}</h3>
            <p>{detail?.description}</p>
            <h6> <span>$</span> {detail?.price}</h6>
        
        <Row>
            <Col lg={9}>
                <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={detail?.productImgs?.[0]}
                    alt="First slide"
                    style={{height: 300, objectFit:'contain' }}
                    />
                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={detail?.productImgs?.[1]}
                    alt="Second slide"
                    style={{height: 300, objectFit:'contain' }}
                    />

                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={detail?.productImgs?.[2]}
                    alt="Third slide"
                    style={{height: 300, objectFit:'contain' }}
                    />

                    <Carousel.Caption>
                    
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
            </Col>
            <Col lg="3">
                <h3>Related Products</h3>
                <ListGroup>
                    {
                        productsRelated?.map(productItem => (
                            <ListGroup.Item key={productItem.id}>
                                {productItem.title}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </Col>
        </Row>
        
        </div>

    )

}

export default ProductDetail