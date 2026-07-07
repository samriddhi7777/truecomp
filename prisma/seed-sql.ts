import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function seed() {
  console.log('🌱 Seeding database with SQL...')
  
  const sql = `
    -- Insert Companies
    INSERT INTO companies (id, name, slug, type, "logoUrl", website, "createdAt", "updatedAt") VALUES
    (gen_random_uuid(), 'Google', 'google', 'PRODUCT', 'https://logo.clearbit.com/google.com', 'https://google.com', NOW(), NOW()),
    (gen_random_uuid(), 'Amazon', 'amazon', 'PRODUCT', 'https://logo.clearbit.com/amazon.com', 'https://amazon.com', NOW(), NOW()),
    (gen_random_uuid(), 'Microsoft', 'microsoft', 'PRODUCT', 'https://logo.clearbit.com/microsoft.com', 'https://microsoft.com', NOW(), NOW()),
    (gen_random_uuid(), 'Infosys', 'infosys', 'SERVICE', 'https://logo.clearbit.com/infosys.com', 'https://infosys.com', NOW(), NOW()),
    (gen_random_uuid(), 'TCS', 'tcs', 'SERVICE', 'https://logo.clearbit.com/tcs.com', 'https://tcs.com', NOW(), NOW()),
    (gen_random_uuid(), 'Wipro', 'wipro', 'SERVICE', 'https://logo.clearbit.com/wipro.com', 'https://wipro.com', NOW(), NOW());
  `
  
  try {
    // Use psql to run the SQL
    await execAsync(`psql "${process.env.DATABASE_URL}" -c "${sql}"`)
    console.log('✅ Companies seeded!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  }
}

seed()