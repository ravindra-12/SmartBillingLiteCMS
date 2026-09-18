'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { dynamicPage } = require('../data/data.json');
const card = (title, description, icon = 'check') => ({ title, description, icon });
const item = (text) => ({ text });

const workspace = {
  badgeText: 'CHOOSE YOUR WORKSPACE', title: 'Smart billing, wherever business happens.',
  description: 'Start on your phone with Smart Billing Lite, or take your business further on the web with SmartBill Pro.',
  cards: [
    { eyebrow: 'ANDROID APP', title: 'Smart Billing Lite', description: 'Your everyday billing companion for faster checkout, digital payments, receipts, and simple business tracking.', features: [item('Fast billing on the go'), item('UPI and QR payments'), item('Receipts and daily reports')], buttonText: 'Download on Google Play', buttonLink: 'https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN', note: 'Free 30-day trial · No credit card needed', theme: 'light' },
    { eyebrow: 'LAPTOP & DESKTOP', title: 'SmartBill Pro', description: 'A complete web workspace for teams that want more control over billing, inventory, and business performance.', features: [item('Powerful desktop workspace'), item('Clear business insights'), item('Built for growing teams')], buttonText: 'Open SmartBill Pro', buttonLink: '#smartbill-pro', note: 'Open the web app from any laptop or desktop browser', theme: 'dark' }
  ]
};

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  const role = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  for (const action of ['find', 'findOne']) {
    const name = `api::feature-page.feature-page.${action}`;
    if (!await strapi.query('plugin::users-permissions.permission').findOne({ where: { action: name, role: role.id } })) await strapi.query('plugin::users-permissions.permission').create({ data: { action: name, role: role.id } });
  }
  const groups = [
    { title: 'Billing & Business Management', tone: 'green', items: [card('Smart Calculator Billing', 'Create fast bills using calculator-style billing.'), card('Product & Service Billing', 'Add items, services, quantity, price, and generate bills.'), card('Customer Management', 'Save customer name, mobile number, and billing history.'), card('Transaction History', 'Track daily, weekly, and monthly transactions easily.'), card('Daily / Monthly Reports', 'Understand income, sales, payments, and business growth.'), card('Expenses Tracking', 'Record investment, expenses, and calculate actual profit.')] },
    { title: 'Payment & Collection', tone: 'blue', items: [card('QR Code Payments', 'Collect payments quickly using QR code and UPI.'), card('UPI ID Support', 'Connect your business UPI ID for direct collections.'), card('Cash Management', 'Track cash transactions along with digital payments.'), card('Payment Sound Box', 'Support payment confirmation sound box for shops.'), card('WhatsApp Bill Sharing', 'Send bills and receipts instantly to customer WhatsApp.'), card('Clean Payment Status', 'Mark paid, pending, partial, or cleared transactions.')] },
    { title: 'Udhaar / Credit Management', tone: 'purple', items: [card('Customer Udhaar Tracking', 'Save pending amount with customer name and mobile number.'), card('Pending Amount List', 'View who has remaining payment and how much is due.'), card('Payment Reminders', 'Send WhatsApp reminders with amount and due date.'), card('Partial Payment', 'Collect partial amount and auto-update remaining balance.'), card('Clear Settlement', 'Show clean payment status when remaining amount is paid.'), card('Credit History', 'Track all past pending and cleared transactions.')] }
  ];
  const entryData = {
    seo: { metaTitle: 'Smart Billing Features | Billing App for Small Businesses', metaDescription: 'Explore Smart Billing Lite features for billing, payments, udhaar, reports, hardware integration, and AI business insights.', keywords: 'billing app features, QR payments, udhaar management, thermal printer billing', canonicalUrl: 'https://smartbillinglite.in/features' },
    geo: { aiSummary: [{ type: 'paragraph', children: [{ type: 'text', text: 'Smart Billing Lite provides simple mobile billing features for Indian small businesses, including invoicing, QR and UPI payments, customer udhaar, reports, receipt printing, hardware integrations, and AI-powered business insights.' }] }], keyTakeaways: 'Fast billing, QR and UPI payments, udhaar tracking, business reports, hardware support, and AI insights in one mobile billing app.', faqs: [], references: [{ title: 'Smart Billing Lite website', url: 'https://smartbillinglite.in/', publisher: 'Smart Billing Lite' }], topics: [{ title: 'Billing app features' }, { title: 'UPI payments' }, { title: 'Udhaar management' }, { title: 'Thermal printer integration' }], lastReviewed: '2026-09-17', canonicalUrl: 'https://smartbillinglite.in/features' },
    aeo: { enableAEO: true, schemaType: 'SoftwareApplication', headline: 'Smart Billing Lite Features', description: 'Billing, payments, udhaar tracking, reports, hardware integration, and AI insights for small businesses.', url: 'https://smartbillinglite.in/features', faqItems: [{ question: 'What features does Smart Billing Lite provide?', answer: 'It provides billing, QR and UPI payments, reports, udhaar tracking, receipt printing, hardware integration, and AI business insights.' }, { question: 'Does it support thermal printers?', answer: 'Yes, it supports Bluetooth and USB thermal printers.' }, { question: 'Can I share bills on WhatsApp?', answer: 'Yes, bills and receipts can be shared instantly on WhatsApp.' }] },
    hero: { badgeText: 'POWERFUL FEATURES FOR EVERYDAY BUSINESS', title: 'Everything You Need to Run Your Business Smarter', description: 'Manage billing, payments, customers, udhaar, receipts, reports, and hardware integrations from one simple mobile billing app.', primaryButtonText: 'Start 30-Day Free Trial', primaryButtonLink: 'https://smartbillinglite.in/#download-apk', secondaryButtonText: 'Request Demo', secondaryButtonLink: '#demo', dashboardValue: '₹12,450', dashboardGrowth: '+18%', totalBills: '68', customers: '128', pending: '₹2,350', profit: '₹4,870', chartLabel: 'Sales This Week', chartValues: '34,48,36,56,42,72,66' },
    featureGroups: groups,
    hardware: { badgeText: 'HARDWARE & DEVICES', heading: 'Hardware & Device Integration', subheading: 'Connect your billing app with thermal printers, POS devices, and payment confirmation sound boxes.', items: [card('Bluetooth Thermal Printer', 'Print receipts wirelessly from your mobile device.', 'printer'), card('USB Thermal Printer', 'Connect compatible USB printers for fast counter billing.', 'printer'), card('58mm / 80mm Printer', 'Supports common portable receipt printer sizes.', 'receipt'), card('Pine Labs POS Device', 'Useful for card payment and professional billing counters.', 'card'), card('Payment QR Sound Box', 'Hear payment confirmation instantly after QR payment.', 'sound')] },
    highlights: { aiHeading: 'AI-Powered Insights', aiItems: ['Daily sales insights', 'Best-selling products', 'Top customer analysis', 'Income growth tracking', 'Smart business suggestions'].map((title) => ({ title })), businessHeading: 'Built for Indian Small Businesses', businessItems: [item('Easy setup in minutes'), item('No training required'), item('Works for low-tech users'), item('Supports daily shop operations'), item('Affordable for small vendors')], buttonText: 'View Pricing & Start Trial', buttonLink: 'https://smartbillinglite.in/#pricing' },
    workspace,
    publishedAt: new Date().toISOString()
  };
  const docs = strapi.documents('api::feature-page.feature-page');
  const existing = await docs.findFirst({ status: 'published' });
  if (existing) await docs.update({ documentId: existing.documentId, data: entryData, status: 'published' });
  else await docs.create({ data: entryData, status: 'published' });
  console.log('Features content seeded with all sections and SEO/GEO/AEO.');
  await app.destroy();
  process.exit(0);
}
main().catch((error) => { console.error(error); process.exit(1); });
