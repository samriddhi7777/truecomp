import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic'

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
    const monthlyInhands = subs.map(s => s.monthlyInhand || 0).sort((a, b) => a - b)
    const yoeValues = subs.map(s => s.yoe)

    return NextResponse.json({
      company: company.name,
      count,
      data: {
        medianTotal: Math.round(totals[Math.floor(totals.length / 2)]),
        medianMonthly: Math.round(monthlyInhands[Math.floor(monthlyInhands.length / 2)]),
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
