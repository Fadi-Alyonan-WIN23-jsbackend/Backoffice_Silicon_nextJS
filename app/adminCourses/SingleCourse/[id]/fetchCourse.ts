import { Course } from '@/app/interfaces/courseTypes';

export const fetchCourse = async (id: string): Promise<Course | null> => {
  try {
    const response = await fetch('https://coursesprovidergraphql.azurewebsites.net/api/GraphQL?code=9DnvhZulNJXNyVRryct85sroBFHfiY6TQw_iz4HRFfUvAzFuNCC0iA%3D%3D', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      body: JSON.stringify({
        query: `
          query getCourseById($id: String!) {
            getCourseById(id: $id) {
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
        `,
        variables: { id },
      }),
    })

    const result = await response.json()

    if (result.errors) {
      console.error('GraphQL errors', result.errors)
      return null
    }

    return result.data.getCourseById
  } catch (error) {
    console.error('Fetch error', error)
    return null
  }
};
