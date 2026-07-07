import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import OpenAI from 'openai'

const prisma = new PrismaClient()
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { companyId, level } = await request.json()

    // Get company data
    const company = await prisma.company.findUnique({
      where: { slug: companyId },
      include: {
        submissions: {
          where: {
            normalizedLevel: level as any,
          },
          select: {
            baseSalary: true,
            bonus: true,
            stocks: true,
            totalComp: true,
            yoe: true,
            location: true,
          },
          take: 50,
        }
      }
    })

    if (!company || company.submissions.length === 0) {
      return NextResponse.json(
        { error: 'Not enough data for analysis' },
        { status: 404 }
      )
    }

    // Calculate statistics
    const totals = company.submissions.map(s => s.totalComp)
    const avgTotal = totals.reduce((a, b) => a + b, 0) / totals.length
    const medianTotal = totals.sort((a, b) => a - b)[Math.floor(totals.length / 2)]
    const avgYoe = company.submissions.reduce((a, b) => a + b.yoe, 0) / company.submissions.length

    // AI Analysis
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a salary data analyst. Provide insights about compensation trends."
        },
        {
          role: "user",
          content: `
            Analyze this salary data for ${company.name} at Level ${level}:
            - Number of reports: ${company.submissions.length}
            - Average total comp: ₹${avgTotal.toFixed(0)}
            - Median total comp: ₹${medianTotal.toFixed(0)}
            - Average years of experience: ${avgYoe.toFixed(1)}
            
            Provide:
            1. Market position assessment (above/below average)
            2. Compensation breakdown recommendations
            3. Negotiation tips
            4. Career progression insights
          `
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const analysis = completion.choices[0].message.content

    // Save analysis
    await prisma.aIAnalysis.create({
      data: {
        companyId: company.id,
        level: level as any,
        analysis: { text: analysis, stats: { avgTotal, medianTotal, avgYoe } },
      }
    })

    return NextResponse.json({
      success: true,
      analysis,
      stats: {
        avgTotal,
        medianTotal,
        avgYoe,
        count: company.submissions.length,
      }
    })

  } catch (error) {
    console.error('AI Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    )
  }
}