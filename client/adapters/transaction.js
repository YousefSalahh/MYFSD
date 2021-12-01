import apiService from "../services/apiService";
import { useQuery } from "react-query";

export function useFetchTransaction(accountID) {
    return useQuery(["transactionData", accountID], () =>
      apiService.get(`https://localhost:5000/transaction/${accountID}`).then(({ data }) => data)
    );
    
  }