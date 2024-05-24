import { CreateCourseInput } from '@/app/interfaces/createCourseTypes';

export const createNewCourse = async (input: CreateCourseInput): Promise<any> => {
  const payload = {
    query: `
      mutation createCourse($input: CourseCreateRequestInput!) {
        createCourse(input: $input) {
          id
          title
        }
      }
    `,
    variables: { input },
  }

  console.log('Sending payload:', JSON.stringify(payload))

  try {
    const response = await fetch('https://coursesprovidergraphql.azurewebsites.net/api/GraphQL?code=9DnvhZulNJXNyVRryct85sroBFHfiY6TQw_iz4HRFfUvAzFuNCC0iA%3D%3D', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    console.log('Response received:', result)

    if (result.errors) {
      console.error('GraphQL errors', result.errors)
      console.log('Error details:', result.errors[0].message)
      return null
    }

    return result.data.createCourse
  } catch (error) {
    console.error('Fetch error', error)
    return null
  }
};
