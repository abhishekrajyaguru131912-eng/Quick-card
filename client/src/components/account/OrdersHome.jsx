import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import productimage1 from "../../static/images/41KUCZkvICL._SY90_.jpg";

export const OrdersCard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/orders/my", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                } else {
                    console.error("Failed to fetch orders");
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div className="container mt-4"><h3>Loading orders...</h3></div>;
    }

    if (orders.length === 0) {
        return (
            <div className="container mt-4">
                <h3>Your Orders</h3>
                <p>You have no past orders.</p>
                <Link to="/" className="btn btn-warning">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Your Orders</h3>
            {orders.map((order) => (
                <div key={order._id} className="amz-order-card border mt-3 mb-4">
                    <div className="amz-order-card-header bg-light py-3 px-4 border-bottom">
                        <div className="d-flex justify-content-between">
                            <div className="left-card-header-detail d-flex">
                                <div className="pe-4">
                                    <span className="text-muted d-block" style={{ fontSize: "12px" }}>ORDER PLACED</span>
                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="px-4">
                                    <span className="text-muted d-block" style={{ fontSize: "12px" }}>TOTAL</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                                <div className="px-4">
                                    <span className="text-muted d-block" style={{ fontSize: "12px" }}>SHIP TO</span>
                                    <span className="text-primary">{user?.name || "User"}</span>
                                </div>
                            </div>
                            <div className="right-card-header-detail text-end">
                                <div>
                                    <span className="text-muted d-block" style={{ fontSize: "12px" }}>ORDER # {order._id}</span>
                                    <Link to={`/order/${order._id}`} className="amz-link" style={{ fontSize: "13px" }}>View order details</Link>
                                    <span className="px-2 text-muted">|</span>
                                    <Link to="#" className="amz-link" style={{ fontSize: "13px" }}>Invoice</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="amz-order-card-body p-4">
                        <h5 className="bold-text mb-3">
                            {order.status === "delivered" ? (
                                <span className="text-success">Delivered on {new Date(order.updatedAt).toLocaleDateString()}</span>
                            ) : (
                                <span>Status: {order.status || "Processing"}</span>
                            )}
                        </h5>
                        
                        {order.items && order.items.map((item, idx) => (
                            <div key={idx} className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
                                <div className="d-flex w-75">
                                    <div className="me-4" style={{ width: "90px", height: "90px", overflow: "hidden" }}>
                                        <img 
                                            src={item.product?.image || productimage1} 
                                            className="img-fluid" 
                                            alt={item.product?.name || "Product image"} 
                                            style={{ objectFit: "contain", width: "100%", height: "100%" }}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <Link to={`/product/${item.product?._id}`} className="amz-link d-block mb-1" style={{ fontSize: "16px", fontWeight: "500", color: "#0F1111", textDecoration: "none" }}>
                                            {item.product?.name || "Unknown Product"}
                                        </Link>
                                        <span className="text-muted d-block mb-2" style={{ fontSize: "13px" }}>
                                            Sold by: Amazon.com Services LLC
                                        </span>
                                        <span className="d-block mb-3" style={{ fontSize: "14px", color: "#B12704" }}>
                                            ${item.price} - Qty: {item.quantity}
                                        </span>
                                        <div className="mt-2">
                                            <Link to={`/product/${item.product?._id}`} className="btn btn-warning btn-sm py-1 px-3 me-2" style={{ borderRadius: "8px", fontSize: "13px" }}>
                                                Buy it again
                                            </Link>
                                            <button className="btn btn-light border btn-sm py-1 px-3 shadow-sm" style={{ borderRadius: "8px", fontSize: "13px" }}>
                                                View your item
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-25 text-end d-flex flex-column align-items-end">
                                    <button className="btn btn-light border shadow-sm w-100 mb-2 py-1" style={{ borderRadius: "8px", fontSize: "13px" }}>
                                        Track package
                                    </button>
                                    <button className="btn btn-light border shadow-sm w-100 mb-2 py-1" style={{ borderRadius: "8px", fontSize: "13px" }}>
                                        Return or replace items
                                    </button>
                                    <button className="btn btn-light border shadow-sm w-100 py-1" style={{ borderRadius: "8px", fontSize: "13px" }}>
                                        Write a product review
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
