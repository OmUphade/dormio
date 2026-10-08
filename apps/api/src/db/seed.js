import { db, client } from '../infra/db.js';
import { users, organizations, properties, listings } from './schema/index.js';

async function seed() {
  console.log('Seeding initial development database...');
  try {
    // 1. Seed Owner
    const [owner] = await db
      .insert(users)
      .values({
        email: 'owner@dormio.local',
        phone: '+919876543201',
        fullName: 'Rajesh Kulkarni',
        role: 'ORG_OWNER',
      })
      .onConflictDoNothing()
      .returning();

    // 2. Seed Org
    const [org] = await db
      .insert(organizations)
      .values({
        name: 'Kulkarni Residencies',
        kind: 'INDIVIDUAL',
        upiId: 'rajesh.kulkarni@okaxis',
        kycStatus: 'VERIFIED',
      })
      .returning();

    // 3. Seed Property
    const [property] = await db
      .insert(properties)
      .values({
        organizationId: org.id,
        name: 'Greenview Scholars Residency',
        kind: 'HOSTEL',
        address: {
          line1: 'FC Road',
          city: 'Pune',
          locality: 'Shivajinagar',
          state: 'Maharashtra',
          pincode: '411004',
        },
        location: { x: 73.8415, y: 18.5246 },
        features: {
          cctv: true,
          mess_link: true,
          visitors: true,
          outpass: true,
          reviews: true,
        },
      })
      .returning();

    // 4. Seed Listing
    await db
      .insert(listings)
      .values({
        propertyId: property.id,
        slug: 'greenview-scholars-residency',
        title: 'Greenview Scholars Residency - FC Road',
        description: 'Premier student hostel on FC Road near Fergusson and BMCC.',
        status: 'PUBLISHED',
        minRentPaise: 850000,
        ratingAvg: 48,
        ratingCount: 38,
        verifiedListing: true,
        cctvMonitored: true,
        publishedAt: new Date(),
      })
      .returning();

    console.log('Seed completed successfully!');
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await client.end();
  }
}

seed();
