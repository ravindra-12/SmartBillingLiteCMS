/**
 * dynamic-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::dynamic-page.dynamic-page' as any, () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        ...(ctx.query.populate as object || {}),
        blocks: { populate: '*' },
        seo: { populate: '*' },
        geo: { populate: '*' },
        aeo: { populate: '*' },
      },
    };

    return await super.find(ctx);
  },

  async findOne(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        ...(ctx.query.populate as object || {}),
        blocks: { populate: '*' },
        seo: { populate: '*' },
        geo: { populate: '*' },
        aeo: { populate: '*' },
      },
    };

    return await super.findOne(ctx);
  },
}));
