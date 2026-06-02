
import axios from "axios";
import { use } from "react";

export const userAllGetApi = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/user"
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userLoginApi = async (user) => {
  try {
  // console.log("user",user);
    const response = await axios.get(
      `http://localhost:3001/user?name=${user.username}&password=${user.password.toString()}`
    )
    
//console.log("users", response.data);
    const users = response.data;

    if (users) {
      throw new Error("존재하지 않는 사용자입니다.");
    }
     if (!users[0].password === user.password.toString()) {
      throw new Error("존재하지 않는 비밀번호 입니다.");
    }


   // console.log("login", users[0]);

    return users[0];
  } catch (error) {
    throw error;
  }
};

export const userRegisterApi = async (userObj) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const userPutApi = async (dataObj) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/user/${dataObj.id}`,
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
      `http://localhost:3001/user/${id}`
    );

    return response.data;
  } catch (error) {
  
  }
};


