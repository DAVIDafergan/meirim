// Default photos, taken from the institutions' own video. They show wherever no photo was uploaded from the
// admin: as soon as a department gets uploaded images, or the gallery gets its first item, those take over.

export type StaticImage = { src: string; caption: string };

/** /api/media/<file> for uploaded files; a path that starts with "/" is a bundled static file. */
export const mediaUrl = (filename: string) =>
  filename.startsWith("/") ? filename : `/api/media/${encodeURIComponent(filename)}`;

const img = (name: string, caption: string): StaticImage => ({ src: `/media/${name}.jpg`, caption });

export const GALLERY_MEDIA: StaticImage[] = [
  img("tt-building", "בניין התלמוד תורה"),
  img("yeshiva-hall", "בית המדרש של הישיבה"),
  img("campus-aerial", "מתחם המוסדות מהאוויר"),
  img("yeshiva-beit-midrash", "שיעור בבית המדרש"),
  img("kollel-chavrusa3", "לימוד בחברותא בכולל"),
  img("tt-yard", "הפסקה בחצר התלמוד תורה"),
  img("gan-wall", "בגן הילדים"),
  img("kollel-chavrusa2", "אברכי הכולל בלימוד"),
  img("yeshiva-study", "לימוד בחברותא בישיבה"),
  img("tavshil-kitchen", "מטבח בית התבשיל"),
  img("sefarim-hands", "בין דפי הספרים"),
  img("tt-classroom", "כיתה בתלמוד תורה"),
  img("yeshiva-beit-midrash2", "בבית המדרש"),
  img("campus-aerial2", "מבט על המוסדות"),
  img("tavshil-pantry", "מזווה בית התבשיל"),
  img("tavshil-table", "שולחן ערוך בבית התבשיל"),
  img("sefarim-pages", "דפי ספרים במכון"),
  img("kollel-sefer", "ספר פתוח בכולל"),
  img("gan-table", "שולחן הילדים בגן"),
  img("gan-paintings", "עבודות הילדים בגן"),
  img("yeshiva-hall2", "אולם הלימוד בישיבה"),
];

/** Per department slug. The first image is the cover on the departments grid. */
export const DEPARTMENT_MEDIA: Record<string, StaticImage[]> = {
  "gan-banim": [img("gan-table", "פינת הגן"), img("gan-wall", "קירות הגן"), img("gan-paintings", "ציורי הילדים")],
  "gan-banot": [img("gan-wall", "קירות הגן"), img("gan-table", "פינת הגן"), img("gan-paintings", "ציורי הילדים")],
  "talmud-torah": [img("tt-building", "בניין התלמוד תורה"), img("tt-yard", "החצר בהפסקה"), img("tt-classroom", "כיתה בתלמוד תורה"), img("campus-aerial", "מתחם המוסדות מהאוויר")],
  kollel: [img("kollel-chavrusa3", "לימוד בחברותא"), img("kollel-chavrusa2", "אברכי הכולל בלימוד"), img("kollel-sefer", "עיון בספר")],
  // no photos of children here: the video has no clear footage of the girls' school, so only classroom wall art
  "beit-chinuch-banot": [img("gan-paintings", "עבודות התלמידות על הקיר"), img("gan-wall", "קישוטי הכיתה")],
  "beit-hatavshil": [img("tavshil-kitchen", "מטבח בית התבשיל"), img("tavshil-pantry", "מזווה בית התבשיל"), img("tavshil-table", "שולחן ערוך")],
  "yeshiva-ketana": [img("yeshiva-hall2", "בית המדרש"), img("yeshiva-study", "לימוד בחברותא"), img("yeshiva-beit-midrash2", "שיעור בבית המדרש"), img("yeshiva-hall3", "אולם הלימוד")],
  "machon-sfarim": [
    img("books-hachinuch", "אור החינוך – בעברית ובאנגלית"),
    img("books-haratzon", "אור הרצון – במהדורה בעברית ובאנגלית"),
    img("books-hazemirot", "אור הזמירות – זמירות לשבת קודש"),
    img("books-behirut", "אור בהירות הדרך – עצות וביאורים בעבודת ברסלב"),
    img("books-catalog-sheet", "קטלוג הספרים"),
    img("sefarim-pages", "דפי ספרים"),
    img("sefarim-hands", "בין דפי הספרים"),
  ],
};
