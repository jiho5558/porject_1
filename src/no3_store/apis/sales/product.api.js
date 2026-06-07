import axios from "axios";

export const productAllGetApi = async () => {
  const response = await axios.get(
    "http://localhost:3001/products"
  );
  return response.data;
};

export const productGetApi = async (id) => {
  const response = await axios.get(
    `http://localhost:3001/products/${id}`
  );
  return response.data;
};

export const productAllPostApi = async (dataObj) => {
  const response = await axios.post(
    "http://localhost:3001/products",
    dataObj
  );
  return response.data;
};

export const productAllPutApi = async (dataObj) => {
  const response = await axios.put(
    `http://localhost:3001/products/${dataObj.id}`,
    dataObj
  );
  return response.data;
};

export const productDeleteApi = async (id) => {
  await axios.delete(
    `http://localhost:3001/products/${id}`
  );

  return id;
};