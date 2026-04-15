import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const API = "http://localhost:5000/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API);
        setProducts(res.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white text-center py-5 text-2xl font-bold shadow-lg">
        🛒 Admin Products Dashboard
      </div>

      <div className="p-6 max-w-6xl mx-auto">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          All Products
        </h2>

        {/* EMPTY */}
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">
            No products found 
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {products.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
              >

                {/* IMAGE */}
                <img
                  src={
                    p.image
                      ? `http://localhost:5000/uploads/${p.image}`
                      : "/fallback.jpg"
                  }
                  alt={p.name}
                  className="h-40 object-contain mb-3"
                />

                {/* INFO */}
                <h3 className="font-semibold text-lg">{p.name}</h3>

                <p className="text-green-600 font-bold text-lg">
                  ₹{p.price}
                </p>

                <p className="text-sm text-gray-500">
                  {p.category}
                </p>

                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {p.description}
                </p>

                {/* STOCK BADGE */}
                <div className="mt-2">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      p.countInStock > 0
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {p.countInStock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-3">

                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded w-full">
                    Edit
                  </button>

                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded w-full">
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminProducts;