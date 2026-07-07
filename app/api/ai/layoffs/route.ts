import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const industry = searchParams.get('industry') || 'technology'

    // AI Layoff Analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a tech industry analyst. Provide information about layoffs and market trends."
        },
        {
          role: "user",
          content: `
            Provide a summary of recent layoffs in the ${industry} industry.
            Include:
            1. Major companies that have had layoffs
            2. Approximate number of people affected
            3. Key reasons for the layoffs
            4. Impact on the industry
            5. What professionals should do to stay safe
            
            Keep it concise and data-driven.
          `
        }
      ],
      temperature: 0.5,
      max_tokens: 400,
    })

    const analysis = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      industry,
      analysis,
    })

  } catch (error) {
    console.error('Layoff tracker error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch layoff data' },
      { status: 500 }
    )
  }
}