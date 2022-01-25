import { useSubscription } from "@apollo/client";
import { GetChat } from "../graphql/subs";

export function useSubscriptionChatNull() {
  const {
    data: allChat,
    loading: loadingAllChat,
    error: errorAllChat,
  } = useSubscription(GetChat, { variables: {where: {consultan_id: {_is_null: true}}} });
  return { allChat, loadingAllChat, errorAllChat };
}
