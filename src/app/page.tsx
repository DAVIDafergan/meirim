const donationTiers = [
  {
    amount: "180 ₪",
    title: "מחזירים את החיוך",
    desc: "מימון טיפול רגשי לילד",
  },
  {
    amount: "360 ₪",
    title: "עוגן למשפחה",
    desc: "סל תמיכה בסיסי",
  },
  {
    amount: "500 ₪",
    title: "שומרים על הנוער",
    desc: "תמיכה במסגרות מוגנות",
  },
  {
    amount: "1,000 ₪",
    title: "חזית של חסד",
    desc: "החזקת המוסדות",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      {/* Section A: Hero */}
      <section
        id="hero"
        className="hero-glow relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      >
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-7xl font-black tracking-tight text-gold drop-shadow-[0_0_20px_rgba(253,224,71,0.6)] sm:text-8xl md:text-9xl">
            מאירים
          </h1>
          <div className="rounded-md bg-purple-box px-8 py-3 shadow-[0_0_30px_rgba(45,27,78,0.8)] sm:px-10 sm:py-4">
            <span className="text-3xl font-extrabold text-gold sm:text-4xl md:text-5xl">
              את הגליל
            </span>
          </div>
        </div>

        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl">
          דווקא עכשיו, תחת אש – שומרים על הילדים והמשפחות בצפת!
        </p>

        <a
          href="#donate"
          className="animate-pulse-gold mt-12 inline-block rounded-full bg-gradient-to-b from-yellow-300 via-gold to-yellow-600 px-12 py-5 text-xl font-bold text-black shadow-lg transition-transform duration-300 hover:scale-105"
        >
          לתרומה דחופה
        </a>
      </section>

      {/* Section B: The Story */}
      <section id="story" className="ambient-glow px-6 py-24 sm:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <h2 className="text-3xl font-bold text-gold sm:text-4xl">
            הילדים של צפת תחת אש 💔
          </h2>
          <p className="text-lg leading-loose text-gray-300 sm:text-xl">
            חרדות, מסגרות קורסות ומשפחות במצוקה כלכלית. מוסדות &quot;נחלי
            התורה צפת&quot; הם העוגן של הקהילה, אבל המשאבים שלנו להמשך הסיוע
            פשוט אזלו.
            <br />
            <br />
            קמפיין &apos;מאירים את הגליל&apos; קורא לכם: אל תשאירו את ילדי
            הצפון לבד במערכה! תרומה אחת שלכם משנה חיים של משפחה שלמה.
          </p>
        </div>
      </section>

      {/* Section C: Donation Tiers */}
      <section id="donate" className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-gold sm:text-4xl">
            בחרו כיצד לתרום
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {donationTiers.map((tier) => (
              <div
                key={tier.title}
                className="flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(253,224,71,0.2)]"
              >
                <span className="text-4xl font-black text-gold drop-shadow-[0_0_10px_rgba(253,224,71,0.4)]">
                  {tier.amount}
                </span>
                <h3 className="text-xl font-bold text-white">{tier.title}</h3>
                <p className="text-gray-400">{tier.desc}</p>
                <a
                  href="#donate"
                  className="mt-auto w-full rounded-full bg-gradient-to-b from-yellow-300 via-gold to-yellow-600 px-6 py-3 font-bold text-black shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(253,224,71,0.6)]"
                >
                  תרמו עכשיו
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-gray-500">
        מוסדות &quot;נחלי התורה צפת&quot; &middot; קמפיין מאירים את הגליל
      </footer>
    </main>
  );
}
