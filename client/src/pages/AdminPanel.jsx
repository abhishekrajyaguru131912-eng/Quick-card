import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    countInStock: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const API = "http://localhost:5000/api/products";

  const fetchProducts = async () => {
    const res = await axios.get(API);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const addProduct = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("image", imageFile);

      await axios.post(API, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      fetchProducts();

      setForm({
        name: "",
        price: "",
        category: "",
        description: "",
        countInStock: "",
      });
      setImageFile(null);
      setPreview("");
    } catch (err) {
      alert("Error adding product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-black text-white p-4 text-center text-2xl font-bold shadow">
        Admin Dashboard
      </div>

      <div className="p-6">

        {/* FORM */}
        <Card className="max-w-3xl mx-auto shadow-lg rounded-xl">
          <CardContent className="p-6 grid gap-4">

            <h2 className="text-xl font-semibold text-gray-700">
              Add New Product
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
              <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border p-2 rounded" />
              <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="border p-2 rounded" />
              <input name="countInStock" placeholder="Stock" value={form.countInStock} onChange={handleChange} className="border p-2 rounded" />
            </div>

            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 rounded" />

            <input type="file" onChange={handleImage} className="border p-2 rounded bg-white" />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="h-32 object-contain border rounded"
              />
            )}

            <Button
              onClick={addProduct}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Add Product
            </Button>

          </CardContent>
        </Card>

        {/* PRODUCTS */}
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-800">
          All Products
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((p) => (
            <Card
              key={p._id}
              className="rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <CardContent className="p-4 flex flex-col gap-2">

                <img
                  src={
                    p.image
                      ? `http://localhost:5000/uploads/${p.image}`
                      : "http://localhost:5000/uploads/sukuna.jpg"
                  }
                  alt={p.name}
                  className="h-40 object-contain mb-2"
                />

                <h3 className="font-semibold text-lg">{p.name}</h3>

                <p className="text-green-600 font-bold text-lg">
                  ₹{p.price}
                </p>

                <p className="text-sm text-gray-500">{p.category}</p>

                <Button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-500 hover:bg-red-600 text-white mt-2"
                >
                  Delete
                </Button>

              </CardContent>
            </Card>
          ))}

        </div>

      </div>
    </div>
  );
};

export default AdminPanel;