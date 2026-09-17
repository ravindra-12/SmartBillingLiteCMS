'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { dynamicPage } = require('../data/data.json');

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  // prepare feature texts
  const featureGrids = (dynamicPage.blocks || []).filter((b) => b.__component === 'shared.dynamic-page-feature-grid');
  const detailed = featureGrids.length > 1 ? featureGrids[1] : featureGrids[0] || null;
  const texts = [];
  if (detailed && Array.isArray(detailed.features)) {
    for (const f of detailed.features) texts.push(f.description ? `${f.title} — ${f.description}` : f.title);
  }

  if (texts.length === 0) {
    console.log('No feature texts found to create');
    await app.destroy();
    process.exit(0);
  }

  // create component entries for each feature
  const created = [];
  for (const t of texts) {
    const comp = await strapi.entityService.create('component::shared.features', { data: { text: t } });
    created.push(comp);
    console.log('Created feature component id=', comp.id, 'text=', comp.text);
  }

  // attach to home
  const homes = await strapi.entityService.findMany('api::home.home', { limit: 1 });
  if (!homes || homes.length === 0) {
    console.log('No home entry found');
    await app.destroy();
    process.exit(0);
  }
  const homeId = homes[0].id;

  // For attachment, pass array of objects with id
  const featureRefs = created.map((c) => ({ id: c.id }));
  await strapi.entityService.update('api::home.home', homeId, { data: { features: featureRefs } });
  console.log('Attached features to home id=', homeId);

  await app.destroy();
  process.exit(0);
}

main().catch((err)=>{console.error(err);process.exit(1)});
