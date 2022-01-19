import { useSubscription } from "@apollo/client";
import { GetChat } from "../graphql/subs";

export function useSubscriptionChat(param) {
  console.log(param)
  let obj;
  if (param.role === "customer") {
    obj = { "customer_id": { "_eq": param.id } };
  } else {
    obj = { "consultan_id": { "_eq": param.id } };
  }
  console.log(obj)
  const {
    data: allChat,
    loading: loadingAllChat,
    error: errorAllChat,
  } = useSubscription(GetChat, { variables: { where: obj } });
  return { allChat, loadingAllChat, errorAllChat };
}
