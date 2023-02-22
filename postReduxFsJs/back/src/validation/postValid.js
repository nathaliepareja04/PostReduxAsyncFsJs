export const postValid = {
  body: {
    type: "object",
    required: ["title", "description", "imgUrl"],
    properties: {
      title: {
        type: "string",
        minLength:2
      },
      description: {
        type: "string",
        minLength:2
      },
      imgUrl: {
        type: "string",
        minLength:2
      },
    },
  },
};
