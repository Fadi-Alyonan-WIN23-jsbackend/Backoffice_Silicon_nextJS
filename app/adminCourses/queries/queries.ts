export const GET_COURSES = `
  query getCourses {
    courses {
      id
      title
      imageUri
      author
      categories
      ingress
      starRating
      reviews
      likesInPercent
      likes
      hours
      isDigital
      isBestSeller
    }
  }
`;

export const GET_COURSE = `
  query getCourseById($id: ID!) {
    course(id: $id) {
      id
      imageUri
      imageHeaderUri
      title
      author
      categories
      ingress
      starRating
      reviews
      likesInPercent
      likes
      hours
      prices {
        price
        discount
      }
      courseContent {
        description
        includes
        courseDetails {
          id
          title
          description
        }
      }
      isDigital
      isBestSeller
    }
  }
`;
