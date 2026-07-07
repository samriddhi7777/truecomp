import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    const company = await prisma.company.findUnique({
      where: { slug: slug },
      include: {
        submissions: {
          select: {
            id: true,
            rawBand: true,
            normalizedLevel: true,
            role: true,
            yoe: true,
            location: true,
            totalComp: true,
            monthlyInhand: true,
            baseSalary: true,
            bonus: true,
            stocks: true,
          },
          orderBy: { createdAt: 'desc' },
        }
      }
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    const levelStats: Record<string, any> = {}
    const submissionsByLevel: Record<string, any[]> = {}

    company.submissions.forEach((sub: any) => {
      const level = sub.normalizedLevel || 'Unknown'
      if (!submissionsByLevel[level]) {
        submissionsByLevel[level] = []
      }
      submissionsByLevel[level].push(sub)
    })

    for (const [level, subs] of Object.entries(submissionsByLevel)) {
      const count = subs.length
      const totals = subs.map((s: any) => s.totalComp).sort((a, b) => a - b)
      const yoeValues = subs.map((s: any) => s.yoe).sort((a, b) => a - b)
      
      // Calculate monthly in-hand from total compensation if not stored
      const inhands = subs.map((s: any) => {
        if (s.monthlyInhand) return s.monthlyInhand
        // Calculate from total comp (in lakhs) to monthly in-hand in rupees
        return Math.round((s.totalComp * 100000 * 0.6) / 12)
      }).sort((a, b) => a - b)

      levelStats[level] = {
        count,
        medianTotal: totals[Math.floor(totals.length / 2)] || 0,
        medianInhand: inhands[Math.floor(inhands.length / 2)] || 0,
        avgYoe: yoeValues.reduce((a: number, b: number) => a + b, 0) / count || 0,
      }
    }

    return NextResponse.json({
      company: {
        id: company.id,
        name: company.name,
        slug: company.slug,
        type: company.type,
        logoUrl: company.logoUrl,
        website: company.website,
        headquarters: company.headquarters,
      },
      levelStats,
      totalSubmissions: company.submissions.length,
    })

  } catch (error) {
    console.error('Error fetching company:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company details' },
      { status: 500 }
    )
  }
}