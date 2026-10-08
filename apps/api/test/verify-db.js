import { db, client } from '../src/infra/db.js';
import { users, organizations, properties, listings } from '../src/db/schema/index.js';
import { sql } from 'drizzle-orm';

async function verifyDb() {
  console.log('--- Verifying Database, PostGIS, and pgvector ---');
  try {
    // 1. Verify extensions
    const extRows =
      await client`SELECT extname FROM pg_extension WHERE extname IN ('postgis', 'vector');`;
    console.log('Active extensions:', extRows.map((r) => r.extname).join(', '));
    if (extRows.length < 2) {
      throw new Error('Missing postgis or vector extension!');
    }

    // 2. Insert test user
    const [user] = await db
      .insert(users)
      .values({
        email: `test-${Date.now()}@dormio.local`,
        phone: '+919876543210',
        fullName: 'Test Resident',
        role: 'SEEKER',
      })
      .returning();
    console.log('✓ Inserted user:', user.id, user.email);

    // 3. Insert test organization
    const [org] = await db
      .insert(organizations)
      .values({
        name: 'Test Residencies Org',
        kind: 'BUSINESS',
        upiId: 'testorg@upi',
        kycStatus: 'VERIFIED',
      })
      .returning();
    console.log('✓ Inserted org:', org.id, org.name);

    // 4. Insert test property with PostGIS geometry (Point: lon 73.8567, lat 18.5204)
    const [prop] = await db
      .insert(properties)
      .values({
        organizationId: org.id,
        name: 'Pune Scholars Hostel',
        kind: 'HOSTEL',
        address: {
          line1: 'FC Road',
          city: 'Pune',
          locality: 'Shivajinagar',
          state: 'Maharashtra',
          pincode: '411005',
        },
        location: { x: 73.8567, y: 18.5204 },
        features: { cctv: true, mess_link: true },
      })
      .returning();
    console.log('✓ Inserted property with PostGIS geometry:', prop.id, prop.name);

    // Query property PostGIS location with ST_AsText
    const propGeoCheck = await client`
      SELECT id, name, ST_AsText(location) as geom_text, ST_X(location::geometry) as lon, ST_Y(location::geometry) as lat
      FROM properties WHERE id = ${prop.id};
    `;
    console.log(
      '✓ PostGIS Geometry verified:',
      propGeoCheck[0].geom_text,
      `(lon: ${propGeoCheck[0].lon}, lat: ${propGeoCheck[0].lat})`
    );

    // 5. Insert test listing with 1536-dim vector embedding
    const mockVector = new Array(1536).fill(0);
    mockVector[0] = 0.5;
    mockVector[1] = -0.25;
    mockVector[1535] = 0.123;

    const [listing] = await db
      .insert(listings)
      .values({
        propertyId: prop.id,
        slug: `pune-scholars-${Date.now()}`,
        title: 'Pune Scholars Luxury Bed',
        status: 'PUBLISHED',
        minRentPaise: 850000,
        embedding: mockVector,
      })
      .returning();
    console.log('✓ Inserted listing with pgvector 1536-dim embedding:', listing.id, listing.slug);

    // Query listing with pgvector cosine distance operator <=> or Euclidean <->
    const vectorCheck = await client`
      SELECT id, title, (embedding <-> ${JSON.stringify(mockVector)}::vector) as distance
      FROM listings WHERE id = ${listing.id};
    `;
    console.log('✓ pgvector verified! Distance to self:', vectorCheck[0].distance);

    // Clean up test rows
    await client`DELETE FROM users WHERE id = ${user.id};`;
    await client`DELETE FROM organizations WHERE id = ${org.id};`;
    console.log('✓ Cleaned up test records');

    console.log('--- ALL POSTGIS AND PGVECTOR VERIFICATIONS PASSED ---');
  } catch (err) {
    console.error('Database verification failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verifyDb();
