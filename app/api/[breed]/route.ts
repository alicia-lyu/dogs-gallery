// route handler
// optimize client-side fetching
export async function GET(
    request: Request,
    { params }: { params: { breed: string } }
  ) {
    const breed = params.breed
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { 'content-type': 'application/json' },
    })
  }