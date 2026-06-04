
import axios from "axios";

export const userAllGetApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/users"
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userLoginApi = async (userObj) => {
  try {
    console.log("API로 넘어온 값 :", userObj);

    const response = await axios.get(
      `http://localhost:3001/users?name=${userObj.name}&password=${userObj.password}`
    );

    const users = response.data;

    console.log("조회 결과 :", users);

    if (users.length === 0) {
      throw new Error(
        "아이디 또는 비밀번호가 일치하지 않습니다."
      );
    }

    const foundUser = users[0];

    console.log("로그인 성공 :", foundUser);

    return foundUser;
  } catch (error) {
    console.error("로그인 API 오류 :", error);
    throw new Error(error.message);
  }
};

export const userRegisterApi = async (userObj) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/users?name=${userObj.name}`
    );

    const users = response.data;

    if (users.length > 0) {
      throw new Error(
        "이미 존재하는 사용자입니다."
      );
    }

    const result = await axios.post(
      "http://localhost:3001/users",
      userObj
    );

    return result.data;
  } catch (error) {
    throw error;
  }
};

export const userPutApi = async (dataObj) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/users/${dataObj.id}`,
      dataObj
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userDeleteApi = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3001/users  /${id}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

