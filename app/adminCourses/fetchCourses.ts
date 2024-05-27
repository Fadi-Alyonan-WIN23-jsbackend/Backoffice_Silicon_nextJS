import { Course } from '../interfaces/courseTypes'

async function fetchCourses(): Promise<Course[]> {
  const query = `
    {
      getCourses {
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
    body: JSON.stringify({query}),
  })

  if (!res.ok) {
    throw new Error(`Could not fetch courses from CourseProvider: ${res.statusText}`)
  }

  const json = await res.json()
  console.log('Fetched courses:', json.data.getCourses)

  return json.data.getCourses
}



export default fetchCourses
