'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  // List all Home entries and show populated components for each
  const homes = await strapi.entityService.findMany('api::home.home', { limit: 10 });
  console.log('homes raw:', JSON.stringify(homes, null, 2));
  if (Array.isArray(homes)) {
    for (const h of homes) {
    const full = await strapi.entityService.findOne('api::home.home', h.id, { populate: {
      seo: true,
      geo: true,
      aeo: true,
      hero: true,
      intro: true,
      featureGrid: true,
      videoSections: true,
      features: true,
      quickActions: true,
      moreApp: true,
      stats: true,
    } });
      console.log('Home entry id=' + h.id + ':', JSON.stringify(full, null, 2));
    }
  }
  console.log('Content type schema:', JSON.stringify(strapi.contentTypes['api::home.home'], null, 2));
  console.log('Component shared.features:', JSON.stringify(strapi.components['shared.features'], null, 2));
  console.log('Component shared.home-quick-action:', JSON.stringify(strapi.components['shared.home-quick-action'], null, 2));
  try {
    const featEntries = await strapi.entityService.findMany('component::shared.features', { limit: 50 });
    console.log('Component entries shared.features:', JSON.stringify(featEntries, null, 2));
  } catch (e) {
    console.log('Could not fetch component entries for shared.features', e.message);
  }

  await app.destroy();
  process.exit(0);
}

main().catch((err)=>{console.error(err);process.exit(1)});
