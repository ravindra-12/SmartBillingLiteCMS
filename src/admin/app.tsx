import type { StrapiApp } from '@strapi/strapi/admin';
import type { ComponentType } from 'react';

export default {
  config: {
    locales: [],
  },
  register(app: StrapiApp) {
    app.customFields.register({
      name: 'quill-rich-text',
      type: 'text',
      intlLabel: {
        id: 'global.quill-rich-text.label',
        defaultMessage: 'Rich text editor',
      },
      intlDescription: {
        id: 'global.quill-rich-text.description',
        defaultMessage: 'Write formatted content, including editable tables.',
      },
      components: {
        Input: async () => import('./components/QuillRichTextInput').then((module) => ({
          default: module.default as unknown as ComponentType,
        })),
      },
    });
  },
};
