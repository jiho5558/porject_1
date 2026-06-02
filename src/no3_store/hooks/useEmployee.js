import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  employeeAllGetApi,
  employeePostApi,
  employeePutApi,
  employeeDeleteApi,
} from "../apis/employee.api";

export const useAllGetEmployee = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeeAllGetApi,
  });
};

export const usePostRegisterEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeePostApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["employees"],
        (oldData = []) => [
          ...oldData,
          dataObj,
        ]
      );
    },
  });
};

export const usePutupdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeePutApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["employees"],
        (oldData = []) =>
          oldData.map((item) =>
            item.id === dataObj.id
              ? dataObj
              : item
          )
      );

      queryClient.setQueryData(
        ["employee", dataObj.id],
        dataObj
      );
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeDeleteApi,

    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["employees"],
        (oldData = []) =>
          oldData.filter(
            (item) => item.id !== id
          )
      );

      queryClient.removeQueries({
        queryKey: ["employee", id],
      });
    },
  });
};