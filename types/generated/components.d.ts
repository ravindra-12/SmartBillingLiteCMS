import type { Schema, Struct } from '@strapi/strapi';

export interface SharedAeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_aeos';
  info: {
    displayName: 'Aeo';
  };
  attributes: {
    description: Schema.Attribute.Text;
    enableAEO: Schema.Attribute.Boolean;
    faqItems: Schema.Attribute.Component<'shared.faq-items', true>;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    schemaType: Schema.Attribute.Enumeration<
      [
        'WebPage',
        'Article',
        'FAQPage',
        'HowTo',
        'Product',
        'SoftwareApplication',
        'Review',
        'Organization',
        'BreadcrumbList',
      ]
    >;
    url: Schema.Attribute.String;
  };
}

export interface SharedBusinessFeatures extends Struct.ComponentSchema {
  collectionName: 'components_shared_business_features';
  info: {
    displayName: 'business_features';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedDynamicPageButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_buttons';
  info: {
    displayName: 'Dynamic Page Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedDynamicPageCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_cta_banners';
  info: {
    description: 'Call-to-action banner for a dynamic page';
    displayName: 'Dynamic Page CTA Banner';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttonLabel: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    theme: Schema.Attribute.Enumeration<['primary', 'dark', 'light']>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedDynamicPageFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_faq_sections';
  info: {
    description: 'Frequently asked questions section';
    displayName: 'Dynamic Page FAQ Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.faq-items', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedDynamicPageFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_feature_cards';
  info: {
    displayName: 'Dynamic Page Feature Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedDynamicPageFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_feature_grids';
  info: {
    displayName: 'Dynamic Page Feature Grid';
  };
  attributes: {
    badgeText: Schema.Attribute.String;
    features: Schema.Attribute.Component<
      'shared.dynamic-page-feature-card',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SharedDynamicPageHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_heroes';
  info: {
    displayName: 'Dynamic Page Hero';
  };
  attributes: {
    badgeText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    primaryButton: Schema.Attribute.Component<
      'shared.dynamic-page-button',
      false
    >;
    secondaryButton: Schema.Attribute.Component<
      'shared.dynamic-page-button',
      false
    >;
    stats: Schema.Attribute.Component<'shared.dynamic-page-hero-stat', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedDynamicPageHeroStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_hero_stats';
  info: {
    displayName: 'Dynamic Page Hero Stat';
  };
  attributes: {
    label: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedDynamicPageIntro extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_intros';
  info: {
    displayName: 'Dynamic Page Intro';
  };
  attributes: {
    badgeText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
  };
}

export interface SharedDynamicPageVideoSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_dynamic_page_video_sections';
  info: {
    description: 'Video section with heading and supporting copy';
    displayName: 'Dynamic Page Video Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    thumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoTitle: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    answer: Schema.Attribute.Blocks;
    question: Schema.Attribute.String;
  };
}

export interface SharedFaqItems extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'faqItems';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface SharedFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_cards';
  info: {
    displayName: 'feature-card';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedFeatureGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_groups';
  info: {
    displayName: 'feature-group';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.text-card', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    tone: Schema.Attribute.Enumeration<['green', 'blue', 'purple']> &
      Schema.Attribute.DefaultTo<'green'>;
  };
}

export interface SharedFeatures extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'features';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedGeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_geos';
  info: {
    displayName: 'GEO';
  };
  attributes: {
    aiSummary: Schema.Attribute.Blocks;
    canonicalUrl: Schema.Attribute.String;
    faqs: Schema.Attribute.Component<'shared.faq', true>;
    keyTakeaways: Schema.Attribute.Text;
    lastReviewed: Schema.Attribute.Date;
    references: Schema.Attribute.Component<'shared.reference', true>;
    schemaJson: Schema.Attribute.JSON;
    topics: Schema.Attribute.Component<'shared.topic', true>;
  };
}

export interface SharedHeaderApp extends Struct.ComponentSchema {
  collectionName: 'components_shared_header_apps';
  info: {
    displayName: 'Header App';
  };
  attributes: {
    create_bill_lable: Schema.Attribute.String;
  };
}

export interface SharedHomeMoreApp extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_more_apps';
  info: {
    displayName: 'Home More App';
  };
  attributes: {
    label: Schema.Attribute.Component<'shared.more', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedHomeQuickAction extends Struct.ComponentSchema {
  collectionName: 'components_shared_home_quick_actions';
  info: {
    displayName: 'Home Quick Action';
  };
  attributes: {
    label: Schema.Attribute.Component<'shared.quick-action-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedMore extends Struct.ComponentSchema {
  collectionName: 'components_shared_more_s';
  info: {
    displayName: 'More ';
  };
  attributes: {
    items: Schema.Attribute.String;
  };
}

export interface SharedPricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_shared_pricing_plans';
  info: {
    displayName: 'pricing-plan';
  };
  attributes: {
    button: Schema.Attribute.String;
    color: Schema.Attribute.Enumeration<['green', 'blue', 'orange']> &
      Schema.Attribute.DefaultTo<'blue'>;
    duration: Schema.Attribute.String;
    features: Schema.Attribute.Component<'shared.features', true>;
    icon: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    tag: Schema.Attribute.String;
  };
}

export interface SharedPrimaryButtonHomeApp extends Struct.ComponentSchema {
  collectionName: 'components_shared_primary_button_home_apps';
  info: {
    displayName: 'Primary Button Home App';
  };
  attributes: {
    create_bill_lable: Schema.Attribute.String;
  };
}

export interface SharedQuickActionItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_quick_action_items';
  info: {
    displayName: 'Quick Action Item';
  };
  attributes: {
    items: Schema.Attribute.String;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedReference extends Struct.ComponentSchema {
  collectionName: 'components_shared_references';
  info: {
    displayName: 'Reference';
  };
  attributes: {
    publishedDate: Schema.Attribute.Date;
    publisher: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'stat-item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatsApp extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats_apps';
  info: {
    displayName: 'Stats App';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SharedTextCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_cards';
  info: {
    displayName: 'text-card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTopic extends Struct.ComponentSchema {
  collectionName: 'components_shared_topics';
  info: {
    displayName: 'Topic';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.aeo': SharedAeo;
      'shared.business-features': SharedBusinessFeatures;
      'shared.dynamic-page-button': SharedDynamicPageButton;
      'shared.dynamic-page-cta-banner': SharedDynamicPageCtaBanner;
      'shared.dynamic-page-faq-section': SharedDynamicPageFaqSection;
      'shared.dynamic-page-feature-card': SharedDynamicPageFeatureCard;
      'shared.dynamic-page-feature-grid': SharedDynamicPageFeatureGrid;
      'shared.dynamic-page-hero': SharedDynamicPageHero;
      'shared.dynamic-page-hero-stat': SharedDynamicPageHeroStat;
      'shared.dynamic-page-intro': SharedDynamicPageIntro;
      'shared.dynamic-page-video-section': SharedDynamicPageVideoSection;
      'shared.faq': SharedFaq;
      'shared.faq-items': SharedFaqItems;
      'shared.feature-card': SharedFeatureCard;
      'shared.feature-group': SharedFeatureGroup;
      'shared.features': SharedFeatures;
      'shared.geo': SharedGeo;
      'shared.header-app': SharedHeaderApp;
      'shared.home-more-app': SharedHomeMoreApp;
      'shared.home-quick-action': SharedHomeQuickAction;
      'shared.media': SharedMedia;
      'shared.more': SharedMore;
      'shared.pricing-plan': SharedPricingPlan;
      'shared.primary-button-home-app': SharedPrimaryButtonHomeApp;
      'shared.quick-action-item': SharedQuickActionItem;
      'shared.quote': SharedQuote;
      'shared.reference': SharedReference;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.stat-item': SharedStatItem;
      'shared.stats-app': SharedStatsApp;
      'shared.text-card': SharedTextCard;
      'shared.topic': SharedTopic;
    }
  }
}
