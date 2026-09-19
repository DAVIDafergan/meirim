export type Language = "he" | "en";

export interface Translations {
  nav: {
    about: string;
    activities: string;
    gallery: string;
    donate: string;
    donateNow: string;
    menu: string;
  };
  hero: {
    heading: string;
    paragraph: string;
    blessingCta: string;
    scrollDown: string;
  };
  blessing: {
    kicker: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    ctaButton: string;
  };
  blessingCategories: [string, string, string, string];
  kaparot: { kicker: string; heading: string; body: string; cta: string };
  story: { kicker: string; heading: string; paragraph1: string; paragraph2: string };
  about: { kicker: string; heading: string; paragraph1: string; paragraph2: string };
  statsLabels: [string, string, string, string];
  activitiesSection: { kicker: string; heading: string };
  departmentsGrid: { details: string; support: string };
  departmentsPage: { kicker: string; heading: string; intro: string };
  departmentDetail: { back: string; kicker: string; support: string };
  donateSection: {
    kicker: string;
    heading: string;
    donateNow: string;
    otherAmount: string;
    monthly: string;
  };
  donationTiers: [
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string },
    { title: string; desc: string }
  ];
  recentDonations: { kicker: string; heading: string; anonymous: string };
  gallery: { kicker: string; heading: string };
  social: { kicker: string; heading: string; cta: string };
  liveCounter: { label: string };
  footer: { text: string; admin: string };
  blessingModal: {
    title: string;
    body: string;
    firstName: string;
    motherName: string;
    phone: string;
    requestFor: string;
    notePlaceholder: string;
    submit: string;
    close: string;
  };
  thanks: { heading: string; body: string; back: string };
  languageToggle: string;
}

