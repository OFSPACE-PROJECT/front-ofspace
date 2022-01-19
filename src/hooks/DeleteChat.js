import { useMutation } from "@apollo/client";
import { GetAllMovie } from "../graphql/query";
import { deleteChat } from "../graphql/mutation";

export function useDeleteMovie() {
  const [DeleteChat, { loading: loadingDelete }] = useMutation(
    deleteChat,
  );
  return { DeleteChat, loadingDelete };
}

// export default useDeleteMovie;