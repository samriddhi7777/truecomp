import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const ROASTER_PERSONALITIES = {
  'elon': 'Elon Musk - visionary but brutally honest, talks about engineering and scaling',
  'harvey': 'Harvey Specter - confident, no-nonsense, talks about winning and being the best',
  'rock': 'The Rock - motivational but tough love, talks about hustle and grind',
  'trump': 'Donald Trump - direct, says "you\'re fired", talks about deals and winning',
  'logan': 'Logan Roy - old-school businessman, talks about power and empire building',
}

export async function POST(request: NextRequest) {
  try {
    const { linkedinUrl, roasterId = 'elon' } = await request.json()

    if (!linkedinUrl) {
      return NextResponse.json(
        { error: 'LinkedIn URL is required' },
        { status: 400 }
      )
    }

    const personality = ROASTER_PERSONALITIES[roasterId as keyof typeof ROASTER_PERSONALITIES] || ROASTER_PERSONALITIES.elon

    // AI Career Roast
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are ${personality}. Give brutally honest career feedback. Be direct, use humor, and end with actionable advice.`
        },
        {
          role: "user",
          content: `
            Based on this LinkedIn profile: ${linkedinUrl}
            
            Give a career roast that includes:
            1. What they're doing wrong in their career
            2. Their biggest weaknesses based on their profile
            3. What they need to change immediately
            4. A wake-up call about their career trajectory
            5. 3 actionable steps to improve
            
            Format: Keep it sharp, funny, and under 200 words. Use emojis for impact.
          `
        }
      ],
      temperature: 0.9,
      max_tokens: 400,
    })

    const roast = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      roast,
      roaster: roasterId,
    })

  } catch (error) {
    console.error('Career roast error:', error)
    return NextResponse.json(
      { error: 'Failed to generate roast' },
      { status: 500 }
    )
  }
}