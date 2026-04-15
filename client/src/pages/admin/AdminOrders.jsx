import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const API = "http://localhost:5000/api/orders";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API}/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status } : o
        )
      );
    } catch (err) {
      alert("Error updating status");
    }
  };

  const filteredOrders = orders.filter((o) =>
    o._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white text-center py-5 text-2xl font-bold">
        🛒 Admin Orders Dashboard
      </div>

      <div className="p-6 max-w-6xl mx-auto">

        <input
          type="text"
          placeholder="Search Order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 border rounded-lg shadow"
        />

        {/* ORDERS */}
        {filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500">
            No orders found 
          </p>
        ) : (
          <div className="grid gap-6">

            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
              >

                {/* TOP */}
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-gray-500 text-sm">Order ID</p>
                    <p className="font-semibold">{order._id}</p>
                  </div>

                  <div className="text-green-600 font-bold text-lg">
                    ₹{order.totalPrice}
                  </div>
                </div>

                {/* USER */}
                <p className="mb-2 text-gray-700">
                  👤 {order.user?.name || "Unknown"}
                </p>

                {/* ITEMS */}
                <div className="bg-gray-50 p-3 rounded mb-4">
                  {order.orderItems?.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm border-b last:border-none py-1"
                    >
                      <span>{item.name}</span>
                      <span>{item.qty} × ₹{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* STATUS BUTTONS */}
                <div className="flex flex-wrap gap-2 mb-3">

                  <button
                    onClick={() => updateStatus(order._id, "Pending")}
                    className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded"
                  >
                    Pending
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "Shipped")}
                    className="px-3 py-1 bg-blue-200 text-blue-800 rounded"
                  >
                    Shipped
                  </button>

                  <button
                    onClick={() => updateStatus(order._id, "Delivered")}
                    className="px-3 py-1 bg-green-200 text-green-800 rounded"
                  >
                    Delivered
                  </button>

                </div>

                {/* CURRENT STATUS */}
                <p className="text-sm">
                  Status:{" "}
                  <span className="font-semibold text-purple-600">
                    {order.status || "Pending"}
                  </span>
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminOrders;