/* eslint-disable */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main(){
  const pass = await bcrypt.hash('password123', 10);
  const seller = await prisma.user.upsert({
    where: { email: 'seller@demo.com' }, update: {},
    create: { email: 'seller@demo.com', passwordHash: pass, username: 'sellerdemo', role: 'SELLER' }
  });
  await prisma.profile.upsert({ where: { userId: seller.id }, update: { welcome: 'Welcome to Seller Demo', brandColor: '#0ea5e9' }, create: { userId: seller.id, welcome: 'Welcome to Seller Demo', brandColor: '#0ea5e9' } });
  await prisma.product.createMany({ data: [
    { userId: seller.id, title: 'Cleekz Tee',  price: 150000, stock: 10, barcode: 'CLZ-TEE-001' },
    { userId: seller.id, title: 'Cleekz Cap',  price: 100000, stock:  7, barcode: 'CLZ-CAP-001' },
    { userId: seller.id, title: 'Cleekz Tote', price:  80000, stock:  5, barcode: 'CLZ-TOTE-001' }
  ]});
  const vendor = await prisma.user.upsert({
    where: { email: 'vendor@demo.com' }, update: {},
    create: { email: 'vendor@demo.com', passwordHash: pass, username: 'vendordemo', role: 'VENDOR' }
  });
  await prisma.profile.upsert({ where: { userId: vendor.id }, update: { welcome: 'Welcome to Vendor Demo', brandColor: '#22c55e' }, create: { userId: vendor.id, welcome: 'Welcome to Vendor Demo', brandColor: '#22c55e' } });
  const ev = await prisma.event.create({ data: { userId: vendor.id, title: 'Cleekz Live', description: 'Demo Event', venue: 'Lagos', startsAt: new Date(Date.now()+7*24*60*60*1000) } });
  await prisma.ticketType.create({ data: { eventId: ev.id, name: 'Regular', price: 200000, limit: 100 } });
  const music = await prisma.user.upsert({
    where: { email: 'music@demo.com' }, update: {},
    create: { email: 'music@demo.com', passwordHash: pass, username: 'musicdemo', role: 'MUSICIAN' }
  });
  await prisma.profile.upsert({ where: { userId: music.id }, update: { welcome: 'Welcome to Music Demo', brandColor: '#ef4444' }, create: { userId: music.id, welcome: 'Welcome to Music Demo', brandColor: '#ef4444' } });
  await prisma.musicTrack.createMany({ data: [
    { userId: music.id, title: 'Vibe One',   previewUrl: '', fullLink: 'https://open.spotify.com' },
    { userId: music.id, title: 'Vibe Two',   previewUrl: '', fullLink: 'https://music.apple.com' },
    { userId: music.id, title: 'Vibe Three', previewUrl: '', fullLink: 'https://audiomack.com' }
  ]});
  console.log('Seeded. Demos: seller@demo.com, vendor@demo.com, music@demo.com / password123');
}
main().finally(()=>prisma.$disconnect());
