import React, { useEffect, useState } from "react";

const Emergency = ({ user }) => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/vendors");
        if (!response.ok) {
          throw new Error("Failed to fetch vendors");
        }
        const data = await response.json();
        setVendors(data);
        setFilteredVendors(data);

        const uniqueCategories = ["all", ...new Set(data.map((vendor) => vendor.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter((vendor) => vendor.category === category);
      setFilteredVendors(filtered);
    }
  };

  if (loading) {
    return <div className="emergency-page">Loading...</div>;
  }

  if (error) {
    return <div className="emergency-page">Error: {error}</div>;
  }

  return (
    <div>
      <div className="emergency-page">
        <h1>Emergency Contacts</h1>

        <div className="filter-section">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="vendor-list">
          {filteredVendors.map((vendor) => (
            <div key={vendor._id} className="vendor-item">
              <h2>{vendor.fullName}</h2>
              <p><strong>Category:</strong> {vendor.category}</p>
              <p><strong>Email:</strong> {vendor.email}</p>
              <p><strong>Phone:</strong> {vendor.phone}</p>
              <p><strong>Region:</strong> {vendor.region}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Emergency;
