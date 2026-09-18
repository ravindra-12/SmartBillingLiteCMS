'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const f = (text) => ({ text });
const pf = (text) => ({ text });

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  const role = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  for (const action of ['find', 'findOne']) {
    const name = `api::pricing-page.pricing-page.${action}`;
    if (!await strapi.query('plugin::users-permissions.permission').findOne({ where: { action: name, role: role.id } })) await strapi.query('plugin::users-permissions.permission').create({ data: { action: name, role: role.id } });
  }
  const workspace = { badgeText: 'CHOOSE YOUR WORKSPACE', title: 'Smart billing, wherever business happens.', description: 'Start on your phone with Smart Billing Lite, or take your business further on the web with SmartBill Pro.', cards: [
    { eyebrow: 'ANDROID APP', title: 'Smart Billing Lite', description: 'Your everyday billing companion for faster checkout, digital payments, receipts, and simple business tracking.', features: [f('Fast billing on the go'), f('UPI and QR payments'), f('Receipts and daily reports')], buttonText: 'Download on Google Play', buttonLink: 'https://play.google.com/store/apps/details?id=com.murmu.smartbillinglite&hl=en_IN', note: 'Free 30-day trial · No credit card needed', theme: 'light' },
    { eyebrow: 'LAPTOP & DESKTOP', title: 'SmartBill Pro', description: 'A complete web workspace for teams that want more control over billing, inventory, and business performance.', features: [f('Powerful desktop workspace'), f('Clear business insights'), f('Built for growing teams')], buttonText: 'Open SmartBill Pro', buttonLink: '#smartbill-pro', note: 'Open the web app from any laptop or desktop browser', theme: 'dark' }
  ] };
  const entryData = {
    seo: { metaTitle: 'Smart Billing Pricing | Plans for Every Small Business', metaDescription: 'Start free with Smart Billing Lite. Choose monthly or yearly billing plans with all the features your business needs.', keywords: 'billing app pricing, Smart Billing plans, billing software subscription', canonicalUrl: 'https://smartbillinglite.in/pricing' },
    geo: { aiSummary: [{ type: 'paragraph', children: [{ type: 'text', text: 'Smart Billing Lite offers a 30-day free trial, affordable monthly pricing, and a yearly plan for Indian small businesses.' }] }], keyTakeaways: '30-day free trial, ₹50 monthly plan, ₹500 yearly plan, no hidden charges, secure payment, and cancel anytime.', faqs: [{ question: 'Is there a free trial?', answer: [{ type: 'paragraph', children: [{ type: 'text', text: 'Yes, Smart Billing Lite includes a 30-day free trial.' }] }] }], references: [{ title: 'Smart Billing Lite website', url: 'https://smartbillinglite.in/', publisher: 'Smart Billing Lite' }], topics: [{ title: 'Billing app pricing' }, { title: 'Free billing trial' }], lastReviewed: '2026-09-17', canonicalUrl: 'https://smartbillinglite.in/pricing' },
    aeo: { enableAEO: true, schemaType: 'Product', headline: 'Smart Billing Lite Pricing', description: 'Affordable billing plans for small businesses with a free 30-day trial.', url: 'https://smartbillinglite.in/pricing', faqItems: [{ question: 'How much does Smart Billing Lite cost?', answer: 'Start free for 30 days, then choose ₹50 per month or ₹500 per year.' }, { question: 'Can I cancel anytime?', answer: 'Yes, you can cancel anytime with no hidden charges.' }] },
    hero: { badgeText: 'SIMPLE PRICING FOR EVERY BUSINESS', title: 'Start Free Today. Upgrade Anytime.', description: 'Use Smart Billing Lite free for 30 days. Continue with an affordable monthly or yearly plan built for small businesses.' },
    plans: { plans: [
      { name: '30-Day Free Trial', price: '₹0', duration: '30 Days', tag: 'START FREE', color: 'orange', icon: '↗', button: 'Start Free Trial', features: ['All features access', 'Unlimited bills', 'Thermal print', 'QR payments', 'Udhaar management', 'AI insights'].map(f) },
      { name: 'Monthly Plan', price: '₹50', duration: 'month', tag: 'MOST POPULAR', color: 'orange', icon: '↗', button: 'Choose Monthly', features: ['All trial features', 'Daily reports', 'WhatsApp reminders', 'Data backup', 'Regular updates', 'Priority support'].map(f) },
      { name: 'Yearly Plan', price: '₹500', duration: 'Year', tag: 'BEST VALUE', color: 'blue', icon: '♕', button: 'Choose Yearly', features: ['All monthly features', 'Save ₹100 yearly', 'Yearly priority support', 'Additional features access', 'Early access to updates', 'Business growth reports'].map(f) }
    ], trustItems: ['No hidden charges', 'Secure payment', 'Cancel anytime', '100% safe records'].map(f) },
    steps: { badgeText: 'GET STARTED', heading: 'How to Get Started?', subheading: 'Start billing in just a few simple steps.', steps: [pf('Register'), pf('Setup Shop'), pf('Start Billing'), pf('Track & Grow')].map((x, i) => ({ title: x.text, description: ['Enter your mobile number and verify with OTP.', 'Add shop name, business type, QR/UPI details.', 'Create bills, collect payments, print receipts.', 'Track income, udhaar, profit, and business growth.'][i], icon: String(i + 1) })) },
    bottom: { loginHeading: 'Login to Your Account', loginDescription: 'Register or login using mobile number and OTP.', phoneLabel: 'MOBILE NUMBER', countryCode: '+91', phonePlaceholder: 'Enter 10 digits phone number', otpButtonText: 'Send OTP', registerPrompt: 'New user?', registerText: 'Register Now', testimonialHeading: 'Why Business Owners Love Smart Billing Lite ❤️', testimonialQuote: '"Smart Billing Lite ने हमारे shop का काम बहुत आसान कर दिया है. Billing, udhaar और daily reporting अब एक ही app में मिल जाता है."', testimonialInitial: 'R', testimonialName: 'Rajesh Kumar', testimonialMeta: 'Kirana Store Owner, Patna', testimonialBenefits: ['Fast & secure login', 'Instant trial activation', 'Works on all devices', 'Lightning fast support'].map(f), ctaHeading: 'Ready to Make Your Billing Smarter?', ctaDescription: 'Join thousands of small businesses using Smart Billing Lite for faster billing, secure payments, receipts, and daily business growth.', ctaPrimaryButtonText: 'Start 30-Day Free Trial', ctaPrimaryButtonLink: 'https://smartbillinglite.in/#download-apk', ctaSecondaryButtonText: 'Request Demo', ctaSecondaryButtonLink: '#demo' },
    workspace,
    publishedAt: new Date().toISOString()
  };
  const docs = strapi.documents('api::pricing-page.pricing-page');
  const existing = await docs.findFirst({ status: 'published' });
  if (existing) await docs.update({ documentId: existing.documentId, data: entryData, status: 'published' });
  else await docs.create({ data: entryData, status: 'published' });
  console.log('Pricing content seeded with all sections and SEO/GEO/AEO.');
  await app.destroy();
  process.exit(0);
}
main().catch((error) => { console.error(error); process.exit(1); });
