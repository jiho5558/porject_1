import axios from "axios";

// 전체 조회
export const productAllGetApi = async () => {
  const response = await axios.get(
    "http://localhost:3001/product"
  );
  return response.data;
};


// 단일 조회
export const productGetApi = async (id) => {
  const response = await axios.get(
    `http://localhost:3001/product/${id}`
  );
  return response.data;
};

// 추가
export const productAllPostApi = async (dataObj) => {
  const response = await axios.post(
    "http://localhost:3001/product",
    dataObj
  );
  return response.data;
};

// 수정
export const productAllPutApi = async (dataObj) => {
  const response = await axios.put(
    `http://localhost:3001/product/${dataObj.id}`,
    dataObj
  );
  return response.data;
};

// 삭제
export const productDeleteApi = async (id) => {
  await axios.delete(
    `http://localhost:3001/product/${id}`
  );

  return id;
};