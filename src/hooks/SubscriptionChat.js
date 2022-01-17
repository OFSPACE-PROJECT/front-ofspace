import { useSubscription } from "@apollo/client";
import { GetChat } from "../graphql/subs";

export function useSubscriptionChat(param) {
  console.log(param)
  const {
    data: allChat,
    loading: loadingAllChat,
    error: errorAllChat,
  } = useSubscription(GetChat, { variables: { where: param } });
  return { allChat, loadingAllChat, errorAllChat };
}
