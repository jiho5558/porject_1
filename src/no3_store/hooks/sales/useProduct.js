import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  productAllGetApi,
  productGetApi,
  productAllPostApi,
  productAllPutApi,
  productDeleteApi,
} from "../../apis/sales/product.api";

export const useAllGetProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productAllGetApi,
  });
};

export const useGetProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productGetApi(id),
    enabled: !!id,
  });
};

export const usePostRegisterProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productAllPostApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const usePutUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productAllPutApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productDeleteApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};