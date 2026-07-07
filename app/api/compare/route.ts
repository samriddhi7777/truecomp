import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const companyId = searchParams.get('companyId')
    const level = searchParams.get('level')

    if (!companyId || !level) {
      return NextResponse.json(
        { error: 'Missing companyId or level' },
        { status: 400 }
      )
    }

    const company = await prisma.company.findUnique({
      where: { slug: companyId },
      include: {
        submissions: {
          where: {
            normalizedLevel: level as any,
          },
          select: {
            totalComp: true,
            monthlyInhand: true,
            yoe: true,
          }
        }
      }
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    const subs = company.submissions
    const count = subs.length

    if (count === 0) {
      return NextResponse.json({
        company: company.name,
        count: 0,
        data: null,
      })
    }

    const totals = subs.map(s => s.totalComp).sort((a, b) => a - b)
    const yoeValues = subs.map(s => s.yoe)
    
    // Calculate monthly in-hand - use stored value or calculate
    const inhands = subs.map(s => {
      if (s.monthlyInhand) return s.monthlyInhand
      return Math.round((s.totalComp * 100000 * 0.6) / 12)
    }).sort((a, b) => a - b)

    return NextResponse.json({
      company: company.name,
      count,
      data: {
        medianTotal: Math.round(totals[Math.floor(totals.length / 2)]),
        medianMonthly: Math.round(inhands[Math.floor(inhands.length / 2)]),
        averageYoe: Math.round(yoeValues.reduce((a, b) => a + b, 0) / count * 10) / 10,
      }
    })

  } catch (error) {
    console.error('Comparison error:', error)
    return NextResponse.json(
      { error: 'Failed to get comparison data' },
      { status: 500 }
    )
  }
}