export const translations: Record<Language, Translations> = {
  he: {
    nav: {
      about: "מי אנחנו",
      activities: "מחלקות",
      gallery: "גלריה",
      donate: "תרומה",
      donateNow: "תרמו עכשיו",
      menu: "תפריט",
    },
    hero: {
      heading: 'מוסדות ברסלב "נחלי התורה" — תורה, קהילה וחסד בלב צפת העתיקה',
      paragraph:
        'קהילת ברסלב "נחלי התורה" מלווה כ-250 משפחות בעיר העתיקה בצפת, מגיל הרך ועד בית המדרש — בחינוך, בתמיכה קהילתית ובחסד יומיומי. הצטרפו אלינו בתרומה, בתפילה ובשותפות בדרך.',
      blessingCta: "השאירו שם לברכה",
      scrollDown: "גללו למטה",
    },
    blessing: {
      kicker: 'מתנה רוחנית מהגאון הרב נתן מרדכי ישראל שליט"א',
      heading: 'השאירו שם לברכה בציון הרשב"י',
      paragraph1:
        'מידי חודש עולה הגאון הרב נתן מרדכי ישראל שליט"א, ראש מוסדות נחלי התורה, להשתטח על ציונו הקדוש של התנא האלוקי רבי שמעון בר יוחאי במירון. שם, בהתרגשות ובדמעות, הוא נושא עמו את שמותיכם ובקשותיכם, ומתפלל עליכם אישית בציון הקדוש.',
      paragraph2:
        "רבי שמעון בר יוחאי, מחבר ספר הזוהר הקדוש, ציונו במירון נחשב מדורי דורות לאחד המקומות המקודשים ביותר בעם ישראל לתפילה ולישועה. תפילה הנישאת במקום הקדוש הזה, מתוך אמונה ותמימות, מלווה בסגולה מיוחדת שנמסרה מדור לדור.",
      paragraph3:
        "השאירו את פרטיכם, ותפילתכם תעלה יחד עם תפילתו במקום הקדוש ביותר – לישועה, לזיווג, לפרנסה ולרפואה.",
      ctaButton: "השאירו שם לברכה עכשיו",
    },
    blessingCategories: ["ישועה", "זיווג הגון", "פרנסה טובה", "רפואה שלמה"],
    kaparot: {
      kicker: "לקראת יום הכיפורים",
      heading: "פדיון כפרות במוסדות נחלי התורה",
      body: 'מנהג ישראל מדורי דורות לתת את פדיון הכפרות לצדקה בערב יום הכיפורים. תרומתכם מסייעת להחזקת התורה והחסד בעיר העתיקה בצפת — ותפילת אברכי הכולל ובני הקהילה תעלה עבורכם ועבור כל בני ביתכם, לשנה טובה ומבורכת ולחתימה טובה.',
      cta: "לפדיון כפרות",
    },
    story: {
      kicker: "מקום של קדושה",
      heading: "בלב העיר העתיקה בצפת",
      paragraph1:
        'רבעי העיר העתיקה בצפת שזורים מאות שנות מסורת קבלית וחסידית, ובתוכם ממשיכה קהילת ברסלב "נחלי התורה" לשמור על אורח חיים של תורה, תפילה ואחווה. בין הסמטאות העתיקות והחצרות הישנות, קמים מדי יום קולות לימוד ותפילה שאינם פוסקים.',
      paragraph2:
        "מתוך מחויבות עמוקה למקום ולמורשתו, מוסדות נחלי התורה מעניקים מסגרת חמה ויציבה לילדי הקהילה, לבני הנוער, לאברכים הצעירים ולמשפחות כולן — ומזמינים כל מי שחש קרבה למקום הקדוש הזה להיות שותף בהמשך הדרך.",
    },
    about: {
      kicker: "הכירו את המוסדות",
      heading: 'מי אנחנו — מוסדות ברסלב "נחלי התורה"',
      paragraph1:
        'מוסדות ברסלב "נחלי התורה" (ע"ר 580785392) פועלים כשמונה שנים בלב העיר העתיקה בצפת, ומלווים קהילה של כ-250 משפחות ההולכות בדרכם של גדולי חסידות ברסלב. בראש המוסדות עומד הגאון רבי נתן מרדכי ישראל שליט"א, המקדיש עצמו להנהגה רוחנית וקהילתית יום-יומית.',
      paragraph2:
        'תחת קורת גג אחת פועלים גני ילדים, תלמוד תורה, בית חינוך ומדרשיה לבנות, כולל אברכים, בית תבשיל ומכון להוצאת ספרים — מענה מקיף לצרכים הרוחניים, החינוכיים והחומריים של הקהילה. מדי חודש עולה הרב לציון הרשב"י במירון, ונושא עמו את בקשות ותפילות התומכים במוסדות.',
    },
    statsLabels: ["משפחות בקהילה", "שנות פעילות", "מחלקות פעילות", "לב אחד גדול"],
    activitiesSection: { kicker: "מה אנחנו עושים", heading: "המחלקות שלנו" },
    departmentsGrid: { details: "לפרטים", support: "תמכו בפעילות זו" },
    departmentsPage: {
      kicker: "מה אנחנו עושים",
      heading: "המחלקות שלנו",
      intro:
        "שמונה מחלקות הפועלות יחד בלב העיר העתיקה בצפת, ומלוות את בני הקהילה מגיל הרך ולאורך כל שלבי החיים.",
    },
    departmentDetail: {
      back: "← כל המחלקות",
      kicker: "המחלקות שלנו",
      support: "תמכו בפעילות זו",
    },
    donateSection: {
      kicker: "הצטרפו למגן",
      heading: "בחרו כיצד לתרום",
      donateNow: "תרמו עכשיו",
      otherAmount: "תרומה בסכום אחר",
      monthly: "הוראת קבע חודשית",
    },
    donationTiers: [
      { title: "מחזירים את החיוך", desc: "מימון טיפול רגשי לילד" },
      { title: "עוגן למשפחה", desc: "סל תמיכה בסיסי" },
      { title: "שומרים על הנוער", desc: "תמיכה במסגרות מוגנות" },
      { title: "חזית של חסד", desc: "החזקת המוסדות" },
    ],
    recentDonations: {
      kicker: "ביחד מאירים",
      heading: "תרומות אחרונות",
      anonymous: "תורם/ת אנונימי/ת",
    },
    gallery: {
      kicker: "תיעודים",
      heading: "רגעים מהפעילות",
    },
    social: {
      kicker: "עקבו אחרינו",
      heading: "שיעורים ועדכונים מהרב",
      cta: "עקבו לשיעורים ועדכונים",
    },
    liveCounter: { label: "נתרם עד כה · מתעדכן בלייב" },
    footer: {
      text: 'מוסדות ברסלב "נחלי התורה" צפת · ע"ר 580785392',
      admin: "ניהול",
    },
    blessingModal: {
      title: "השאירו שם לברכה",
      body: 'מלאו את הפרטים, וההודעה תישלח בוואטסאפ ישירות לרב נתן מרדכי ישראל שליט"א לפני עלייתו לציון הרשב"י במירון.',
      firstName: "שם פרטי",
      motherName: "שם האם",
      phone: "טלפון ליצירת קשר",
      requestFor: "הבקשה עבור:",
      notePlaceholder: "הערה נוספת (לא חובה)",
      submit: "שליחה לרב בוואטסאפ",
      close: "סגירה",
    },
    thanks: {
      heading: "תודה רבה על תרומתכם!",
      body: "תרומתכם התקבלה בהצלחה ותעשה שינוי אמיתי עבור ילדי ומשפחות צפת. שכרכם רב משמים.",
      back: "חזרה לאתר",
    },
    languageToggle: "EN",
  },
  en: {
    nav: {
      about: "About Us",
      activities: "Departments",
      gallery: "Gallery",
      donate: "Donate",
      donateNow: "Donate Now",
      menu: "Menu",
    },
    hero: {
      heading: 'The Nachalei HaTorah Breslov Institutions — Torah, Community & Kindness in the Heart of Old Tzfat',
      paragraph:
        "The Nachalei HaTorah Breslov community accompanies about 250 families in the Old City of Tzfat, from early childhood through the study hall - through education, community support, and everyday kindness. Join us with a donation, a prayer, and a partnership in the journey.",
      blessingCta: "Leave a Name for Blessing",
      scrollDown: "Scroll Down",
    },
    blessing: {
      kicker: "A Spiritual Gift from HaRav Natan Mordechai Yisrael Shlita",
      heading: "Leave a Name for Blessing at Rashbi's Tomb",
      paragraph1:
        "Every month, HaRav Natan Mordechai Yisrael Shlita, head of the Nachalei HaTorah institutions, travels to prostrate himself at the holy tomb of the divine Tanna Rabbi Shimon Bar Yochai in Meron. There, with emotion and tears, he carries your names and requests with him, and prays for you personally at the holy site.",
      paragraph2:
        "Rabbi Shimon Bar Yochai, author of the holy Zohar, his tomb in Meron has been regarded for generations as one of the holiest places for the Jewish people to pray for salvation. A prayer offered at this holy place, with faith and sincerity, carries a special segula passed down through the generations.",
      paragraph3:
        "Leave your details, and your prayer will rise together with his at this holiest of places - for salvation, for a match, for livelihood, and for healing.",
      ctaButton: "Leave a Name for Blessing Now",
    },
    blessingCategories: ["Salvation", "A Good Match", "Good Livelihood", "Complete Healing"],
    kaparot: {
      kicker: "Ahead of Yom Kippur",
      heading: "Pidyon Kaparot at Nachalei HaTorah",
      body: "It is a long-standing Jewish custom to give the kaparot redemption to tzedakah on the eve of Yom Kippur. Your gift sustains Torah study and acts of kindness in the Old City of Tzfat — and the prayers of our kollel scholars and our community will rise on behalf of you and your entire household, for a good and blessed year.",
      cta: "Give Pidyon Kaparot",
    },
    story: {
      kicker: "A Place of Holiness",
      heading: "In the Heart of Old Tzfat",
      paragraph1:
        'The alleys of Tzfat\'s Old City are woven through with centuries of Kabbalistic and Hasidic tradition, and within them the Nachalei HaTorah Breslov community continues to keep a way of life built on Torah, prayer, and fellowship. Among the ancient lanes and old courtyards, voices of study and prayer rise without pause, day after day.',
      paragraph2:
        "Out of a deep commitment to this place and its legacy, the Nachalei HaTorah institutions provide a warm, stable framework for the community's children, its youth, its young married scholars, and its families - and invite anyone who feels drawn to this holy place to become a partner along the way.",
    },
    about: {
      kicker: "Meet the Institutions",
      heading: 'Who We Are — The Nachalei HaTorah Breslov Institutions',
      paragraph1:
        "The Nachalei HaTorah Breslov Institutions (Israeli nonprofit registration 580785392) have operated for about eight years in the heart of Tzfat's Old City, accompanying a community of about 250 families following in the path of the great Breslov masters. The institutions are headed by HaRav Natan Mordechai Yisrael Shlita, who devotes himself to the community's day-to-day spiritual and communal leadership.",
      paragraph2:
        "Under one roof operate kindergartens, a Talmud Torah, a girls' school and seminary, a kollel for young married men, a soup kitchen, and a publishing institute - a comprehensive response to the community's spiritual, educational, and material needs. Each month the Rav travels to Rabbi Shimon Bar Yochai's tomb in Meron, carrying with him the requests and prayers of the institutions' supporters.",
    },
    statsLabels: ["Families in the Community", "Years of Activity", "Active Departments", "One Big Heart"],
    activitiesSection: { kicker: "What We Do", heading: "Our Departments" },
    departmentsGrid: { details: "Learn More", support: "Support This Department" },
    departmentsPage: {
      kicker: "What We Do",
      heading: "Our Departments",
      intro:
        "Eight departments working together in the heart of Tzfat's Old City, accompanying the community from early childhood through every stage of life.",
    },
    departmentDetail: {
      back: "← All Departments",
      kicker: "Our Departments",
      support: "Support This Department",
    },
    donateSection: {
      kicker: "Join the Shield",
      heading: "Choose How to Donate",
      donateNow: "Donate Now",
      otherAmount: "Donate a Different Amount",
      monthly: "Monthly Standing Order",
    },
    donationTiers: [
      { title: "Bringing Back the Smile", desc: "Funding emotional therapy for a child" },
      { title: "An Anchor for the Family", desc: "A basic support package" },
      { title: "Protecting the Youth", desc: "Supporting safe frameworks" },
      { title: "A Front of Kindness", desc: "Sustaining the institutions" },
    ],
    recentDonations: {
      kicker: "Together We Light Up",
      heading: "Recent Donations",
      anonymous: "Anonymous Donor",
    },
    gallery: {
      kicker: "Documentation",
      heading: "Moments from Our Activities",
    },
    social: {
      kicker: "Follow Us",
      heading: "Lessons & Updates from the Rabbi",
      cta: "Follow for lessons & updates",
    },
    liveCounter: { label: "Raised so far · Live updates" },
    footer: {
      text: "Nachalei HaTorah Breslov Institutions, Tzfat · Nonprofit reg. 580785392",
      admin: "Admin",
    },
    blessingModal: {
      title: "Leave a Name for Blessing",
      body: "Fill in your details, and the message will be sent via WhatsApp directly to Rav Natan Mordechai Yisrael Shlita before his visit to Rashbi's tomb in Meron.",
      firstName: "First name",
      motherName: "Mother's name",
      phone: "Phone number",
      requestFor: "Request for:",
      notePlaceholder: "Additional note (optional)",
      submit: "Send to the Rabbi via WhatsApp",
      close: "Close",
    },
    thanks: {
      heading: "Thank You So Much for Your Donation!",
      body: "Your donation was received successfully and will make a real difference for the children and families of Tzfat. May you be blessed abundantly from Heaven.",
      back: "Back to the Site",
    },
    languageToggle: "עברית",
  },
};
