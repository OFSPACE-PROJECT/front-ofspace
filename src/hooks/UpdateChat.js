import { useMutation } from "@apollo/client";
import { updateChat } from "../graphql/mutation";

export function useUpdateChat() {
  const [UpdateChat, { loading: loadingUpdate }] = useMutation(
    updateChat,
  );
  return { UpdateChat, loadingUpdate };
}

