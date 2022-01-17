import gql from "graphql-tag";

const GetChat = gql`
subscription Chat($where: ofspace_chat_bool_exp = {}) {
    ofspace_chat(limit: 1, where: $where)
  }
`;

const GetMessage = gql`
subscription Message($id: uuid = "") {
    ofspace_message(where: {chat_id: {_eq: $id}}) {
      chat_id
      created_at
      id
      message
      type
      updated_at
    }
  }
`;

export { GetChat, GetMessage };