import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoriesData from "../data/categories.json";

const ProductForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    rating: "",
    link: "",
    category: "550e8400-e29b-41d4-a716-446655440001",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const categories = categoriesData;

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Tên sản phẩm không được để trống";
        } else if (value.trim().length < 3) {
          error = "Tên sản phẩm phải có ít nhất 3 ký tự";
        }
        break;
      case "price":
        if (!value) {
          error = "Giá sản phẩm không được để trống";
        } else if (isNaN(value) || parseInt(value) <= 0) {
          error = "Giá sản phẩm phải là số dương";
        }
        break;
      case "description":
        if (!value.trim()) {
          error = "Mô tả không được để trống";
        }
        break;
      case "image":
        if (!value.trim()) {
          error = "URL hình ảnh không được để trống";
        } else if (!isValidUrl(value)) {
          error = "URL hình ảnh không hợp lệ";
        }
        break;
      case "rating":
        if (!value) {
          error = "Đánh giá không được để trống";
        } else if (
          isNaN(value) ||
          parseFloat(value) < 0 ||
          parseFloat(value) > 5
        ) {
          error = "Đánh giá phải từ 0 đến 5";
        }
        break;
      case "link":
        if (!value.trim()) {
          error = "Link sản phẩm không được để trống";
        } else if (!isValidUrl(value)) {
          error = "Link sản phẩm không hợp lệ";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const clearForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      rating: "",
      link: "",
      category: "550e8400-e29b-41d4-a716-446655440001",
    });
    setFieldErrors({});
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const fieldError = validateField(key, formData[key]);
      if (fieldError) {
        errors[key] = fieldError;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Vui lòng sửa các lỗi trong form");
      setLoading(false);
      return;
    }

    try {
      // First, get existing products to determine the next ID
      const getResponse = await fetch(
        "https://tn-shop-873ac-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
      );

      if (!getResponse.ok) {
        throw new Error("Lỗi khi lấy danh sách sản phẩm");
      }

      const existingData = await getResponse.json();
      const firstKey = Object.keys(existingData)[0];
      const existingProducts = existingData[firstKey] || {};

      // Extract all products from the nested structure
      const productsArray = [];
      Object.keys(existingProducts).forEach(key => {
        const product = existingProducts[key];
        if (product && typeof product === 'object') {
          productsArray.push(product);
        }
      });

      // Generate next ID
      const nextId =
        productsArray.length > 0
          ? Math.max(...productsArray.map((p) => p.id)) + 1
          : 1;

      // Prepare new product data
      const newProduct = {
        id: nextId,
        name: formData.name.trim(),
        price: parseInt(formData.price),
        description: formData.description.trim(),
        image: formData.image.trim(),
        rating: parseFloat(formData.rating),
        link: formData.link.trim(),
        category: formData.category,
      };

      // Add new product to existing structure
      const nextKey = Object.keys(existingProducts).length.toString();
      const updatedProducts = {
        ...existingProducts,
        [nextKey]: newProduct
      };

      // Update the products in Firebase
      const updateResponse = await fetch(
        `https://tn-shop-873ac-default-rtdb.asia-southeast1.firebasedatabase.app/products/${firstKey}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProducts),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Lỗi khi thêm sản phẩm");
      }

      // Reset form
      clearForm();

      setSuccess("Thêm sản phẩm thành công!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thêm Sản Phẩm Mới
          </h1>
          <p className="text-gray-600">
            Điền thông tin sản phẩm để thêm vào cửa hàng
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                {success}
              </div>
            )}

            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#276c86] focus:border-transparent ${
                  fieldErrors.name ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Nhập tên sản phẩm"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Giá (VND) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#276c86] focus:border-transparent ${
                  fieldErrors.price ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="200000"
                min="0"
              />
              {fieldErrors.price && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.price}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Danh mục <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#276c86] focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                URL hình ảnh <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#276c86] focus:border-transparent ${
                  fieldErrors.image ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="https://images.unsplash.com/photo-..."
              />
              {fieldErrors.image && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.image}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Đánh giá (0-5) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#276c86] focus:border-transparent ${
                  fieldErrors.rating ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="4.5"
                min="0"
                max="5"
                step="0.1"
              />
              {fieldErrors.rating && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.rating}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mô tả <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                onBlur={handleBlur}
                rows="4"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#276c86] focus:border-transparent ${
                  fieldErrors.description ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Mô tả chi tiết về sản phẩm..."
              />
              {fieldErrors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldErrors.description}
                </p>
              )}
            </div>

            {/* Product Link */}
            <div>
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Link sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#276c86] focus:border-transparent ${
                  fieldErrors.link ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="https://example.com/product"
              />
              {fieldErrors.link && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.link}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={clearForm}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-400 transition-colors"
              >
                Xóa Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#276c86] text-white rounded-md font-medium hover:bg-[#1e5a6f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Đang thêm..." : "Thêm Sản Phẩm"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
