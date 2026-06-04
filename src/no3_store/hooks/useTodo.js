import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  todoAllGetApi,
  todoGetApi,
  todoPostApi,
  todoPutApi,
  todoDeleteApi,
} from "../apis/todo.api";

export const useAllGetTodo = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: todoAllGetApi,
  });
};

export const useGetTodo = (id) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => todoGetApi(id),
    enabled: !!id,
  });
};

export const usePostRegisterTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoPostApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["todos"],
        (oldData = []) => [...oldData, dataObj]
      );
    },
  });
};

export const usePutupdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoPutApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["todos"],
        (oldData = []) =>
          oldData.map((item) =>
            item.id === dataObj.id
              ? dataObj
              : item
          )
      );

      queryClient.setQueryData(
        ["todo", dataObj.id],
        dataObj
      );
    },
  });
};

export const usePutToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoPutApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["todos"],
        (oldData = []) =>
          oldData.map((item) =>
            item.id === dataObj.id
              ? dataObj
              : item
          )
      );
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: todoDeleteApi,

    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["todos"],
        (oldData = []) =>
          oldData.filter(
            (item) => item.id !== id
          )
      );
    },
  });
};