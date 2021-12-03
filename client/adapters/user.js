import apiService from "../services/apiService";
import { useQuery, useQueryClient, useMutation } from "react-query";

import Router from 'next/router'


export function useFetchUser(userId) {

  return useQuery(["userData", userId], () =>
    apiService.get(`user/${userId}`).then(({ data }) => data)
  );
}

export function useMutateLoginUser() {

  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/login`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Store Token in local storage
        localStorage.setItem('jwt', responseData)
      },
      onError: (e) => console.log(e.message),
    }
  );
}


export function useMutateRegisterUser() {
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.GIUemail);
      data.append("password", user.password);
      data.append("phone" , user.phone);
      data.append("SID" , user.SID);
      data.append("userName" , user.userName);
      data.append("name" , user.name);
    
     // return apiService.post(`users/register`, data);
      return apiService.post(`http://localhost:5000/users/register` , user);

    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        // Redirect to login pagere
        // Router.push('/')
         //responseData = 'http://localhost:3000';
         window.location.replace("http://localhost:3000")
         console.log(responseData)

      },
      onError: (e) => console.log(responseData),
    }
  );
}

export function useMutateUpdateUser(userId) {
  const queryClint = useQueryClient();
  return useMutation(
    (user) => {
      const data = new FormData();
      data.append("email", user.email);
      data.append("password", user.password);
      return apiService.post(`user/${userId}`, data);
    },
    {
      // When mutate is called:
      onSuccess: (responseData) => {
        return queryClint.setQueryData(
          ["userData", userId],
          (data) => {
            return [
              {
                email: responseData.data.body.email,
                password: responseData.data.body.password,
              },
              ...data,
            ];
          }
        );
      },
      onError: (e) => console.log(e.message),
    }
  );
}