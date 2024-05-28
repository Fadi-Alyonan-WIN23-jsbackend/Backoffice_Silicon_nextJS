import { Course } from "@/app/interfaces/courseTypes";


const updateCourse = async (input: Partial<Course>): Promise<Course> => {
  const mutation = `
  mutation updateCourse($input: CourseUpdateRequestInput!) {
    updateCourse(input: $input) {
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
`
    
    const res = await fetch('https://coursesprovidergraphql.azurewebsites.net/api/GraphQL?code=9DnvhZulNJXNyVRryct85sroBFHfiY6TQw_iz4HRFfUvAzFuNCC0iA%3D%3D', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    body: JSON.stringify({ query: mutation, variables: { input } }),
    })
    const json = await res.json()
    return json.data.updateCourse

}
export default updateCourse