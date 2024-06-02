import { prismaClient } from "..";


async function seedRoles() {
  try {
    const defaultRole = await prismaClient.role.upsert({
      where: { name: 'default' },
      update: {},
      create: {
        name: 'default',
        description: 'Default role for new users'
      }
    });
    console.log('Default role ensured:', defaultRole);
  } catch (error) {
    console.error('Error seeding roles:', error);
    throw error; // Throw error to indicate seeding failure
  } finally {
    await prismaClient.$disconnect(); // Disconnect Prisma client
  }
}

seedRoles().catch(console.error); // Execute the seeding function
