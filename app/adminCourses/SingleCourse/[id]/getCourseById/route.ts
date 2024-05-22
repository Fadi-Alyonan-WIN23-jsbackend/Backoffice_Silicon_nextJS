// pages/api/getCourseById/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
  }

  const query = `
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
  `;

  const response = await fetch('https://coursesprovidergraphql.azurewebsites.net/api/GraphQL?code=9DnvhZulNJXNyVRryct85sroBFHfiY6TQw_iz4HRFfUvAzFuNCC0iA%3D%3D', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
    },
    body: JSON.stringify({ query, variables: { id } }),
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Error fetching data' }, { status: response.status });
  }

  const data = await response.json();

  if (data.errors) {
    return NextResponse.json({ message: `GraphQL error: ${data.errors.map((err: any) => err.message).join(', ')}` }, { status: 500 });
  }

  return NextResponse.json(data);
}
