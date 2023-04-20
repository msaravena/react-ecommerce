import axios from "axios"
import { useState, useEffect } from "react"
import getConfig from "../utils/getConfig"


const Purchases  = () => {

    const [ purchases, setPurchases ] = useState([])

    useEffect( () => {

        axios
        .get("https://e-commerce-api.academlo.tech/api/v1/purchases", getConfig())
        .then( resp => setPurchases(resp.data.data.purchases))
        .catch(error => console.error(error))

    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            {
                purchases.map( item => {
                    return item.cart.products?.map(item => <li key={item.id}>{item.title}</li>)
                })
            }
       </div>

    )

}

export default Purchases