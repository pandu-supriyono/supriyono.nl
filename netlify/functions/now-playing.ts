import { Handler } from '@netlify/functions'
import fetch from 'node-fetch'

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: 'Method Not Allowed'
      })
    }
  }

  const { LAST_FM_API_KEY, LAST_FM_USER } = process.env
  const apiPath = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USER}&api_key=${LAST_FM_API_KEY}&limit=1&format=json`

  try {
    const response = await fetch(apiPath)

    if (response.ok) {
      const payload = await response.json() as any

      if (payload.recenttracks && payload.recenttracks.track) {
        const track = payload.recenttracks.track[0] as { name: string; url: string; artist: { '#text': string } }

        return {
          statusCode: 200,
          body: JSON.stringify(track)
        }
      }
    }

    return {
      statusCode: response.status || 500
    }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}
