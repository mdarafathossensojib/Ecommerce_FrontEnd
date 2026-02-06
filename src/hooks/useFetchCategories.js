import { useEffect, useState } from "react";
import apiClient from "../services/api_client";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    apiClient.get("/category").then((res) => setCategories(res.data));
  }, []);

  return categories;
};

export default useFetchCategories;