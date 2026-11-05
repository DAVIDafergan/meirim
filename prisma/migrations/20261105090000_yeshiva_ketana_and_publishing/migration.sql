-- New department: yeshiva for younger boys (placed right after the Talmud Torah). Idempotent.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM "departments" WHERE "slug" = 'yeshiva-ketana') THEN
    UPDATE "departments" SET "order" = "order" + 1 WHERE "order" >= 4;
    INSERT INTO "departments" ("slug", "order", "name", "icon", "summary", "body", "analytic_tag", "updated_at") VALUES
    ('yeshiva-ketana', 4, 'ישיבה לבחורים צעירים', 'cap',
     'הישיבה לבחורים צעירים מלווה את בוגרי התלמוד תורה בשנות הנעורים, ומעניקה להם בית תורני חם שבו לומדים, גדלים ומתחזקים. הלימוד נעשה בסדרים מלאים, לצד בניית האישיות, הדרכה אישית ויראת שמים.',
     E'הבחורים לומדים שלושה סדרים מלאים של תורה, ביגיעה ובהתמדה, בבית מדרש חי ושוקק.\nהצוות החינוכי מכיר כל בחור באופן אישי, ומלווה אותו בכל נקודה: בלימוד, במידות ובחברה.\nהישיבה היא חלק מרצף החינוך של מוסדות נחלי התורה, מהגן ועד הכולל, וממנה ממשיכים הבחורים לישיבה הגדולה ולכולל.',
     'dept-yeshiva-ketana', CURRENT_TIMESTAMP);
  END IF;
END $$;

-- Publishing institute: now "in several languages" (only if nobody edited it in the admin panel).
UPDATE "departments"
SET "name" = 'מכון להוצאת ספרים בכמה שפות',
    "summary" = 'המכון מוציא לאור את ספריו של הגאון רבי נתן מרדכי ישראל שליט"א, ראש מוסדות נחלי התורה, בעברית, באנגלית ובשפות נוספות, כדי שתורת ברסלב תגיע לכל יהודי בשפתו.',
    "body" = E'הקטלוג כולל את סדרת "אור": אור המעשיות, אור מוהר"ן, אור השיחות, אור ההתבודדות, אור הרצון, אור החינוך, אור הנפש, אור הלב, אור הסידור, אור התהלים, אור הזמירות, אור הפרשה, אור שלום בית, אור המועדים ושו"ת אור ההלכה, וגם ספרי ילדים.\nחלק מהספרים יוצאים גם במהדורה באנגלית, בעיצוב מוקפד ובכריכות מהודרות.\nניתן להשיג את הספרים באומן, בחנות מול הציון הקדוש, ובהפצה הראשית בארץ ישראל: 053-324-9500. אפשרות למשלוח עד הבית.',
    "updated_at" = CURRENT_TIMESTAMP
WHERE "slug" = 'machon-sfarim' AND "body" IS NULL AND "name" = 'מכון להוצאת ספרים';
