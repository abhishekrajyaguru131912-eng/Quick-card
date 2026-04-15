import { Link } from "react-router-dom"

export const ReturnsOrders = ()=>{
    return(
        <>
            <Link to="/gp/account/orders" style={{ textDecoration: "none" }}>
                <div className="amazon-returns-order px-3 text-white">
                    <span>Return</span>
                    <h5>& Orders</h5>
                </div>
            </Link>
        </>
    )
}
