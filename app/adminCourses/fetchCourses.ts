import { Course } from '../interfaces/courseTypes';

async function fetchCourses(): Promise<Course[]> {
  const query = `
    {
      getCourses {
        id
        title
        author
      }
    }
  `;

  const res = await fetch('https://coursesprovidergraphql.azurewebsites.net/api/GraphQL?code=9DnvhZulNJXNyVRryct85sroBFHfiY6TQw_iz4HRFfUvAzFuNCC0iA%3D%3D', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error(`Could not fetch courses from CourseProvider: ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${json.errors.map((err: any) => err.message).join(', ')}`);
  }

  console.log('Fetched courses:', json.data.getCourses); 

  return json.data.getCourses;
}



export default fetchCourses;
