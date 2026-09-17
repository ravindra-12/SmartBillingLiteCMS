'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { dynamicPage } = require('../data/data.json');

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  const service = strapi.documents('api::home.home');
  const existing = await service.findFirst();
  if (!existing) {
    console.log('No existing home entry found');
    await app.destroy();
    process.exit(0);
  }

  // Try updating using entityService to set component fields
  await strapi.entityService.update('api::home.home', existing.id, {
    data: {
      features: [
        { text: 'Super Fast Billing — Create bills in seconds with calculator-based and item-wise billing for faster checkout.' },
      ],
      quickActions: [
        {
          title: 'Quick Actions',
          label: [ { items: 'Download Smart Billing Lite' } ],
        },
      ],
      moreApp: { title: 'Choose your workspace', label: [{ items: 'Download Smart Billing Lite' }] },
      stats: { title: '10,000+ Happy Users • 1L+ Bills Generated • 99.9% Uptime • 24x7 Support' },
    },
  });

  const updated = await service.findFirst();
  console.log('Updated doc:', JSON.stringify(updated, null, 2));

  await app.destroy();
  process.exit(0);
}

main().catch((err)=>{console.error(err);process.exit(1)});
