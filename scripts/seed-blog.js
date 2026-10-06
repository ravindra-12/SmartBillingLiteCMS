'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();

  const authorData = [
    {
      name: 'Aisha Patel',
      bio: '<p>Product strategist focused on small business growth and digital operations.</p>',
      avatar: null,
    },
    {
      name: 'Rohan Mehta',
      bio: '<p>Operations specialist helping retailers simplify billing and customer retention.</p>',
      avatar: null,
    },
  ];

  const authorDocs = await Promise.all(
    authorData.map(async (author) => {
      const existing = await strapi.documents('api::author.author').findMany({
        filters: { name: author.name },
      });

      if (existing.length) {
        return existing[0];
      }

      return strapi.documents('api::author.author').create({
        data: {
          ...author,
          publishedAt: new Date().toISOString(),
        },
      });
    })
  );

  const categoryData = [
    { name: 'Billing Tips', description: 'Practical billing and invoicing advice for small businesses.' },
    { name: 'Operations', description: 'Daily operations, workflows, and productivity improvements.' },
    { name: 'Growth', description: 'Marketing and customer growth strategies for modern stores.' },
  ];

  const categoryDocs = await Promise.all(
    categoryData.map(async (category) => {
      const existing = await strapi.documents('api::category.category').findMany({
        filters: { name: category.name },
      });

      if (existing.length) {
        return existing[0];
      }

      return strapi.documents('api::category.category').create({
        data: {
          ...category,
          publishedAt: new Date().toISOString(),
        },
      });
    })
  );

  const tagData = [
    { name: 'POS' },
    { name: 'Small Business' },
    { name: 'Payments' },
    { name: 'Retail' },
  ];

  const tagDocs = await Promise.all(
    tagData.map(async (tag) => {
      const existing = await strapi.documents('api::tag.tag').findMany({
        filters: { name: tag.name },
      });

      if (existing.length) {
        return existing[0];
      }

      return strapi.documents('api::tag.tag').create({
        data: {
          ...tag,
          publishedAt: new Date().toISOString(),
        },
      });
    })
  );

  const postData = [
    {
      title: '5 ways a modern POS helps small stores grow faster',
      excerpt:
        'Discover how an efficient billing system can reduce queue time, improve customer trust, and help local stores grow without added complexity.',
      content:
        '<h2>Why billing speed matters</h2><p>Retail owners often lose time and revenue when waiting for invoices, printing receipts, and tracking customer visits manually.</p><p>A modern POS keeps these tasks in one place and helps teams move faster than traditional paper systems.</p><h3>Key benefits</h3><ul><li>Faster checkout experience</li><li>Better customer trust with digitized receipts</li><li>Clear insights into sales and payment behavior</li></ul>',
      author: authorDocs[0].documentId,
      category: categoryDocs[0].documentId,
      tags: tagDocs.slice(0, 3).map((tag) => tag.documentId),
      publishedAt: '2026-10-01T08:30:00.000Z',
      featured: true,
      readTime: 5,
      seoTitle: 'Modern POS tips for growing small retail businesses',
      seoDescription:
        'Learn how a modern POS system helps small stores simplify billing, improve customer service, and accelerate growth.',
      seoKeywords: 'POS, billing, retail, small business',
    },
    {
      title: 'How payment insights improve daily store operations',
      excerpt:
        'Payment data tells you more than how much you sold — it helps uncover bottlenecks, customer habits, and business opportunities.',
      content:
        '<h2>Turn payments into operational insights</h2><p>Daily transaction reports can show which products sell faster, when customers are most active, and how often your store needs restocking.</p><p>When the right numbers are visible in one dashboard, daily decisions become much easier.</p>',
      author: authorDocs[1].documentId,
      category: categoryDocs[1].documentId,
      tags: tagDocs.slice(1, 4).map((tag) => tag.documentId),
      publishedAt: '2026-10-04T09:45:00.000Z',
      featured: false,
      readTime: 4,
      seoTitle: 'Use payment insights to improve store operations',
      seoDescription:
        'A smarter billing workflow turns payment data into actionable insights for daily operations, customer service, and sales optimization.',
      seoKeywords: 'payments, business insights, store operations',
    },
  ];

  const blogPosts = await Promise.all(
    postData.map(async (post) => {
      const existing = await strapi.documents('api::blog-post.blog-post').findMany({
        filters: { title: post.title },
      });

      if (existing.length) {
        return existing[0];
      }

      return strapi.documents('api::blog-post.blog-post').create({
        data: {
          ...post,
          author: { connect: [post.author] },
          category: { connect: [post.category] },
          tags: { connect: post.tags },
        },
      });
    })
  );

  const featuredPost = blogPosts.find((post) => post.featured) || blogPosts[0];

  const existingSettings = await strapi.documents('api::blog-setting.blog-setting').findMany();

  const settingsData = {
    heroTitle: 'Insights for smarter retail operations',
    heroDescription:
      'Explore practical tips on billing, payments, customer experience, and growth for modern businesses.',
    ctaText: 'Book a demo',
    ctaLink: 'https://smartbillinglite.in',
    featuredPost: { connect: [featuredPost.documentId] },
  };

  if (existingSettings.length) {
    await strapi.documents('api::blog-setting.blog-setting').update({
      documentId: existingSettings[0].documentId,
      data: settingsData,
    });
  } else {
    await strapi.documents('api::blog-setting.blog-setting').create({
      data: settingsData,
    });
  }

  console.log('Blog seed data created successfully.');
  await app.destroy();
  process.exit(0);
}

main().catch((error) => {
  console.error('Blog seed failed:', error);
  process.exit(1);
});
