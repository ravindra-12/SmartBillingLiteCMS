'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');

const workspace = {
  badgeText: 'CHOOSE YOUR WORKSPACE',
  title: 'Smart billing, wherever business happens.',
  description: 'Start on your phone with Smart Billing Lite, or take your business further on the web with SmartBill Pro.',
  cards: [
    { eyebrow: 'ANDROID APP', title: 'Smart Billing Lite', description: 'Your everyday billing companion for faster checkout, digital payments, receipts, and simple business tracking.', features: [{ text: 'Fast billing on the go' }, { text: 'UPI and QR payments' }, { text: 'Receipts and daily reports' }], buttonText: 'Download on Google Play', buttonLink: 'https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN', note: 'Free 30-day trial · No credit card needed', theme: 'light' },
    { eyebrow: 'LAPTOP & DESKTOP', title: 'SmartBill Pro', description: 'A complete web workspace for teams that want more control over billing, inventory, and business performance.', features: [{ text: 'Powerful desktop workspace' }, { text: 'Clear business insights' }, { text: 'Built for growing teams' }], buttonText: 'Open SmartBill Pro', buttonLink: '#smartbill-pro', note: 'Open the web app from any laptop or desktop browser', theme: 'dark' }
  ]
};

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  const role = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  for (const action of ['find', 'findOne']) {
    const name = `api::tutorial.tutorial.${action}`;
    if (!await strapi.query('plugin::users-permissions.permission').findOne({ where: { action: name, role: role.id } })) {
      await strapi.query('plugin::users-permissions.permission').create({ data: { action: name, role: role.id } });
    }
  }

  const entryData = {
    seo: { metaTitle: 'Smart Billing Tutorials | Learn Billing, Payments & Reports', metaDescription: 'Watch simple Smart Billing tutorials for billing, invoicing, UPI payments, udhaar, receipts, reports, and business growth.', keywords: 'Smart Billing tutorials, billing app tutorial, invoice tutorial, UPI payment tutorial, udhaar management tutorial', canonicalUrl: 'https://smartbillinglite.in/tutorials' },
    geo: { aiSummary: [{ type: 'paragraph', children: [{ type: 'text', text: 'Smart Billing Lite tutorials show Indian small-business owners how to create bills, collect UPI payments, manage udhaar, share receipts, print invoices, and understand business reports.' }] }], keyTakeaways: 'Short video tutorials for billing, invoicing, UPI payments, udhaar, receipts, reports, and daily business management.', faqs: [{ question: 'Where can I watch Smart Billing tutorials?', answer: [{ type: 'paragraph', children: [{ type: 'text', text: 'Watch the video tutorials on this page. Each tutorial card links to its YouTube video.' }] }] }, { question: 'Are the tutorials useful for new users?', answer: [{ type: 'paragraph', children: [{ type: 'text', text: 'Yes. The tutorials explain everyday Smart Billing workflows in short, practical steps.' }] }] }], references: [{ title: 'Smart Billing Lite website', url: 'https://smartbillinglite.in/', publisher: 'Smart Billing Lite' }], topics: [{ title: 'Billing tutorials' }, { title: 'UPI payment tutorials' }, { title: 'Udhaar management' }, { title: 'Business reports' }], lastReviewed: '2026-09-18', canonicalUrl: 'https://smartbillinglite.in/tutorials' },
    aeo: { enableAEO: true, schemaType: 'HowTo', headline: 'Learn Smart Billing with Quick Video Tutorials', description: 'Step-by-step Smart Billing videos for billing, payments, receipts, udhaar, reports, and business growth.', url: 'https://smartbillinglite.in/tutorials', faqItems: [{ question: 'What can I learn from these tutorials?', answer: 'You can learn billing, invoicing, payments, receipts, udhaar tracking, and reports.' }, { question: 'Do tutorial cards open YouTube videos?', answer: 'Yes. Every tutorial card has a YouTube URL for watching the full demo.' }] },
    hero: { badgeText: 'SEE IT IN ACTION', title: 'See how Smart Billing works', description: 'Watch quick demos of the key features that make billing faster, easier, and smarter for your business.' },
    videos: { badgeText: 'VIDEO TUTORIALS', title: 'Learn Smart Billing step by step', description: 'Practical video guides for everyday billing, payments, receipts, and business reporting.', videos: [
      { badgeText: 'DEMO', title: 'Complete App Overview', description: 'Full walkthrough of Smart Billing Lite — billing, payments, receipts, reports and more.', videoUrl: 'https://www.youtube.com/@SmartBillingLite/videos' },
      { badgeText: 'DEMO', title: 'Billing & Invoicing', description: 'Create professional invoices, add items, apply discounts, and print thermal receipts instantly.', videoUrl: 'https://www.youtube.com/@SmartBillingLite/videos' },
      { badgeText: 'DEMO', title: 'Payments & Reports', description: 'Collect UPI payments, track udhaar, and view daily profit reports on your mobile.', videoUrl: 'https://www.youtube.com/@SmartBillingLite/videos' }
    ] },
    workspace,
    publishedAt: new Date().toISOString()
  };

  const docs = strapi.documents('api::tutorial.tutorial');
  const existing = await docs.findFirst({ status: 'published' });
  if (existing) await docs.update({ documentId: existing.documentId, data: entryData, status: 'published' });
  else await docs.create({ data: entryData, status: 'published' });
  console.log('Tutorial content seeded with YouTube links and SEO/GEO/AEO.');
  await app.destroy();
  process.exit(0);
}

main().catch((error) => { console.error(error); process.exit(1); });
