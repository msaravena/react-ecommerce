import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from 'axios';
import getConfig from '../utils/getConfig';

const  SideBar = ({ show, handleClose }) => {

    const [ favorites, setFavorites ] = useState([])
    const [ total, setTotal ] = useState(0)

    useEffect( () => {

        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then(resp =>setFavorites(resp.data.data.cart.products))
        .catch(error => console.error(error))

    }, [show])

    const checkoutCart = () => {

        axios
        .post(
            "https://e-commerce-api.academlo.tech/api/v1/purchases", 
            {
                "street": "Green St. 1456",
                "colony": "Southwest",
                "zipCode": 12345,
                "city": "USA",
                "references": "Some references"
            },
            getConfig()
        )
        .then( resp => setFavorites([]))
        .catch( error => console.error(error))
    }

    
    return (

            <Offcanvas show={show} onHide={handleClose}  placement={"end"}>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="cart-products">
                        {
                            favorites.length !== 0
                            ?
                            favorites?.map( favorite => (
                                <div 
                                className="product-container"
                                key={favorite.id}
                                >
                                    <h5>{favorite.title}</h5>
                                    <h5>$ {favorite.price}</h5>
                                </div>
                                
                                ))
                                :
                                <h2>No hay productos seleccionados</h2>
                        }
                    </div>
                    <Button onClick={checkoutCart}
                    disabled={ favorites.length === 0}
                    className="btn-checkout"
                    >Checkout</Button>
                </Offcanvas.Body>
            </Offcanvas>

    )

}

export default SideBar