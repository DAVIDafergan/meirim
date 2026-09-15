-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "body" TEXT,
    "analytic_tag" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department_images" (
    "id" SERIAL NOT NULL,
    "department_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "department_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_slug_key" ON "departments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "departments_analytic_tag_key" ON "departments"("analytic_tag");

-- AddForeignKey
ALTER TABLE "department_images" ADD CONSTRAINT "department_images_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed: the 8 departments of the Nachalei HaTorah institutions
INSERT INTO "departments" ("slug", "order", "name", "icon", "summary", "analytic_tag", "updated_at") VALUES
('gan-banim', 1, 'גני ילדים – גן בנים', 'block',
 'גן הבנים של מוסדות נחלי התורה מעניק לילדי הקהילה סביבה חינוכית חמה ומטפחת, שיסודה באהבת התורה ובמידות טובות, מגיל הרך. הגננות והצוות מלווים כל ילד באופן אישי, ובונים יחד את הבסיס הרוחני והחברתי שילווה אותו לאורך כל שנות לימודיו. הגן פועל בלב העיר העתיקה בצפת, כחלק בלתי נפרד מרקמת החיים הקהילתית.',
 'dept-gan-banim', CURRENT_TIMESTAMP),
('gan-banot', 2, 'גני ילדים – גן בנות', 'flower',
 'גן הבנות מהווה בית חם ומכיל לבנות הקהילה הצעירות, ומשלב לימוד, יצירה ומשחק בסביבה השומרת על ערכי הצניעות והמסורת. הצוות החינוכי מלווה כל ילדה בגילה, ומטפח בה ביטחון עצמי, אהבת הזולת ויראת שמים. הגן פועל לצד גן הבנים, ומהווה חלק מרצף החינוך שמעניקה הקהילה לילדיה מגיל הרך.',
 'dept-gan-banot', CURRENT_TIMESTAMP),
('talmud-torah', 3, 'תלמוד תורה', 'scroll',
 'תלמוד התורה מלווה את בני הקהילה בגילאי בית הספר היסודי, ומקנה להם לימוד תורה לעומקו לצד חינוך לדרך ארץ ולערכי החסידות. המסגרת שמה דגש על יחס אישי לכל תלמיד, מתוך הבנה שכל ילד וילד הוא עולם ומלואו. בוגרי תלמוד התורה ממשיכים בדרך כלל למסגרות הישיבתיות של הקהילה.',
 'dept-talmud-torah', CURRENT_TIMESTAMP),
('kollel', 4, 'כולל אברכים', 'cap',
 'כולל האברכים מאפשר לאברכים נשואים להמשיך ולהעמיק בלימוד התורה לאחר הנישואין, תוך קבלת תמיכה ומלגה חודשית שמסייעת להם ולמשפחותיהם. הכולל הוא לב ליבה הרוחני של הקהילה, וממנו יוצאת השפעה תורנית לכלל בני המקום. שמירה על רצף הלימוד באברכים הצעירים היא אחת מאבני היסוד של המשך פעילות המוסדות.',
 'dept-kollel', CURRENT_TIMESTAMP),
('beit-chinuch-banot', 5, 'בית חינוך לבנות', 'chalkboard',
 'בית החינוך לבנות מלווה את בנות הקהילה בגילאי בית הספר, ומעניק להן חינוך תורני מקיף לצד לימודי ליבה, בסביבה תומכת ומכבדת. הצוות החינוכי שם דגש על טיפוח האישיות והכישרונות הייחודיים של כל תלמידה. בית החינוך מהווה המשך טבעי לגן הבנות, וגשר לקראת ההמשך במדרשיה.',
 'dept-beit-chinuch-banot', CURRENT_TIMESTAMP),
('midrasha', 6, 'מדרשיה לנערות', 'book',
 'המדרשיה מלווה נערות ובוגרות צעירות בתהליך התבססות והעמקה בעולם התורה והיהדות, ובכלל זה גם נשים החוזרות בתשובה המחפשות מסגרת מכבדת ותומכת. הלימוד במדרשיה משלב עיון, ערכים ומעשה, ומכשיר את הבוגרות להמשך חייהן כנשות חיל בקהילותיהן. המדרשיה היא חלק מהמענה הרחב שמעניקה הקהילה לחוזרים ולחוזרות בתשובה.',
 'dept-midrasha', CURRENT_TIMESTAMP),
('beit-hatavshil', 7, 'בית התבשיל', 'bowl',
 'בית התבשיל דואג לארוחות חמות ומזון בסיסי למשפחות הקהילה הנזקקות לכך, ומהווה רשת ביטחון יומיומית עבור בתים רבים. הפעילות מתבצעת מתוך כבוד לנתרם ובשקט, כערך יסוד בדרכה של הקהילה. בית התבשיל פועל באופן שוטף לאורך כל ימות השנה, ובמיוחד סביב החגים.',
 'dept-beit-hatavshil', CURRENT_TIMESTAMP),
('machon-sfarim', 8, 'מכון להוצאת ספרים', 'printer',
 'מכון הוצאת הספרים עוסק בהכנה, בעריכה ובהדפסה של ספרי קודש וספרי לימוד המשמשים את תלמידי ואברכי המוסדות, וכן את הציבור הרחב. באמצעות המכון זוכות תורתו ומשנתו של הגאון רבי נתן מרדכי ישראל שליט"א להיכתב ולהתפרסם, לצד ספרי יסוד נוספים. המכון תורם להנצחת המסורת התורנית של הקהילה לדורות הבאים.',
 'dept-machon-sfarim', CURRENT_TIMESTAMP);
