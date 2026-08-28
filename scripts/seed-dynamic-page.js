'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
const { dynamicPage } = require('../data/data.json');

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });
  for (const action of ['find', 'findOne']) {
    const actionName = `api::dynamic-page.dynamic-page.${action}`;
    const permission = await strapi.query('plugin::users-permissions.permission').findOne({
      where: { action: actionName, role: publicRole.id },
    });
    if (!permission) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action: actionName, role: publicRole.id },
      });
    }
  }
  const service = strapi.documents('api::dynamic-page.dynamic-page');
  const existing = await service.findFirst({ filters: { slug: dynamicPage.slug } });

  if (existing) {
    await service.update(existing.documentId, {
      data: { ...dynamicPage, publishedAt: new Date().toISOString() },
    });
    console.log(`Updated Dynamic Page: ${dynamicPage.slug}`);
  } else {
    await service.create({
      data: { ...dynamicPage, publishedAt: new Date().toISOString() },
    });
    console.log(`Created Dynamic Page: ${dynamicPage.slug}`);
  }

  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
