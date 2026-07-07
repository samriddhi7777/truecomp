import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { company, role, level, baseSalary, bonus, stocks, totalComp } = await request.json()

    // Validate required fields
    if (!company || !role || !baseSalary) {
      return NextResponse.json(
        { error: 'Missing required fields: company, role, baseSalary' },
        { status: 400 }
      )
    }

    // AI Analysis for offer letter
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert compensation analyst. Provide detailed offer analysis and negotiation advice."
        },
        {
          role: "user",
          content: `
            Analyze this job offer:
            Company: ${company}
            Role: ${role}
            Level: ${level || 'Not specified'}
            Base Salary: ₹${baseSalary} Lakhs
            Bonus: ₹${bonus || 0} Lakhs
            Stocks: ₹${stocks || 0} Lakhs
            Total Compensation: ₹${totalComp || baseSalary} Lakhs

            Provide:
            1. Market competitiveness assessment
            2. Strengths of the offer
            3. Areas for negotiation
            4. Recommended negotiation scripts
            5. What to ask for instead
          `
        }
      ],
      temperature: 0.7,
      max_tokens: 600,
    })

    const analysis = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      analysis,
    })

  } catch (error) {
    console.error('Offer analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze offer' },
      { status: 500 }
    )
  }
}