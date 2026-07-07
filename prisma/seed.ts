import { PrismaClient, CompanyType, UniversalLevel } from '@prisma/client'

const prisma = new PrismaClient()

const companies = [
  // PRODUCT COMPANIES
  {
    name: 'Google',
    slug: 'google',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/google.com',
    website: 'https://google.com',
    bands: [
      { raw: 'L3', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'L4', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'L5', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'L6', level: UniversalLevel.L6, minYoe: 7, maxYoe: 12 },
      { raw: 'L7', level: UniversalLevel.L7, minYoe: 10, maxYoe: 15 },
      { raw: 'SDE 1', level: UniversalLevel.L3 },
      { raw: 'SDE 2', level: UniversalLevel.L4 },
      { raw: 'Senior SDE', level: UniversalLevel.L5 },
      { raw: 'Staff SDE', level: UniversalLevel.L6 },
    ]
  },
  {
    name: 'Amazon',
    slug: 'amazon',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/amazon.com',
    website: 'https://amazon.com',
    bands: [
      { raw: 'L4', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'L5', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'L6', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'L7', level: UniversalLevel.L6, minYoe: 7, maxYoe: 12 },
      { raw: 'L8', level: UniversalLevel.L7, minYoe: 10, maxYoe: 15 },
      { raw: 'SDE 1', level: UniversalLevel.L3 },
      { raw: 'SDE 2', level: UniversalLevel.L4 },
      { raw: 'SDE 3', level: UniversalLevel.L5 },
    ]
  },
  {
    name: 'Microsoft',
    slug: 'microsoft',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/microsoft.com',
    website: 'https://microsoft.com',
    bands: [
      { raw: '59', level: UniversalLevel.L2, minYoe: 0, maxYoe: 2 },
      { raw: '60', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: '61', level: UniversalLevel.L3, minYoe: 1, maxYoe: 4 },
      { raw: '62', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: '63', level: UniversalLevel.L4, minYoe: 3, maxYoe: 6 },
      { raw: '64', level: UniversalLevel.L5, minYoe: 5, maxYoe: 9 },
      { raw: '65', level: UniversalLevel.L5, minYoe: 6, maxYoe: 10 },
      { raw: '66', level: UniversalLevel.L6, minYoe: 8, maxYoe: 12 },
    ]
  },
  {
    name: 'Flipkart',
    slug: 'flipkart',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/flipkart.com',
    website: 'https://flipkart.com',
    bands: [
      { raw: 'SDE 1', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'SDE 2', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'SDE 3', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'Principal Engineer', level: UniversalLevel.L6, minYoe: 7, maxYoe: 12 },
      { raw: 'Staff Engineer', level: UniversalLevel.L5, minYoe: 5, maxYoe: 10 },
    ]
  },
  {
    name: 'Razorpay',
    slug: 'razorpay',
    type: CompanyType.STARTUP,
    logoUrl: 'https://logo.clearbit.com/razorpay.com',
    website: 'https://razorpay.com',
    bands: [
      { raw: 'SDE 1', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'SDE 2', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'SDE 3', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'Senior SDE', level: UniversalLevel.L5, minYoe: 5, maxYoe: 9 },
      { raw: 'Principal Engineer', level: UniversalLevel.L6, minYoe: 8, maxYoe: 12 },
    ]
  },
  {
    name: 'Swiggy',
    slug: 'swiggy',
    type: CompanyType.STARTUP,
    logoUrl: 'https://logo.clearbit.com/swiggy.com',
    website: 'https://swiggy.com',
    bands: [
      { raw: 'SDE 1', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'SDE 2', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'SDE 3', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'Senior SDE', level: UniversalLevel.L5, minYoe: 5, maxYoe: 9 },
    ]
  },
  {
    name: 'Zepto',
    slug: 'zepto',
    type: CompanyType.STARTUP,
    logoUrl: 'https://logo.clearbit.com/zepto.com',
    website: 'https://zepto.com',
    bands: [
      { raw: 'SDE 1', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'SDE 2', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'SDE 3', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
    ]
  },
  {
    name: 'Infosys',
    slug: 'infosys',
    type: CompanyType.SERVICE,
    logoUrl: 'https://logo.clearbit.com/infosys.com',
    website: 'https://infosys.com',
    bands: [
      { raw: 'Systems Engineer', level: UniversalLevel.L2, minYoe: 0, maxYoe: 2 },
      { raw: 'Senior Systems Engineer', level: UniversalLevel.L3, minYoe: 2, maxYoe: 4 },
      { raw: 'Technology Analyst', level: UniversalLevel.L4, minYoe: 3, maxYoe: 6 },
      { raw: 'Lead', level: UniversalLevel.L5, minYoe: 5, maxYoe: 8 },
      { raw: 'Senior Lead', level: UniversalLevel.L6, minYoe: 8, maxYoe: 12 },
      { raw: 'Principal', level: UniversalLevel.L7, minYoe: 12, maxYoe: 18 },
    ]
  },
  {
    name: 'TCS',
    slug: 'tcs',
    type: CompanyType.SERVICE,
    logoUrl: 'https://logo.clearbit.com/tcs.com',
    website: 'https://tcs.com',
    bands: [
      { raw: 'ASE', level: UniversalLevel.L2, minYoe: 0, maxYoe: 2 },
      { raw: 'SE', level: UniversalLevel.L3, minYoe: 2, maxYoe: 4 },
      { raw: 'ITA', level: UniversalLevel.L4, minYoe: 3, maxYoe: 6 },
      { raw: 'TA', level: UniversalLevel.L4, minYoe: 3, maxYoe: 6 },
      { raw: 'Consultant', level: UniversalLevel.L5, minYoe: 5, maxYoe: 8 },
      { raw: 'Senior Consultant', level: UniversalLevel.L6, minYoe: 8, maxYoe: 12 },
    ]
  },
  {
    name: 'Wipro',
    slug: 'wipro',
    type: CompanyType.SERVICE,
    logoUrl: 'https://logo.clearbit.com/wipro.com',
    website: 'https://wipro.com',
    bands: [
      { raw: 'Project Engineer', level: UniversalLevel.L2, minYoe: 0, maxYoe: 2 },
      { raw: 'Senior Project Engineer', level: UniversalLevel.L3, minYoe: 2, maxYoe: 4 },
      { raw: 'Technology Analyst', level: UniversalLevel.L4, minYoe: 3, maxYoe: 6 },
      { raw: 'Lead', level: UniversalLevel.L5, minYoe: 5, maxYoe: 8 },
      { raw: 'Senior Lead', level: UniversalLevel.L6, minYoe: 8, maxYoe: 12 },
    ]
  },
  {
    name: 'HCL',
    slug: 'hcl',
    type: CompanyType.SERVICE,
    logoUrl: 'https://logo.clearbit.com/hcl.com',
    website: 'https://hcl.com',
    bands: [
      { raw: 'Engineer', level: UniversalLevel.L2, minYoe: 0, maxYoe: 2 },
      { raw: 'Senior Engineer', level: UniversalLevel.L3, minYoe: 2, maxYoe: 4 },
      { raw: 'Lead Engineer', level: UniversalLevel.L4, minYoe: 3, maxYoe: 6 },
      { raw: 'Principal Engineer', level: UniversalLevel.L5, minYoe: 5, maxYoe: 8 },
    ]
  },
  {
    name: 'Tech Mahindra',
    slug: 'tech-mahindra',
    type: CompanyType.SERVICE,
    logoUrl: 'https://logo.clearbit.com/techmahindra.com',
    website: 'https://techmahindra.com',
    bands: [
      { raw: 'Associate Engineer', level: UniversalLevel.L2, minYoe: 0, maxYoe: 2 },
      { raw: 'Engineer', level: UniversalLevel.L3, minYoe: 2, maxYoe: 4 },
      { raw: 'Lead Engineer', level: UniversalLevel.L4, minYoe: 3, maxYoe: 6 },
      { raw: 'Senior Lead', level: UniversalLevel.L5, minYoe: 5, maxYoe: 8 },
    ]
  },
  {
    name: 'Uber',
    slug: 'uber',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/uber.com',
    website: 'https://uber.com',
    bands: [
      { raw: 'L3', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'L4', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'L5', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'L6', level: UniversalLevel.L6, minYoe: 7, maxYoe: 12 },
      { raw: 'SDE 1', level: UniversalLevel.L3 },
      { raw: 'SDE 2', level: UniversalLevel.L4 },
      { raw: 'Senior SDE', level: UniversalLevel.L5 },
    ]
  },
  {
    name: 'Adobe',
    slug: 'adobe',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/adobe.com',
    website: 'https://adobe.com',
    bands: [
      { raw: 'SDE 1', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'SDE 2', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'SDE 3', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'Principal', level: UniversalLevel.L6, minYoe: 7, maxYoe: 12 },
    ]
  },
  {
    name: 'Oracle',
    slug: 'oracle',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/oracle.com',
    website: 'https://oracle.com',
    bands: [
      { raw: 'SDE 1', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'SDE 2', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'SDE 3', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'Senior Principal', level: UniversalLevel.L6, minYoe: 7, maxYoe: 12 },
    ]
  },
  {
    name: 'Salesforce',
    slug: 'salesforce',
    type: CompanyType.PRODUCT,
    logoUrl: 'https://logo.clearbit.com/salesforce.com',
    website: 'https://salesforce.com',
    bands: [
      { raw: 'SDE 1', level: UniversalLevel.L3, minYoe: 0, maxYoe: 3 },
      { raw: 'SDE 2', level: UniversalLevel.L4, minYoe: 2, maxYoe: 5 },
      { raw: 'SDE 3', level: UniversalLevel.L5, minYoe: 4, maxYoe: 8 },
      { raw: 'Lead SDE', level: UniversalLevel.L6, minYoe: 7, maxYoe: 12 },
    ]
  },
]

async function main() {
  console.log('🌱 Seeding database with companies...')

  for (const companyData of companies) {
    const { bands, ...companyInfo } = companyData
    
    const company = await prisma.company.upsert({
      where: { slug: companyInfo.slug },
      update: companyInfo,
      create: companyInfo,
    })

    for (const band of bands) {
      await prisma.bandMapping.upsert({
        where: {
          companyId_rawBand: {
            companyId: company.id,
            rawBand: band.raw,
          },
        },
        update: { 
          universalLevel: band.level,
          confidence: 0.9,
          minYoe: band.minYoe || null,
          maxYoe: band.maxYoe || null,
        },
        create: {
          companyId: company.id,
          rawBand: band.raw,
          universalLevel: band.level,
          confidence: 0.9,
          minYoe: band.minYoe || null,
          maxYoe: band.maxYoe || null,
        },
      })
    }

    console.log(`✅ ${company.name} - ${bands.length} bands`)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })