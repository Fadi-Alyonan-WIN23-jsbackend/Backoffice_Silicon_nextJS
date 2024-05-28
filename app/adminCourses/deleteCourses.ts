async function deleteCourse(id: string): Promise<void> {
  const mutation = `
    mutation {
        deleteCourse(id: "${id}")
    }
    `

  const res = await fetch('https://coursesprovidergraphql.azurewebsites.net/api/GraphQL?code=9DnvhZulNJXNyVRryct85sroBFHfiY6TQw_iz4HRFfUvAzFuNCC0iA%3D%3D', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    body: JSON.stringify({query: mutation}),
  })

  if (!res.ok) {
    throw new Error(`Could not delete course from CourseProvider: ${res.statusText}`)
  }

  const json = await res.json()
  if (json.errors) {
    throw new Error(`Could not delete course: ${json.errors[0].message}`)
  }

  console.log(`Deleted course with ID: ${id}`)
}

export default deleteCourse

