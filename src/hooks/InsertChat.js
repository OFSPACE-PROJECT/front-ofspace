import { insertChat } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
// import { GetAllPassengers } from "../Graphql/query";

export function useInsertChat() {
  const [InsertChat, { loading: loadingInsert }] = useMutation(insertChat);
  return { InsertChat, loadingInsert };
}
