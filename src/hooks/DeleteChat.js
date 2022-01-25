import { useMutation } from "@apollo/client";
import { deleteChat } from "../graphql/mutation";

export function useDeleteChat() {
  const [DeleteChat, { loading: loadingDelete }] = useMutation(
    deleteChat,
  );
  return { DeleteChat, loadingDelete };
}

// export default useDeleteMovie;
