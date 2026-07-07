-- Delete existing data
TRUNCATE TABLE "band_mappings" CASCADE;
TRUNCATE TABLE "companies" CASCADE;

-- Insert Companies
INSERT INTO companies (id, name, slug, type, "logoUrl", website, "createdAt", "updatedAt")
VALUES 
  (gen_random_uuid(), 'Google', 'google', 'PRODUCT', 'https://logo.clearbit.com/google.com', 'https://google.com', NOW(), NOW()),
  (gen_random_uuid(), 'Amazon', 'amazon', 'PRODUCT', 'https://logo.clearbit.com/amazon.com', 'https://amazon.com', NOW(), NOW()),
  (gen_random_uuid(), 'Microsoft', 'microsoft', 'PRODUCT', 'https://logo.clearbit.com/microsoft.com', 'https://microsoft.com', NOW(), NOW()),
  (gen_random_uuid(), 'Infosys', 'infosys', 'SERVICE', 'https://logo.clearbit.com/infosys.com', 'https://infosys.com', NOW(), NOW()),
  (gen_random_uuid(), 'TCS', 'tcs', 'SERVICE', 'https://logo.clearbit.com/tcs.com', 'https://tcs.com', NOW(), NOW()),
  (gen_random_uuid(), 'Wipro', 'wipro', 'SERVICE', 'https://logo.clearbit.com/wipro.com', 'https://wipro.com', NOW(), NOW());

-- Insert Band Mappings for Google
INSERT INTO band_mappings (id, "companyId", "rawBand", "universalLevel", confidence, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  (SELECT id FROM companies WHERE slug = 'google'),
  band_name,
  level::"UniversalLevel",
  0.9,
  NOW(),
  NOW()
FROM (VALUES 
  ('L3', 'L1'), ('L4', 'L2'), ('L5', 'L3'), ('Software Engineer', 'L2'), ('Senior Software Engineer', 'L3')
) AS v(band_name, level);

-- Insert Band Mappings for Amazon
INSERT INTO band_mappings (id, "companyId", "rawBand", "universalLevel", confidence, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  (SELECT id FROM companies WHERE slug = 'amazon'),
  band_name,
  level::"UniversalLevel",
  0.9,
  NOW(),
  NOW()
FROM (VALUES 
  ('L4', 'L1'), ('L5', 'L2'), ('L6', 'L3'), ('SDE 1', 'L1'), ('SDE 2', 'L2'), ('SDE 3', 'L3')
) AS v(band_name, level);

-- Insert Band Mappings for Microsoft
INSERT INTO band_mappings (id, "companyId", "rawBand", "universalLevel", confidence, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  (SELECT id FROM companies WHERE slug = 'microsoft'),
  band_name,
  level::"UniversalLevel",
  0.9,
  NOW(),
  NOW()
FROM (VALUES 
  ('59', 'L1'), ('60', 'L1'), ('61', 'L2'), ('62', 'L2'), ('63', 'L3'), ('Software Engineer', 'L2')
) AS v(band_name, level);

-- Insert Band Mappings for Infosys
INSERT INTO band_mappings (id, "companyId", "rawBand", "universalLevel", confidence, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  (SELECT id FROM companies WHERE slug = 'infosys'),
  band_name,
  level::"UniversalLevel",
  0.9,
  NOW(),
  NOW()
FROM (VALUES 
  ('Systems Engineer', 'L1'), ('Senior Systems Engineer', 'L2'), ('Technology Analyst', 'L3')
) AS v(band_name, level);

-- Insert Band Mappings for TCS
INSERT INTO band_mappings (id, "companyId", "rawBand", "universalLevel", confidence, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  (SELECT id FROM companies WHERE slug = 'tcs'),
  band_name,
  level::"UniversalLevel",
  0.9,
  NOW(),
  NOW()
FROM (VALUES 
  ('Assistant Systems Engineer', 'L1'), ('Systems Engineer', 'L2'), ('Technology Analyst', 'L3')
) AS v(band_name, level);

-- Insert Band Mappings for Wipro
INSERT INTO band_mappings (id, "companyId", "rawBand", "universalLevel", confidence, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  (SELECT id FROM companies WHERE slug = 'wipro'),
  band_name,
  level::"UniversalLevel",
  0.9,
  NOW(),
  NOW()
FROM (VALUES 
  ('Project Engineer', 'L1'), ('Senior Project Engineer', 'L2'), ('Technology Analyst', 'L3')
) AS v(band_name, level);

SELECT '✅ Seeding completed!' as message;