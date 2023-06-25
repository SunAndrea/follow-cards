import axios from "axios";

const URL = `https://6493fc490da866a95366f69a.mockapi.io/api/cards/`;

export const api = axios.create({
  baseURL: URL,
});

interface User {
  user: string;
  tweets: number;
  followers: number;
  avatar: string;
  subscribe: boolean;

  id: string;
}

type UsersResponse = User[];

export const getAllUsers = async (): Promise<UsersResponse> => {
  try {
    const response = await api.get<UsersResponse>(`/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateFollowers = async (
  userId: string,
  subscribeOption: boolean,
  newFollowersCount: number
): Promise<User> => {
  try {
    const updatedFollowersCount = subscribeOption
      ? newFollowersCount - 1
      : newFollowersCount + 1;

    const response = await api.put(`/users/${userId}`, {
      followers: updatedFollowersCount,
      subscribe: !subscribeOption,
    });

    console.log("Запит на зміну фоловерів успішно відправлено.", response.data);
    return response.data;
  } catch (error) {
    console.error("Помилка при відправці запиту на зміну фоловерів.", error);
    throw error;
  }
};

// export const getUsers = (page) => {
//   const response = api.get(`/users?limit=3&page=${page}`);
//   return response;
// };

// export const changeFollowers = (id, user) => {
//   return api.put(`/users/${id}`, user);
// };
