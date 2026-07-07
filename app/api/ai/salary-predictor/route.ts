import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { company, role, yoe, location, skills } = await request.json()

    if (!company || !role || !yoe) {
      return NextResponse.json(
        { error: 'Missing required fields: company, role, yoe' },
        { status: 400 }
      )
    }

    // Get market data for context
    const marketData = await prisma.submission.aggregate({
      where: {
        company: { slug: company },
        yoe: {
          gte: Math.max(0, yoe - 2),
          lte: yoe + 2,
        }
      },
      _avg: {
        totalComp: true,
        baseSalary: true,
      },
      _count: true,
    })

    const hasMarketData = marketData._count > 0

    // AI Salary Prediction
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compensation expert. Predict salary ranges based on market data."
        },
        {
          role: "user",
          content: `
            Predict salary for:
            Company: ${company}
            Role: ${role}
            Years of Experience: ${yoe}
            Location: ${location || 'India'}
            Skills: ${skills || 'General'}
            
            ${hasMarketData ? `
            Market Data:
            - Average total comp: ₹${(marketData._avg.totalComp || 0) * 100000} 
            - Average base: ₹${(marketData._avg.baseSalary || 0) * 100000}
            - Sample size: ${marketData._count}
            ` : 'No market data available for this combination.'}

            Provide:
            1. Predicted salary range (min, median, max)
            2. Confidence level (low/medium/high)
            3. Factors affecting the prediction
            4. Recommendations to increase salary
          `
        }
      ],
      temperature: 0.6,
      max_tokens: 500,
    })

    const prediction = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      prediction,
      hasMarketData,
      dataPoints: marketData._count,
    })

  } catch (error) {
    console.error('Salary predictor error:', error)
    return NextResponse.json(
      { error: 'Failed to predict salary' },
      { status: 500 }
    )
  }
}