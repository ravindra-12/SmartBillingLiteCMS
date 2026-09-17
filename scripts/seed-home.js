'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { dynamicPage } = require('../data/data.json');
const feature = (title, description) => ({ title, description });

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  for (const action of ['find', 'findOne']) {
    const actionName = `api::home.home.${action}`;
    const permission = await strapi.query('plugin::users-permissions.permission').findOne({ where: { action: actionName, role: publicRole.id } });
    if (!permission) await strapi.query('plugin::users-permissions.permission').create({ data: { action: actionName, role: publicRole.id } });
  }
  const entryData = {
    seo: dynamicPage.seo,
    geo: dynamicPage.geo,
    aeo: dynamicPage.aeo,
    hero: { badgeText: 'AI-POWERED BILLING APP', titleLine1: 'Smart Billing', titleLine2: 'Made Simple!', description: 'AI-powered mobile billing app with QR payments, thermal printing, POS device support, sound box integration, udhaar tracking, and daily business reports.', primaryButtonText: 'Start 30-Day Free Trial', primaryButtonLink: 'https://smartbillinglite.in/#download-apk', secondaryButtonText: 'Watch demo', secondaryButtonLink: '#demo' },
    workspace: { badgeText: 'CHOOSE YOUR WORKSPACE', title: 'Smart billing, wherever business happens.', description: 'Start on your phone with Smart Billing Lite, or take your business further on the web with SmartBill Pro.', cards: [
      { eyebrow: 'ANDROID APP', title: 'Smart Billing Lite', description: 'Your everyday billing companion for faster checkout, digital payments, receipts, and simple business tracking.', features: [{ text: 'Fast billing on the go' }, { text: 'UPI and QR payments' }, { text: 'Receipts and daily reports' }], buttonText: 'Download on Google Play', buttonLink: 'https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN', note: 'Free 30-day trial · No credit card needed', theme: 'light' },
      { eyebrow: 'LAPTOP & DESKTOP', title: 'SmartBill Pro', description: 'A complete web workspace for teams that want more control over billing, inventory, and business performance.', features: [{ text: 'Powerful desktop workspace' }, { text: 'Clear business insights' }, { text: 'Built for growing teams' }], buttonText: 'Open SmartBill Pro', buttonLink: '#smartbill-pro', note: 'Open the web app from any laptop or desktop browser', theme: 'dark' }
    ] },
    videos: { badgeText: 'SEE IT IN ACTION', title: 'See how Smart Billing works', description: 'Watch quick demos of the key features that make billing faster, easier, and smarter for your business.', videos: [
      { badgeText: 'DEMO', title: 'Complete App Overview', description: 'Full walkthrough of Smart Billing Lite — billing, payments, receipts, reports and more.', videoUrl: 'https://www.youtube.com/' },
      { badgeText: 'DEMO', title: 'Billing & Invoicing', description: 'Create professional invoices, add items, apply discounts, and print thermal receipts instantly.', videoUrl: 'https://www.youtube.com/' },
      { badgeText: 'DEMO', title: 'Payments & Reports', description: 'Collect UPI payments, track udhaar, and view daily profit reports on your mobile.', videoUrl: 'https://www.youtube.com/' }
    ] },
    businessTypes: { badgeText: 'BUILT FOR YOU', title: 'Perfect For Every Small Business', description: 'Built for daily billing, payment collection, receipt printing, and business tracking.', items: ['Kirana Store', 'Grocery Store', 'Pharmacy', 'Salon & Spa', 'Food Stall', 'Repair Shop', 'Small Vendors'].map((title) => ({ title })) },
    whyChoose: { badgeText: 'WHY SMART BILLING LITE', title: 'Why Choose Smart Billing Lite?', description: 'Everything a small business needs to bill faster, collect better, and grow smarter.', features: [feature('Super Fast Billing', 'Create bills in seconds with calculator-based and item-wise billing for faster checkout.'), feature('QR & UPI Payments', 'Accept instant digital payments through QR code, UPI, and multiple payment methods.'), feature('Thermal Receipt Printing', 'Print customer receipts instantly using Bluetooth and USB thermal printers.'), feature('Udhaar Management', 'Track customer dues, manage pending payments, and send payment reminders easily.'), feature('Daily Income Tracking', 'Monitor daily sales, profit, expenses, and payment status with smart reports.'), feature('AI Business Insights', 'Get intelligent business suggestions and analytics to improve growth and profits.')] },
    appDownload: { badgeText: 'ANDROID APP', title: 'Get Smart Billing Lite on your phone', description: 'Download the APK directly and start billing in minutes — free 30-day trial, no credit card needed.', version: 'Version: v3.2.0', size: 'Size: 18 MB', requirements: 'Requires: Android 7.0+', buttonText: 'Download APK', buttonLink: 'https://smartbillinglite.in/#download-apk' },
    stats: { items: [{ value: '10,000+', label: 'HAPPY USER' }, { value: '1L+', label: 'BILLS GENERATED' }, { value: '99.9%', label: 'UPTIME' }, { value: '24x7', label: 'SUPPORT' }] },
    publishedAt: new Date().toISOString()
  };
  const homeDocuments = strapi.documents('api::home.home');
  const existing = await homeDocuments.findFirst({ status: 'published' });
  if (existing) {
    await homeDocuments.update({ documentId: existing.documentId, data: entryData, status: 'published' });
  } else {
    await homeDocuments.create({ data: entryData, status: 'published' });
  }
  console.log('Home content seeded with all homepage sections.');
  await app.destroy();
  process.exit(0);
}

main().catch((error) => { console.error(error); process.exit(1); });
