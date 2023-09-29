export async function GET(
    request: Request,
    { params }: { params: { breed: string, subBreed: string } }
  ) {
    const {breed, subBreed} = params
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images`)
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { 'content-type': 'application/json' },
    })
  }