import { insertMessage } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
// import { GetAllPassengers } from "../Graphql/query";

export function useInsertMessage() {
    const [InsertMessage, { loading: loadingInsert }] = useMutation(
        insertMessage,
      // { refetchQueries: [GetAllMessage] }
    );
    return { InsertMessage, loadingInsert };
  }
