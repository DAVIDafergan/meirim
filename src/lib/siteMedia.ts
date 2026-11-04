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
];

/** Per department slug. The first image is the cover on the departments grid. */
export const DEPARTMENT_MEDIA: Record<string, StaticImage[]> = {
  "gan-banim": [img("gan-table", "פינת הגן"), img("gan-wall", "קירות הגן"), img("gan-paintings", "ציורי הילדים")],
  "gan-banot": [img("gan-wall", "קירות הגן"), img("gan-table", "פינת הגן"), img("gan-paintings", "ציורי הילדים")],
  "talmud-torah": [img("tt-building", "בניין התלמוד תורה"), img("tt-yard", "החצר בהפסקה"), img("tt-classroom", "כיתה בתלמוד תורה"), img("campus-aerial", "מתחם המוסדות מהאוויר")],
  kollel: [img("kollel-chavrusa3", "לימוד בחברותא"), img("kollel-chavrusa2", "אברכי הכולל בלימוד"), img("kollel-sefer", "עיון בספר")],
  "beit-chinuch-banot": [img("banot-classroom", "כיתה בבית החינוך לבנות")],
  "beit-hatavshil": [img("tavshil-kitchen", "מטבח בית התבשיל"), img("tavshil-pantry", "מזווה בית התבשיל"), img("tavshil-table", "שולחן ערוך")],
  "machon-sfarim": [img("sefarim-pages", "דפי גמרא"), img("sefarim-hands", "בין דפי הספרים"), img("sefarim-page", "עיון בספר")],
};
