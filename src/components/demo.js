import React, { useEffect, useState } from "react";
import axios from "axios";

const Demo = () => {
  const [packages, setPackages] = useState([]);

  // Fetch data from FastAPI
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/packages", {
      withCredentials: true  // Ensures cookies and credentials are included
    })
      .then((response) => {
        setPackages(response); // Store data in state
        console.log("data", response); // Log the data for debugging
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Tour Packages</h1>
      {packages.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {packages.map((pkg) => (
            <li key={pkg._id}>
              <h2>Day {pkg.day}: {pkg.place}</h2>
              <p>{pkg.description}</p>
              <p>Activities: {pkg.activities.join(", ")}</p>
              <img src={pkg.image} alt={pkg.place} width="200px" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Demo;
