import { gql } from "@apollo/client";

const insertChat = gql`
  mutation MyMutation($customer_id: Int = "", $consultan_id: Int = "") {
    insert_ofspace_chat_one(
      object: { consultan_id: $consultan_id, customer_id: $customer_id }
    ) {
      consultan_id
      created_at
      customer_id
      id
    }
  }
`;

const insertMessage = gql`
  mutation MyMutation(
    $chat_id: uuid = ""
    $message: String = ""
    $type: String = ""
  ) {
    insert_ofspace_message_one(
      object: { chat_id: $chat_id, message: $message, type: $type }
    )
  }
`;
export { insertChat, insertMessage };