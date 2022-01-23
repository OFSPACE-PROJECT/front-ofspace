import { insertChat } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
// import { GetAllPassengers } from "../Graphql/query";

export function useInsertChat() {
  const [InsertChat, { data: chat, loading: loadingInsertChat }] = useMutation(insertChat);
  return { InsertChat, chat, loadingInsertChat };
}
