export const CREATE_COURSE = `
  mutation ($input: CourseCreateRequestInput!) {
    createCourse(input: $input) {
      id
      title
    }
  }
`;

export const UPDATE_COURSE = `
  mutation ($id: ID!, $input: CourseUpdateRequestInput!) {
    updateCourse(id: $id, input: $input) {
      id
      title
    }
  }
`;

export const DELETE_COURSE = `
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id)
  }
`;
