import { useSubscription } from "@apollo/client";
import {GetMessage} from "../graphql/subs";

export function useSubscriptionMessage(id) {
  const {
    data: allMessage,
    loading: loadingAllMessage,
    error: errorAllMessage,
  } = useSubscription(GetMessage,
    { variables: { id } });
  return { allMessage, loadingAllMessage, errorAllMessage };
}
