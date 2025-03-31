import React, { useEffect, useState } from "react";
import axios from "axios";

function Demo() {
  const [packages, setPackages] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch Travel Packages
    axios.get("http://127.0.0.1:8000/fetch")
      .then((response) => {
        console.log("Fetched Packages:", response.data);
        setPackages(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
      });

    // Fetch Images
    axios.get("http://127.0.0.1:8000/fetchImages")
      .then((response) => {
        console.log("Fetched Images:", response.data);
        setImages(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);

  return (
    <div>
      <h1>Travel Packages</h1>
      {packages.length === 0 ? <p>No travel packages found.</p> : (
        <ul>
          {packages.map((pkg) => (
            <li key={pkg._id}>
              <h3>{pkg.title}</h3>
              <p>Duration: {pkg.duration}</p>
              <p>Location: {pkg.location}</p>
              <p>Price: ₹{pkg.price}</p>
            </li>
          ))}
        </ul>
      )}

      <h1>Images</h1>
      {images.length === 0 ? <p>No images found.</p> : (
        <div>
          {images.map((img) => (
            <img key={img._id} src={`/images/${img.filename}`} alt={img.title} width="200" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Demo;
