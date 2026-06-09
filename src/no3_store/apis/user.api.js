import axios from "axios";

export const userAllGetApi = async () => {
  const response = await axios.get(
    "http://localhost:3001/user"
  );

  return response.data;
};

export const userLoginApi = async (userObj) => {
  const response = await axios.get(
    "http://localhost:3001/user"
  );

  const users = response.data;

  const foundUser = users.find(
    (item) =>
      item.name.trim() === userObj.name.trim() &&
      item.password.trim() === userObj.password.trim()
  );

  if (!foundUser) {
    throw new Error(
      "아이디 또는 비밀번호가 일치하지 않습니다."
    );
  }

  return foundUser;
};

export const userRegisterApi = async (userObj) => {
  const response = await axios.get(
    `http://localhost:3001/user?name=${userObj.name}`
  );

  const users = response.data;

  if (users.length > 0) {
    throw new Error("이미 존재하는 사용자입니다.");
  }

  const result = await axios.post(
    "http://localhost:3001/user",
    userObj
  );

  return result.data;
};

export const userPutApi = async (dataObj) => {
  const response = await axios.put(
    `http://localhost:3001/user/${dataObj.id}`,
    dataObj
  );

  return response.data;
};

export const userDeleteApi = async (id) => {
  const response = await axios.delete(
    `http://localhost:3001/user/${id}`
  );

  return response.data;
};