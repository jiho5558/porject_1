import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  employeeAllGetApi,
  employeeGetApi,
  employeeAllPostApi,
  employeeAllPutApi,
  employeeDeleteApi,
} from "../apis/employee.api";

export const useAllGetEmployee = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeeAllGetApi,
  });
};

export const useGetEmployee = (id) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => employeeGetApi(id),
    enabled: !!id,
  });
};

export const usePostRegisterEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeAllPostApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["employees"],
        (oldData = []) => [...oldData, dataObj]
      );

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};

export const usePutupdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: employeeAllPutApi,

    onSuccess: (dataObj) => {
      queryClient.setQueryData(
        ["employees"],
        (oldData = []) =>
          oldData.map((item) =>
            item.id === dataObj.id ? dataObj : item
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
          oldData.filter((item) => item.id !== id)
      );

      queryClient.removeQueries({
        queryKey: ["employee", id],
      });
    },
  });
};