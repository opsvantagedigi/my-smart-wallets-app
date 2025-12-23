import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const secret = url.searchParams.get('secret')
    if (!secret || secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
      return new NextResponse('Invalid preview secret', { status: 401 })
    }

    const slug = url.searchParams.get('slug') || '/'

    // Enable Next draft mode so preview content is shown
    await (await draftMode()).enable()

    return NextResponse.redirect(slug)
  } catch (err) {
    return new NextResponse('Preview error', { status: 500 })
  }
}

export async function POST(request: Request) {
  // Support POST with JSON body that may include secret and slug
  try {
    const body = await request.json().catch(() => ({}))
    const secret = body.secret || new URL(request.url).searchParams.get('secret')
    if (!secret || secret !== process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET) {
      return new NextResponse('Invalid preview secret', { status: 401 })
    }
    const slug = body.slug || '/'
    await (await draftMode()).enable()
    return NextResponse.redirect(slug)
  } catch (err) {
    return new NextResponse('Preview error', { status: 500 })
  }
}
