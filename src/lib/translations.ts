export type Language = "he" | "en";

export interface Translations {
  nav: {
    video: string;
    blessing: string;
    story: string;
    about: string;
    activities: string;
    donate: string;
    donateNow: string;
  };
  hero: {
    heading: string;
    paragraph: string;
    blessingCta: string;
    supportCta: string;
    scrollDown: string;
  };
  video: { kicker: string; heading: string };
  blessing: {
    kicker: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    ctaButton: string;
  };
  blessingCategories: [string, string, string, string];
  banner: { kicker: string; alt: string; cta: string };
  story: { kicker: string; heading: string; paragraph1: string; paragraph2: string };
  about: { kicker: string; heading: string; paragraph1: string; paragraph2: string };
  statsLabels: [string, string, string];
  activitiesSection: { kicker: string; heading: string };
  activityTitles: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];
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
  liveCounter: { label: string };
  footer: { text: string; admin: string };
  popup: {
    successTitle: string;
    successBody: string;
    title: string;
    body: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    notePlaceholder: string;
    error: string;
    sending: string;
    submit: string;
    close: string;
  };
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
      video: "סרטון",
      blessing: "שם לברכה",
      story: "הסיפור",
      about: "מי אנחנו",
      activities: "הפעילויות",
      donate: "תרומה",
      donateNow: "תרמו עכשיו",
    },
    hero: {
      heading: "כל תרומה מדליקה אור נוסף בגליל",
      paragraph:
        'דווקא עכשיו, תחת אש – שומרים על הילדים והמשפחות בצפת! מוסדות "נחלי התורה" צפת מלווים משפחות שלמות בעת הזו, ואתם יכולים להיות חלק מזה – בתרומה, ובתפילה.',
      blessingCta: "השאירו שם לברכה",
      supportCta: "לתמיכה",
      scrollDown: "גללו למטה",
    },
    video: { kicker: "לצפייה", heading: "הכירו את הסיפור מקרוב" },
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
    banner: { kicker: "הקמפיין שלנו", alt: "באנר קמפיין", cta: "לתמיכה" },
    story: {
      kicker: "המצב בשטח",
      heading: "הילדים של צפת תחת אש 💔",
      paragraph1:
        'חרדות, מסגרות קורסות ומשפחות במצוקה כלכלית. מוסדות "נחלי התורה צפת" הם העוגן של הקהילה, אבל המשאבים שלנו להמשך הסיוע פשוט אזלו.',
      paragraph2:
        "קמפיין 'מאירים את הגליל' קורא לכם: אל תשאירו את ילדי הצפון לבד במערכה! תרומה אחת שלכם משנה חיים של משפחה שלמה.",
    },
    about: {
      kicker: "מי עומד מאחורי הקמפיין",
      heading: "מי אנחנו – קהילת ברסלב בצפת",
      paragraph1:
        'בלב העיר העתיקה של צפת פועלת קהילת חסידי ברסלב "נחלי התורה" – קהילה של כ-400 משפחות הממשיכה את דרכם של גדולי החסידות. מוסדות הקהילה כוללים בית כנסת, מקוואות, ישיבה וכולל לאברכים נשואים, וישיבה לבחורים צעירים.',
      paragraph2:
        "לאחר כשמונה שנות פעילות ומאות תלמידים, האחריות הכספית נופלת כולה על כתפי עומדי המוסדות. קמפיין 'מאירים את הגליל' נולד כדי לחלוק את הנטל ולהבטיח את המשך הפעילות התורנית והקהילתית למען ילדי ומשפחות צפת.",
    },
    statsLabels: ["משפחות בקהילה", "שנות פעילות רצופות", "מנות מחולקות מדי חודש"],
    activitiesSection: { kicker: "מה אנחנו עושים", heading: "הפעילויות שלנו" },
    activityTitles: [
      "בית כנסת",
      "כולל אברכים",
      "גן בנים",
      "תלמוד תורה",
      "ישיבה",
      "בית התבשיל",
      "בית חינוך וגן לבנות",
      "מדרשיה",
      "שיעורי ערב לקרוב רחוקים",
      "מכון להדפסת ספרים",
    ],
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
    liveCounter: { label: "נתרם עד כה · מתעדכן בלייב" },
    footer: {
      text: 'קהילת ברסלב "נחלי התורה" צפת · קמפיין מאירים את הגליל',
      admin: "ניהול",
    },
    popup: {
      successTitle: "השם שלכם נקלט בהצלחה",
      successBody: 'תפילתכם תעלה בציון הרשב"י במירון. תודה!',
      title: "השאירו שם לתפילה",
      body: 'השאירו שם ומספר טלפון, והשם שלכם יעלה בתפילה בציון הרשב"י במירון.',
      namePlaceholder: "שם פרטי (ושם האם אם ידוע)",
      phonePlaceholder: "טלפון ליצירת קשר",
      notePlaceholder: "הערות (לא חובה)",
      error: "אירעה שגיאה, נסו שוב.",
      sending: "שולח...",
      submit: "השאירו שם",
      close: "סגירה",
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
      video: "Video",
      blessing: "Blessing",
      story: "Our Story",
      about: "About Us",
      activities: "Activities",
      donate: "Donate",
      donateNow: "Donate Now",
    },
    hero: {
      heading: "Every donation lights another light in the Galilee",
      paragraph:
        "Right now, under fire, we're protecting the children and families of Tzfat! The Nachalei HaTorah Tzfat institutions are supporting entire families through this time, and you can be part of it - through donation, and through prayer.",
      blessingCta: "Leave a Name for Blessing",
      supportCta: "Support Us",
      scrollDown: "Scroll Down",
    },
    video: { kicker: "Watch", heading: "See the Story Up Close" },
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
    banner: { kicker: "Our Campaign", alt: "Campaign banner", cta: "Support Us" },
    story: {
      kicker: "The Situation on the Ground",
      heading: "The Children of Tzfat Under Fire 💔",
      paragraph1:
        'Anxiety, collapsing frameworks, and families in economic distress. The "Nachalei HaTorah Tzfat" institutions are the anchor of the community, but our resources to continue providing support have simply run out.',
      paragraph2:
        "The 'Lighting the Galilee' campaign calls out to you: don't leave the children of the North to face this alone! One donation from you changes the life of an entire family.",
    },
    about: {
      kicker: "Who's Behind the Campaign",
      heading: "Who We Are - The Breslov Community in Tzfat",
      paragraph1:
        "In the heart of the Old City of Tzfat, the Breslov Hasidic community \"Nachalei HaTorah\" operates - a community of about 400 families continuing the path of the great Hasidic masters. The community's institutions include a synagogue, mikvahs, a kollel for married men, and a yeshiva for young men.",
      paragraph2:
        "After about eight years of activity and hundreds of students, the full financial responsibility falls on the shoulders of those running the institutions. The 'Lighting the Galilee' campaign was born to share the burden and ensure the continuation of Torah and community activity for the children and families of Tzfat.",
    },
    statsLabels: ["Families in the Community", "Years of Continuous Activity", "Meals Distributed Monthly"],
    activitiesSection: { kicker: "What We Do", heading: "Our Activities" },
    activityTitles: [
      "Synagogue",
      "Kollel for Married Men",
      "Boys' Kindergarten",
      "Talmud Torah",
      "Yeshiva",
      "Soup Kitchen",
      "Girls' School & Kindergarten",
      "Midrasha (Women's Seminary)",
      "Evening Outreach Classes",
      "Book Printing Institute",
    ],
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
    liveCounter: { label: "Raised so far · Live updates" },
    footer: {
      text: "Breslov Community \"Nachalei HaTorah\" Tzfat · Lighting the Galilee Campaign",
      admin: "Admin",
    },
    popup: {
      successTitle: "Your name has been received",
      successBody: "Your prayer will be offered at Rashbi's tomb in Meron. Thank you!",
      title: "Leave a Name for Prayer",
      body: "Leave your name and phone number, and your name will be offered in prayer at Rashbi's tomb in Meron.",
      namePlaceholder: "First name (and mother's name if known)",
      phonePlaceholder: "Phone number",
      notePlaceholder: "Notes (optional)",
      error: "Something went wrong, please try again.",
      sending: "Sending...",
      submit: "Submit Name",
      close: "Close",
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
