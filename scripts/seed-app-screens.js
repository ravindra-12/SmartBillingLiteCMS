'use strict';

const { createStrapi, compileStrapi } = require('@strapi/strapi');
// The locale-specific `value` is written to Strapi; English/Hindi are not persisted as fields.
const label = (key, en, hi) => ({ key, translations: { en, 'hi-IN': hi } });
const labelsForLocale = (labels, locale) => labels.map(({ key, translations }) => ({ key, value: translations[locale] }));

async function ensureLocale(code, name) {
  const locales = strapi.plugin('i18n').service('locales');
  if (!await locales.findByCode(code)) await locales.create({ code, name });
}

// Numbers, money values, customer/item names, dates, referral codes and chart values are deliberately omitted.
const screens = {
  'app-home': [
    label('greeting', 'Good morning,', 'सुप्रभात,'), label('create_new_bill', 'Create New Bill', 'नया बिल बनाएं'),
    label('quick_actions', 'Quick Actions', 'त्वरित कार्य'), label('new_bill', 'New Bill', 'नया बिल'), label('bills', 'Bills', 'बिल'),
    label('payment', 'Payment', 'भुगतान'), label('customers', 'Customers', 'ग्राहक'), label('more', 'More', 'और विकल्प'),
    label('dashboard', 'Dashboard', 'डैशबोर्ड'), label('credits', 'Credits', 'उधार'), label('items', 'Items', 'आइटम'),
    label('investment', 'Investment', 'निवेश'), label('subscription', 'Subscription', 'सदस्यता'), label('membership', 'Membership', 'मेंबरशिप'),
    label('coupons', 'Coupons', 'कूपन'), label('transactions', 'Transactions', 'लेन-देन'), label('refer_earn', 'Refer & Earn', 'रेफर करें और कमाएं'), label('settings', 'Settings', 'सेटिंग्स')
  ],
  'app-dashboard': [
    label('analytics', 'Analytics', 'विश्लेषण'), label('dashboard', 'Dashboard', 'डैशबोर्ड'), label('overview', 'Overview', 'अवलोकन'),
    label('sales', 'Sales', 'बिक्री'), label('customers', 'Customers', 'ग्राहक'), label('reports', 'Reports', 'रिपोर्ट'),
    label('todays_sales', "Today's Sales", 'आज की बिक्री'), label('transactions', 'Transactions', 'लेन-देन'), label('avg_order', 'Avg Order', 'औसत ऑर्डर'),
    label('quick_stats', 'Quick Stats', 'त्वरित आँकड़े'), label('total_bills', 'Total Bills', 'कुल बिल'), label('credits', 'Credits', 'उधार'),
    label('collection', 'Collection', 'वसूली'), label('seven_day_trend', '7-Day Trend', '7-दिन का रुझान'), label('payment_methods', 'Payment Methods', 'भुगतान के तरीके'),
    label('upi', 'UPI', 'यूपीआई'), label('cash', 'Cash', 'नकद'), label('credit', 'Credit', 'उधार'), label('refresh', 'Refresh', 'रीफ़्रेश')
  ],
  'app-credits': [
    label('outstanding', 'Outstanding', 'बकाया'), label('open', 'Open', 'खुला'), label('total_credited', 'Total Credited', 'कुल उधार'),
    label('records', 'Records', 'रिकॉर्ड'), label('new_credit', 'New Credit', 'नया उधार'), label('credit_list', 'Credit List', 'उधार सूची'),
    label('no_credits_found', 'No credits found', 'कोई उधार नहीं मिला'), label('create_credit_hint', 'Tap "New Credit" to create one', 'बनाने के लिए "नया उधार" दबाएं')
  ],
  'app-items': [
    label('manage', 'Manage', 'प्रबंधित करें'), label('items', 'Items', 'आइटम'), label('total', 'Total', 'कुल'), label('showing', 'Showing', 'दिखाए जा रहे'),
    label('avg_price', 'Avg. Price', 'औसत कीमत'), label('add_new_item', 'Add New Item', 'नया आइटम जोड़ें'), label('item_count', 'ITEM', 'आइटम'), label('add_new', 'Add New', 'नया जोड़ें'), label('edit', 'Edit', 'संपादित करें'), label('delete', 'Delete', 'हटाएं')
  ],
  'app-investment': [
    label('total_investment', 'Total Investment', 'कुल निवेश'), label('entries', 'Entries', 'प्रविष्टियाँ'), label('categories', 'Categories', 'श्रेणियाँ'),
    label('avg_entry', 'Avg. Entry', 'औसत प्रविष्टि'), label('add_investment', 'Add Investment', 'निवेश जोड़ें'), label('investments', 'Investments', 'निवेश'),
    label('no_investments_yet', 'No investments yet', 'अभी कोई निवेश नहीं है'), label('record_investment_hint', 'Tap "Add Investment" to record one', 'दर्ज करने के लिए "निवेश जोड़ें" दबाएं')
  ],
  'app-subscription': [
    label('current_plan', 'Current Plan', 'वर्तमान प्लान'), label('active', 'Active', 'सक्रिय'), label('status', 'Status', 'स्थिति'),
    label('expires', 'Expires', 'समाप्ति'), label('plans', 'Plans', 'प्लान'), label('trial_active', 'Trial Active', 'ट्रायल सक्रिय')
  ],
  'app-membership': [
    label('membership', 'Membership', 'मेंबरशिप'), label('plans', 'Plans', 'प्लान'), label('active', 'Active', 'सक्रिय'), label('inactive', 'Inactive', 'निष्क्रिय'),
    label('members', 'Members', 'सदस्य'), label('expired', 'Expired', 'समाप्त'), label('add_new_plan', 'Add New Plan', 'नया प्लान जोड़ें'),
    label('all_plans', 'All Plans', 'सभी प्लान'), label('no_membership_plans_yet', 'No membership plans yet', 'अभी कोई मेंबरशिप प्लान नहीं है'), label('get_started_hint', 'Tap "Add New Plan" to get started', 'शुरू करने के लिए "नया प्लान जोड़ें" दबाएं')
  ],
  'app-coupons': [
    label('promotions', 'Promotions', 'प्रमोशन'), label('coupons', 'Coupons', 'कूपन'), label('active', 'Active', 'सक्रिय'), label('total', 'Total', 'कुल'),
    label('total_used', 'Total Used', 'कुल उपयोग'), label('create_coupon', 'Create Coupon', 'कूपन बनाएं'), label('all_coupons', 'All Coupons', 'सभी कूपन'),
    label('no_coupons_yet', 'No coupons yet', 'अभी कोई कूपन नहीं है'), label('add_coupon_hint', 'Tap "Create Coupon" to add one', 'जोड़ने के लिए "कूपन बनाएं" दबाएं')
  ],
  'app-transactions': [
    label('overview', 'Overview', 'अवलोकन'), label('transactions', 'Transactions', 'लेन-देन'), label('total', 'Total', 'कुल'), label('count', 'Count', 'संख्या'),
    label('completed', 'Completed', 'पूर्ण'), label('today', 'Today', 'आज'), label('no_transactions_found', 'No transactions found', 'कोई लेन-देन नहीं मिला'), label('different_time_range_hint', 'Try a different time range', 'अलग समय सीमा आज़माएं')
  ],
  'app-refer-earn': [
    label('refer_earn', 'Refer & Earn', 'रेफर करें और कमाएं'), label('your_referral_code', 'Your Referral Code', 'आपका रेफरल कोड'),
    label('referral_reward', 'Earn ₹150 for every vendor who signs up and goes premium', 'साइन अप करके प्रीमियम बनने वाले हर विक्रेता पर ₹150 कमाएं'),
    label('copy', 'Copy', 'कॉपी करें'), label('share', 'Share', 'साझा करें'), label('overview', 'Overview', 'अवलोकन'), label('referrals', 'Referrals', 'रेफरल'), label('earnings', 'Earnings', 'कमाई'),
    label('total_referrals', 'Total Referrals', 'कुल रेफरल'), label('premium_purchases', 'Premium Purchases', 'प्रीमियम खरीदारी'), label('pending', 'Pending', 'लंबित'), label('approved', 'Approved', 'स्वीकृत'), label('paid', 'Paid', 'भुगतान किया गया'), label('total_earnings', 'Total Earnings', 'कुल कमाई')
  ],
  'app-sign-in': [
    label('app_name', 'SmartBilling', 'स्मार्टबिलिंग'), label('headline', 'Billing made simple & fast', 'बिलिंग आसान और तेज़'),
    label('tagline', 'Built for Indian businesses — GST, payments & receipts in one place', 'भारतीय व्यवसायों के लिए — जीएसटी, भुगतान और रसीदें एक ही जगह'),
    label('sign_in', 'Sign in', 'साइन इन करें'), label('mobile_hint', 'Enter your mobile number to continue', 'जारी रखने के लिए अपना मोबाइल नंबर दर्ज करें'),
    label('send_otp', 'Send OTP', 'ओटीपी भेजें'), label('otp_hint', "We'll send a 6-digit code to verify your number", 'आपके नंबर की पुष्टि के लिए 6 अंकों का कोड भेजा जाएगा'),
    label('instant_billing', 'Instant Billing', 'तुरंत बिलिंग'), label('reports', 'Reports', 'रिपोर्ट'), label('secure', 'Secure', 'सुरक्षित'),
    label('brand_promoter', 'Want to promote us? Become a Brand Promoter', 'हमारा प्रचार करना चाहते हैं? ब्रांड प्रमोटर बनें'),
    label('terms_privacy', 'By continuing you agree to our Terms & Privacy Policy', 'जारी रखकर आप हमारी शर्तों और गोपनीयता नीति से सहमत हैं')
  ]
};

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  await ensureLocale('en', 'English');
  await ensureLocale('hi-IN', 'Hindi (India)');
  const publicRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  for (const [name, labels] of Object.entries(screens)) {
    const uid = `api::${name}.${name}`;
    for (const action of ['find', 'findOne']) {
      const permission = await strapi.query('plugin::users-permissions.permission').findOne({ where: { action: `${uid}.${action}`, role: publicRole.id } });
      if (!permission) await strapi.query('plugin::users-permissions.permission').create({ data: { action: `${uid}.${action}`, role: publicRole.id } });
    }
    const documents = strapi.documents(uid);
    const englishLabels = labelsForLocale(labels, 'en');
    const hindiLabels = labelsForLocale(labels, 'hi-IN');
    let english = await documents.findFirst({ status: 'published', locale: 'en' });

    if (english) {
      english = await documents.update({
        documentId: english.documentId,
        locale: 'en',
        data: { labels: englishLabels },
        status: 'published'
      });
    } else {
      english = await documents.create({ data: { labels: englishLabels }, locale: 'en', status: 'published' });
    }

    await documents.update({
      documentId: english.documentId,
      locale: 'hi-IN',
      data: { labels: hindiLabels },
      status: 'published'
    });
  }
  console.log(`Seeded ${Object.keys(screens).length} localized mobile-app screens (en and hi-IN).`);
  await app.destroy();
  process.exit(0);
}

main().catch((error) => { console.error(error); process.exit(1); });
