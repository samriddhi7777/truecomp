import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📩 Received:', body)

    // Validate required fields
    if (!body.companyId || !body.rawBand || !body.baseSalary) {
      return NextResponse.json(
        { error: 'Missing required fields: companyId, rawBand, and baseSalary are required' },
        { status: 400 }
      )
    }

    // Find the company by slug
    const company = await prisma.company.findUnique({
      where: { slug: body.companyId }
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    console.log('✅ Found company:', company.name)

    // Calculate total compensation in LAKHS
    const base = parseFloat(body.baseSalary) || 0
    const bonus = parseFloat(body.bonus || 0)
    const stocks = parseFloat(body.stocks || 0)
    const signingBonus = parseFloat(body.signingBonus || 0)
    const totalCompLakhs = base + bonus + stocks + signingBonus
    
    // Calculate monthly in-hand in RUPEES
    const monthlyInhand = Math.round((totalCompLakhs * 100000 * 0.6) / 12)

    // Find band mapping
    const bandMapping = await prisma.bandMapping.findFirst({
      where: {
        companyId: company.id,
        rawBand: body.rawBand,
      }
    })

    const normalizedLevel = bandMapping?.universalLevel || 'L3'

    // Check for duplicate
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        companyId: company.id,
        rawBand: body.rawBand,
        yoe: parseInt(body.yoe) || 0,
        role: body.role || 'Software Engineer',
      }
    })

    if (existingSubmission) {
      await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: { voteCount: { increment: 1 } }
      })

      return NextResponse.json({
        success: true,
        submission: {
          id: existingSubmission.id,
          normalizedLevel: existingSubmission.normalizedLevel,
          totalComp: existingSubmission.totalComp,
          monthlyInhand: existingSubmission.monthlyInhand || Math.round((existingSubmission.totalComp * 100000 * 0.6) / 12),
          alreadyExists: true,
        }
      })
    }

    // Create new submission
    const submission = await prisma.submission.create({
      data: {
        companyId: company.id,
        rawBand: body.rawBand,
        normalizedLevel: normalizedLevel as any,
        role: body.role || 'Software Engineer',
        yoe: parseInt(body.yoe) || 0,
        location: body.location || 'India',
        city: body.location || 'India',
        baseSalary: base,
        bonus: bonus,
        stocks: stocks,
        signingBonus: signingBonus,
        totalComp: totalCompLakhs,
        monthlyInhand: monthlyInhand,
        confidence: 0.7,
        source: 'manual',
      }
    })

    console.log('✅ New submission created:', submission.id)

    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        normalizedLevel: submission.normalizedLevel,
        totalComp: submission.totalComp,
        monthlyInhand: submission.monthlyInhand,
      }
    })

  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: 'Failed to submit. Please try again.' },
      { status: 500 }
    )
  }
}