const API_URL = "http://localhost:5000"; // Backend URL

export const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    return await response.text();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
