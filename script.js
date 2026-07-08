// Google Analytics (GA4) — only loads if the visitor has accepted cookies
(function () {
  var GA_MEASUREMENT_ID = 'G-HFDSH02MCG'; 

  function loadAnalytics() {
    if (window.tlpAnalyticsLoaded || GA_MEASUREMENT_ID.indexOf('XXXX') !== -1) return;
    window.tlpAnalyticsLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }

  window.tlpLoadAnalytics = loadAnalytics;

  try {
    if (localStorage.getItem('tlp_cookies') === 'accepted') loadAnalytics();
  } catch (e) {}
})();

// Cookie banner
(function () {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  try {
    if (localStorage.getItem('tlp_cookies')) return;
  } catch(e) {}
  setTimeout(function () { banner.classList.add('show'); }, 1200);

  function dismiss(choice) {
    banner.classList.remove('show');
    try { localStorage.setItem('tlp_cookies', choice); } catch(e) {}
  }
  var acceptBtn = document.getElementById('cookie-accept');
  var declineBtn = document.getElementById('cookie-decline');
  if (acceptBtn) acceptBtn.addEventListener('click', function () {
    dismiss('accepted');
    if (window.tlpLoadAnalytics) window.tlpLoadAnalytics();
  });
  if (declineBtn) declineBtn.addEventListener('click', function () { dismiss('declined'); });
})();

// Floating WhatsApp bubble
(function () {
  var bubble = document.getElementById('wa-bubble');
  var closeBtn = document.getElementById('wa-bubble-close');
  if (!bubble) return;
  try {
    if (sessionStorage.getItem('tlp_wa_dismissed')) return;
  } catch (e) {}

  var showTimer = setTimeout(function () { bubble.classList.add('show'); }, 3500);
  var autoHideTimer = setTimeout(function () { bubble.classList.remove('show'); }, 13500);

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      bubble.classList.remove('show');
      clearTimeout(showTimer);
      clearTimeout(autoHideTimer);
      try { sessionStorage.setItem('tlp_wa_dismissed', '1'); } catch (e) {}
    });
  }
})();

// Hero background video cycler (plays 3 clips in sequence, crossfading)
(function () {
  var heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  var videos = Array.prototype.slice.call(heroBg.querySelectorAll('.hero-video'));
  if (!videos.length) return;

  var current = 0;

  function loadVideo(v) {
    if (!v.src && v.dataset.src) {
      v.src = v.dataset.src;
      v.load();
    }
  }

  function playIndex(i) {
    videos.forEach(function (v, idx) {
      if (idx === i) v.classList.add('active');
      else v.classList.remove('active');
    });
    var v = videos[i];
    loadVideo(v);
    var playPromise = v.play();
    if (playPromise && playPromise.catch) {
      playPromise.catch(function (err) {
        console.warn('Hero video failed to autoplay:', v.dataset.src || v.src, err);
      });
    }
    current = i;
    loadVideo(videos[(i + 1) % videos.length]);
  }

  videos.forEach(function (v, i) {
    v.addEventListener('error', function () {
      console.warn('Hero video failed to load:', v.dataset.src || v.src, v.error);
    });
    v.addEventListener('ended', function () {
      playIndex((i + 1) % videos.length);
    });
  });

  playIndex(0);

  // Pause/resume with tab visibility to save battery and data
  document.addEventListener('visibilitychange', function () {
    var v = videos[current];
    if (document.hidden) {
      v.pause();
    } else {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }
  });
})();

// Inline background videos (training gallery + CTA band): only play while visible
(function () {
  var vids = document.querySelectorAll('.action-video, .cta-band-bg video');
  if (!vids.length) return;

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var v = entry.target;
        if (entry.isIntersecting) {
          var p = v.play();
          if (p && p.catch) p.catch(function () {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { io.observe(v); });
  } else {
    vids.forEach(function (v) {
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }
})();

// Auto-update copyright year in footer
(function () {
  var yearEl = document.getElementById('copyright-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

// Page load progress bar
(function () {
  var bar = document.createElement('div');
  bar.className = 'load-bar';
  document.body.appendChild(bar);
  bar.style.width = '30%';
  setTimeout(function () { bar.style.width = '70%'; }, 100);
  window.addEventListener('load', function () {
    bar.style.width = '100%';
    setTimeout(function () { bar.classList.add('done'); }, 400);
  });
})();

var TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_programs: "Programs",
    nav_training: "Training",
    nav_contact: "Contact",
    nav_about: "About",
    nav_call: "Call now",
    nav_account: "Client login",

    hero_eyebrow: "Online & 1-on-1 coaching",
    hero_h1: "Train like it's<br>the only thing<br>that <span class=\"accent\">matters.</span>",
    hero_p: "Strength and conditioning programs built around your goals, not generic workouts.",
    hero_location: "Based in Tirana, Albania",
    btn_view_programs: "View programs",
    btn_call_now: "Call now",
    stat_years: "Years coaching",
    stat_athletes: "Athletes trained",
    stat_paths: "Coaching paths",

    services_h2: "What's included",
    svc1_index: "Strength",
    svc1_h3: "Strength & hypertrophy",
    svc1_p: "Lifting programs that progress weekly so you keep getting stronger.",
    svc2_index: "Conditioning",
    svc2_h3: "Conditioning & fat loss",
    svc2_p: "Kettlebells, intervals, and circuits built around your week.",
    svc3_index: "Form",
    svc3_h3: "Technique & mobility",
    svc3_p: "Form checks and mobility work so every rep counts.",

    certs_h2: "Certified & qualified",
    cert1_h3: "Certified Personal Trainer",
    cert2_h3: "Corrective Exercise Specialist",
    cert_link: "View certificate",
    cert_issued: "Issued",
    cert_expires: "Expires",

    cta_ready: "Ready to start?",

    testimonials_h2: "What clients say",
    test1_quote: "Working with Top Level Performance changed how I train completely. The programming is structured and the feedback is honest. I'm stronger than I've ever been.",
    test2_quote: "I started the online program not knowing what to expect. Every week brought a clear plan and real progress. Best decision I've made for my fitness.",
    test3_quote: "The 1-on-1 sessions pushed me further than I thought possible. Technique, intensity, and accountability — everything I needed in one place.",

    footer_tagline: "Online and 1-on-1 strength coaching in Tirana.",
    footer_site: "Site",
    footer_follow: "Follow",
    footer_call: "Call",

    programs_h1: "Online vs. 1-on-1",
    programs_p: "Pick how close you want the coaching.",
    online_name: "Online program",
    online_h3: "Train anywhere",
    online_price_html: "From <span>€25</span> /month",
    online_li1: "Custom plan, updated every 4 weeks",
    online_li2: "App-based tracking",
    online_li3: "Weekly check-ins",
    online_li4: "Direct messaging support",
    online_btn: "Call to start",

    oneonone_tag: "Most hands-on",
    oneonone_name: "1-on-1 coaching",
    oneonone_h3: "Train with me",
    oneonone_price_html: "From <span>€95</span> /month",
    oneonone_li1: "Everything in the online program",
    oneonone_li2: "In-person sessions, coached live",
    oneonone_li3: "Real-time form correction",
    oneonone_li4: "Priority scheduling",
    oneonone_btn: "Call to book 1-on-1",

    start_h2: "Getting started",
    step1_h3: "Quick call",
    step1_p: "We talk through your goals and schedule.",
    step2_h3: "Custom plan",
    step2_p: "Built around your equipment and level.",
    step3_h3: "Train and adjust",
    step3_p: "Weekly check-ins keep things moving.",

    tz_h2: "How the training app works",
    tz_p: "Once you join, everything — your plan, exercise videos, and progress — lives in one app called Trainerize.",
    tz1_h3: "You get an invite",
    tz1_p: "After we speak, I add you as a client and you'll get an email invitation to set up your account.",
    tz2_h3: "Download the app",
    tz2_p: "Grab Trainerize free from the App Store or Google Play, then log in with the password you created.",
    tz3_h3: "Find your exercises",
    tz3_p: "Open the Workouts tab — every exercise in your plan has a video demo, plus your sets, reps, and weight to log.",
    tz4_h3: "Track and message",
    tz4_p: "Log each session as you go, check your progress charts, and message me directly if anything needs adjusting.",
    tz_callout_h3: "Already a client?",
    tz_callout_p: "Use the button below to log into your existing Trainerize account. New here? Get in touch first and I'll set your account up.",
    tz_callout_login: "Client login",
    tz_callout_contact: "Get started",

    faq_h2: "Frequently asked",
    faq1_q: "Can I switch programs later?",
    faq1_a: "Yes, anytime — most clients start online and move to 1-on-1 when they're ready.",
    faq2_q: "Do I need a gym membership?",
    faq2_a: "No. Tell me what equipment you have and your plan is built around it.",
    faq3_q: "Is there a minimum commitment?",
    faq3_a: "No contract. Both programs run month to month — cancel anytime.",
    cta_not_sure: "Not sure which fits?",

    training_h1: "Training in action",
    training_p: "A look inside the work — strength, conditioning, and core control.",
    tag_strength: "Strength",
    tag_conditioning: "Conditioning",
    tag_core: "Core & stability",
    ex1_h4: "Loaded knee march",
    ex2_h4: "Leg press",
    ex3_h4: "Pull-ups",
    cta_want_plan: "Want a plan built like this?",

    contact_h1: "Let's talk",
    contact_p: "Call now, or send a quick message below.",
    contact_reach: "Reach me directly",
    contact_reply: "Usually a reply within a day.",
    label_phone: "Phone",
    label_location: "Location",
    value_location: "Tirana, Albania",
    label_email: "Email",
    label_instagram: "Instagram",
    label_name: "Name",
    placeholder_name: "Your full name",
    placeholder_email: "you@email.com",
    label_program_select: "Which program interests you?",
    opt_online: "Online coaching — €25/month",
    opt_1on1: "1-on-1 coaching — €95/month",
    opt_unsure: "Not sure yet",
    label_message: "Message",
    placeholder_message: "Tell me about your goals and training experience",
    btn_send: "Send message",
    form_success: "Message sent. I'll get back to you within a day.",
    form_error: "Something went wrong. Please try again or call instead.",

    about_stat_certs: "ISSA certs",
    about_eyebrow: "Meet the coach",
    about_lead: "I'm a certified personal trainer, corrective exercise specialist and nutritionist based in Tirana, Albania, coaching clients in person and online across the world.",
    about_p1: "My background started in football. I spent 2 years coaching youth players from U5 all the way through to U15, developing training programs built around movement quality, athleticism, and long-term development. That foundation shaped how I think about training: technique first, intensity second, and progression always.",
    about_p2: "I moved into personal training because I wanted to work with people one-on-one and build programs that actually fit around their life, not generic plans copied from the internet. Every client I work with gets a program designed from scratch, tracked weekly, and adjusted based on real results.",
    about_p3: "Outside the gym, I hold three ISSA certifications: Certified Personal Trainer, Corrective Exercise Specialist, and Nutritionist, so whether you want to get stronger, lose weight, fix movement patterns, or clean up your diet, I can coach all of it in one place.",
    btn_work_with_me: "Work with me",

    eyebrow_in_action: "In action",
    video_h2: "See how I train",

    eyebrow_background: "Background",
    football_h2: "Youth football coaching",
    football_h3: "2 years as a youth football trainer",
    football_p: "Before moving into personal training, I developed training and conditioning programs for young football players across all youth age groups — building athletic foundations, coordination, and movement quality from an early age.",

    eyebrow_how_i_coach: "How I coach",
    philosophy_h2: "Training philosophy",
    phil1_h3: "Technique first",
    phil1_p: "Good form under load — corrected live, every rep.",
    phil2_h3: "Progressive overload",
    phil2_p: "Numbers tracked weekly — progress measured, not guessed.",
    phil3_h3: "Built around you",
    phil3_p: "No templates. Your schedule, your goals, your equipment.",

    eyebrow_credentials: "Credentials",
    credentials_h2: "Certifications",
    issa_full_name: "International Sports Sciences Association (ISSA)",
    cert3_h3: "Nutrition Coach",
    cta_ready_train: "Ready to train?",
    wa_greeting: "Hi! Need help? Message me on WhatsApp.",
    wa_cta: "Message on WhatsApp",
    instagram_h2: "Follow us on <span class=\"accent-text\">Instagram</span>",
    instagram_p: "Training clips, client transformations, and behind-the-scenes moments.",
    btn_view_profile: "View our profile",

    how_h2: "How training works",
    how_p: "Same coaching standard, two ways to train.",
    tag_online: "Online coaching",
    tag_oneonone: "1-on-1 coaching",
    tag_recommended: "Recommended",
    notfound_h1: "This page skipped leg day",
    notfound_p: "The page you're looking for doesn't exist or has moved. Let's get you back on track.",
    btn_back_home: "Back to home",

    pro_h2: "For professional athletes",
    pro_p: "Competing at a high level needs a different approach — programming built around your season, recovery, and performance goals.",
    pro_1on1_label: "1-on-1 session",
    pro_per_session: " /session",
    pro_online_label: "Online training",
    pro_on_demand: "On demand",
    pro_note: "Pricing is tailored to your competition schedule and specific needs — get in touch to discuss.",
    pro_btn: "Contact for pricing",
    online_step1_h3: "Goals call",
    online_step1_p: "We talk through your goals, schedule, and equipment access.",
    online_step2_h3: "Program delivered",
    online_step2_p: "Your custom plan lands in your training app, ready to follow.",
    online_step3_h3: "Weekly check-ins",
    online_step3_p: "Form videos, feedback, and adjustments every week.",
    oneonone_step1_h3: "In-person assessment",
    oneonone_step1_p: "We assess your movement, mobility, and goals before your first session.",
    oneonone_step2_h3: "Live coached sessions",
    oneonone_step2_p: "I'm on the floor with you, correcting form in real time.",
    oneonone_step3_h3: "Progressive overload",
    oneonone_step3_p: "Every session builds on the last, tracked and adjusted live.",

    week_h2: "A sample training week",
    week_p: "Every plan is custom — this is just a taste of the structure.",
    day_mon: "Mon", day_tue: "Tue", day_wed: "Wed", day_thu: "Thu",
    day_fri: "Fri", day_sat: "Sat", day_sun: "Sun",
    week_rest: "Rest",
    week_online_mon: "Upper body strength",
    week_online_tue: "Conditioning",
    week_online_wed: "Lower body strength",
    week_online_thu: "Mobility & recovery",
    week_online_fri: "Full body strength",
    week_online_sat: "Optional conditioning",
    week_1on1_mon: "Session — Lower strength",
    week_1on1_wed: "Session — Upper strength",
    week_1on1_fri: "Session — Conditioning & core",
    week_1on1_sat: "Optional mobility work",

    btn_start_journey: "Start your journey",
    journey_eyebrow: "Start your journey",
    journey_h2: "Let's build your plan",
    journey_p: "Answer a few quick questions and I'll come back to you with a plan built around your goals.",
    journey_q_goal: "What's your main goal?",
    journey_goal_muscle: "Build muscle",
    journey_goal_fatloss: "Lose fat",
    journey_goal_strength: "Get stronger",
    journey_goal_fitness: "General fitness",
    journey_q_format: "How would you like to train?",
    journey_format_online: "Online coaching",
    journey_format_1on1: "1-on-1 in person",
    journey_format_unsure: "Not sure yet",
    journey_q_exp: "What's your training experience?",
    journey_exp_beginner: "Just starting out",
    journey_exp_intermediate: "Some experience",
    journey_exp_advanced: "Experienced lifter",
    journey_q_days: "How many days per week can you train?",
    journey_days_23: "2–3 days",
    journey_days_45: "4–5 days",
    journey_days_6: "6+ days",
    journey_q_nutrition: "How would you describe your nutrition?",
    journey_nut_good: "I eat well & track it",
    journey_nut_ok: "Decent, but inconsistent",
    journey_nut_help: "I need guidance with food",
    journey_label_food: "What does a typical day of eating look like for you?",
    journey_ph_food: "e.g. coffee for breakfast, byrek at lunch, big dinner, snacks at night…",
    journey_q_health: "Any injuries or health problems I should know about?",
    journey_health_no: "No, all good",
    journey_health_yes: "Yes — I'll explain below",
    journey_label_health: "Tell me more — old injuries, pain, conditions, medication…",
    journey_ph_health: "e.g. lower back pain, knee surgery in 2022, high blood pressure…",
    journey_q_contact: "Almost there — where can I reach you?",
    journey_label_name: "Name",
    journey_ph_name: "Your full name",
    journey_label_email: "Email",
    journey_ph_email: "you@email.com",
    journey_label_phone: "WhatsApp / phone",
    journey_ph_phone: "+355 …",
    journey_label_notes: "Anything else you want to tell me?",
    journey_ph_notes: "Your schedule, what you've tried before, what didn't work, your motivation — write as much as you want…",
    journey_optional: "(optional)",
    journey_back: "Back",
    journey_next: "Next",
    journey_submit: "Send my answers",
    journey_success: "Got it — your answers are on the way to me. I'll reply within a day.",
    journey_error: "Something went wrong. Please try again, or message me on WhatsApp."
  },
  sq: {
    nav_home: "Kryefaqja",
    nav_programs: "Programet",
    nav_training: "Stërvitje",
    nav_contact: "Kontakt",
    nav_about: "Rreth meje",
    nav_call: "Telefono tani",
    nav_account: "Hyrje klienti",

    hero_eyebrow: "Stërvitje online & individuale",
    hero_h1: "Stërvit sikur<br>është e vetmja<br>gjë që ka <span class=\"accent\">rëndësi.</span>",
    hero_p: "Programe force dhe kondicionimi të ndërtuara sipas qëllimeve tuaja — jo stërvitje gjenerike.",
    hero_location: "Me bazë në Tiranë, Shqipëri",
    btn_view_programs: "Shiko programet",
    btn_call_now: "Telefono tani",
    stat_years: "Vite stërvitje",
    stat_athletes: "Atletë të trajnuar",
    stat_paths: "Rrugë stërvitjeje",

    services_h2: "Çfarë përfshihet",
    svc1_index: "Forcë",
    svc1_h3: "Forcë & hipertrofi",
    svc1_p: "Programe peshash që përparojnë çdo javë, që ju të vazhdoni të bëheni më të fortë.",
    svc2_index: "Kondicionim",
    svc2_h3: "Kondicionim & humbje peshe",
    svc2_p: "Kettlebell, intervale dhe qarkore të ndërtuara sipas javës suaj.",
    svc3_index: "Teknikë",
    svc3_h3: "Teknikë & lëvizshmëri",
    svc3_p: "Kontrolle teknike dhe punë lëvizshmërie, që çdo përsëritje të ketë vlerë.",

    certs_h2: "I certifikuar & i kualifikuar",
    cert1_h3: "Trajner Personal i Certifikuar",
    cert2_h3: "Specialist i Ushtrimeve Korrigjuese",
    cert_link: "Shiko certifikatën",
    cert_issued: "Lëshuar",
    cert_expires: "Skadon",

    cta_ready: "Gati për të filluar?",

    testimonials_h2: "Çfarë thonë klientët",
    test1_quote: "Stërvitja me Top Level Performance ndryshoi plotësisht mënyrën time të stërvitjes. Programimi është i strukturuar dhe feedback-u i sinqertë. Jam më i fortë se kurrë më parë.",
    test2_quote: "E fillova programin online pa ditur çfarë të prisja. Çdo javë sillte një plan të qartë dhe përparim real. Vendimi më i mirë që kam marrë për formën time fizike.",
    test3_quote: "Seancat individuale më shtynë më larg nga sa mendoja se ishte e mundur. Teknikë, intensitet dhe përgjegjësi — gjithçka që më duhej në një vend.",

    footer_tagline: "Stërvitje force, online dhe individuale, në Tiranë.",
    footer_site: "Faqja",
    footer_follow: "Na ndiqni",
    footer_call: "Telefono",

    programs_h1: "Online kundrejt Individuale",
    programs_p: "Zgjidhni sa afër e doni stërvitjen.",
    online_name: "Program Online",
    online_h3: "Stërvit kudo",
    online_price_html: "Nga <span>€25</span> /muaj",
    online_li1: "Plan i personalizuar, përditësuar çdo 4 javë",
    online_li2: "Ndjekje përmes aplikacionit",
    online_li3: "Kontrolle javore",
    online_li4: "Mbështetje me mesazhe direkte",
    online_btn: "Telefono për të filluar",

    oneonone_tag: "Më praktike",
    oneonone_name: "Stërvitje Individuale",
    oneonone_h3: "Stërvit me mua",
    oneonone_price_html: "Nga <span>€95</span> /muaj",
    oneonone_li1: "Gjithçka në programin online",
    oneonone_li2: "Seanca live, të trajnuara personalisht",
    oneonone_li3: "Korrigjim teknike në kohë reale",
    oneonone_li4: "Planifikim me përparësi",
    oneonone_btn: "Telefono për të rezervuar",

    start_h2: "Si fillon",
    step1_h3: "Telefonatë e shpejtë",
    step1_p: "Flasim për qëllimet dhe orarin tuaj.",
    step2_h3: "Plan i personalizuar",
    step2_p: "I ndërtuar sipas pajisjeve dhe nivelit tuaj.",
    step3_h3: "Stërvit dhe rregullo",
    step3_p: "Kontrollet javore mbajnë gjithçka në lëvizje.",

    tz_h2: "Si funksionon aplikacioni i stërvitjes",
    tz_p: "Sapo të bashkohesh, gjithçka — plani yt, videot e ushtrimeve dhe progresi — gjendet në një aplikacion të vetëm, Trainerize.",
    tz1_h3: "Merr një ftesë",
    tz1_p: "Pasi flasim, të shtoj si klient dhe do të marrësh një email ftese për të krijuar llogarinë.",
    tz2_h3: "Shkarko aplikacionin",
    tz2_p: "Shkarko falas Trainerize nga App Store ose Google Play, pastaj identifikohu me fjalëkalimin që ke krijuar.",
    tz3_h3: "Gjej ushtrimet e tua",
    tz3_p: "Hap skedën Workouts — çdo ushtrim në planin tënd ka video demonstruese, si dhe seritë, përsëritjet dhe peshën për t'i regjistruar.",
    tz4_h3: "Ndiq progresin dhe komuniko",
    tz4_p: "Regjistro çdo seancë ndërkohë që stërvitesh, kontrollo grafikët e progresit dhe më shkruaj direkt nëse diçka duhet rregulluar.",
    tz_callout_h3: "Je klient tashmë?",
    tz_callout_p: "Përdor butonin më poshtë për t'u identifikuar në llogarinë tënde ekzistuese në Trainerize. I ri këtu? Na kontakto fillimisht dhe do ta krijoj llogarinë për ty.",
    tz_callout_login: "Hyrje klienti",
    tz_callout_contact: "Fillo tani",

    faq_h2: "Pyetje të shpeshta",
    faq1_q: "A mund ta ndryshoj programin më vonë?",
    faq1_a: "Po, në çdo kohë — shumica e klientëve fillojnë online dhe kalojnë te individuale kur janë gati.",
    faq2_q: "A më duhet anëtarësim në palestër?",
    faq2_a: "Jo. Më thoni çfarë pajisjesh keni dhe plani ndërtohet rreth tyre.",
    faq3_q: "A ka angazhim minimal?",
    faq3_a: "Pa kontratë. Të dy programet janë muaj pas muaji — anulo kur të duash.",
    cta_not_sure: "Nuk je i sigurt cili të përshtatet?",

    training_h1: "Stërvitja në veprim",
    training_p: "Një vështrim brenda punës — forcë, kondicionim dhe kontroll bërthame.",
    tag_strength: "Forcë",
    tag_conditioning: "Kondicionim",
    tag_core: "Bërthamë & stabilitet",
    ex1_h4: "Marshim me shtangë",
    ex2_h4: "Shtypje këmbësh",
    ex3_h4: "Ngritje në shufër",
    cta_want_plan: "Dëshiron një plan si ky?",

    contact_h1: "Le të flasim",
    contact_p: "Telefono tani, ose dërgo një mesazh të shpejtë më poshtë.",
    contact_reach: "Më kontakto direkt",
    contact_reply: "Zakonisht përgjigje brenda një dite.",
    label_phone: "Telefon",
    label_location: "Vendndodhja",
    value_location: "Tiranë, Shqipëri",
    label_email: "Email",
    label_instagram: "Instagram",
    label_name: "Emri",
    placeholder_name: "Emri juaj i plotë",
    placeholder_email: "you@email.com",
    label_program_select: "Cili program ju intereson?",
    opt_online: "Stërvitje Online — €25/muaj",
    opt_1on1: "Stërvitje Individuale — €95/muaj",
    opt_unsure: "Ende nuk e di",
    label_message: "Mesazhi",
    placeholder_message: "Më tregoni për qëllimet dhe përvojën tuaj",
    btn_send: "Dërgo mesazhin",
    form_success: "Mesazhi u dërgua. Do t'ju kontaktoj brenda një dite.",
    form_error: "Diçka shkoi keq. Provoni përsëri ose telefononi.",

    about_stat_certs: "Certifikime ISSA",
    about_eyebrow: "Njihuni me trajnerin",
    about_lead: "Jam trajner personal i certifikuar, specialist i ushtrimeve korrigjuese dhe nutricionist me bazë në Tiranë, Shqipëri, duke stërvitur klientë personalisht dhe online në mbarë botën.",
    about_p1: "Fillimet e mia janë në futboll. Kalova 2 vite duke trajnuar lojtarë të rinj nga mosha U5 deri te U15, duke zhvilluar programe stërvitjeje të bazuara në cilësinë e lëvizjes, atletizmin dhe zhvillimin afatgjatë. Ai themel formoi mënyrën si e mendoj stërvitjen: teknika e para, intensiteti i dyti, dhe progresi gjithmonë.",
    about_p2: "Kalova te stërvitja personale sepse doja të punoja individualisht me njerëzit dhe të ndërtoja programe që përshtaten vërtet me jetën e tyre, jo plane gjenerike të kopjuara nga interneti. Çdo klient me të cilin punoj merr një program të hartuar nga e para, të ndjekur çdo javë dhe të përshtatur sipas rezultateve reale.",
    about_p3: "Përveç palestrës, kam tre certifikime ISSA: Trajner Personal i Certifikuar, Specialist i Ushtrimeve Korrigjuese dhe Nutricionist — pra qoftë që doni të bëheni më të fortë, të humbisni peshë, të korrigjoni modelet e lëvizjes apo të përmirësoni dietën, mund t'i trajnoj të gjitha në një vend.",
    btn_work_with_me: "Puno me mua",

    eyebrow_in_action: "Në veprim",
    video_h2: "Shiko si stërvit",

    eyebrow_background: "Përvoja",
    football_h2: "Trajnim futbolli për të rinj",
    football_h3: "2 vite si trajner futbolli për të rinj",
    football_p: "Para se të kalohesha te stërvitja personale, zhvillova programe stërvitjeje dhe kondicionimi për lojtarë të rinj futbolli në të gjitha grupmoshat — duke ndërtuar themele atletike, koordinim dhe cilësi lëvizjeje që në moshë të hershme.",

    eyebrow_how_i_coach: "Si stërvit",
    philosophy_h2: "Filozofia e stërvitjes",
    phil1_h3: "Teknika e para",
    phil1_p: "Forma e mirë nën ngarkesë — e korrigjuar live, në çdo përsëritje.",
    phil2_h3: "Ngarkesë progresive",
    phil2_p: "Numrat ndiqen çdo javë — përparimi matet, nuk hamendësohet.",
    phil3_h3: "Ndërtuar rreth teje",
    phil3_p: "Pa shabllone. Orari yt, qëllimet e tua, pajisjet e tua.",

    eyebrow_credentials: "Kredencialet",
    credentials_h2: "Certifikimet",
    issa_full_name: "International Sports Sciences Association (ISSA)",
    cert3_h3: "Trajner Nutricioni",
    cta_ready_train: "Gati për të stërvitur?",
    wa_greeting: "Përshëndetje! Keni nevojë për ndihmë? Më shkruani në WhatsApp.",
    wa_cta: "Shkruaj në WhatsApp",
    instagram_h2: "Na ndiqni në <span class=\"accent-text\">Instagram</span>",
    instagram_p: "Klipe stërvitjeje, transformime klientësh dhe momente pas skenave.",
    btn_view_profile: "Shiko profilin tonë",

    how_h2: "Si funksionon stërvitja",
    how_p: "I njëjti standard trajnimi, dy mënyra për t'u stërvitur.",
    tag_online: "Stërvitje online",
    tag_oneonone: "Stërvitje 1-me-1",
    tag_recommended: "Rekomanduar",
    notfound_h1: "Kjo faqe humbi ditën e këmbëve",
    notfound_p: "Faqja që po kërkoni nuk ekziston ose është zhvendosur. Le t'ju kthejmë në rrugën e duhur.",
    btn_back_home: "Kthehu në fillim",

    pro_h2: "Për atletë profesionistë",
    pro_p: "Konkurrimi në nivel të lartë kërkon një qasje tjetër — programim i ndërtuar rreth sezonit, rikuperimit dhe qëllimeve të performancës suaj.",
    pro_1on1_label: "Seancë 1-me-1",
    pro_per_session: " /seancë",
    pro_online_label: "Stërvitje online",
    pro_on_demand: "Sipas kërkesës",
    pro_note: "Çmimi përshtatet sipas kalendarit tuaj të garave dhe nevojave specifike — na kontaktoni për të diskutuar.",
    pro_btn: "Kontakto për çmim",
    online_step1_h3: "Bisedë për qëllimet",
    online_step1_p: "Flasim për qëllimet, orarin dhe pajisjet që keni në dispozicion.",
    online_step2_h3: "Programi dërgohet",
    online_step2_p: "Plani juaj i personalizuar mbërrin në aplikacionin e stërvitjes, gati për t'u ndjekur.",
    online_step3_h3: "Kontrolle javore",
    online_step3_p: "Video të formës, komente dhe rregullime çdo javë.",
    oneonone_step1_h3: "Vlerësim personal",
    oneonone_step1_p: "Vlerësojmë lëvizjen, lëvizshmërinë dhe qëllimet tuaja para seancës së parë.",
    oneonone_step2_h3: "Seanca të stërvitura live",
    oneonone_step2_p: "Jam me ju në palestër, duke korrigjuar formën në kohë reale.",
    oneonone_step3_h3: "Ngarkesë progresive",
    oneonone_step3_p: "Çdo seancë ndërtohet mbi të fundit, e ndjekur dhe e përshtatur live.",

    week_h2: "Një javë stërvitjeje si shembull",
    week_p: "Çdo plan është i personalizuar — kjo është vetëm një shembull i strukturës.",
    day_mon: "Hën", day_tue: "Mar", day_wed: "Mër", day_thu: "Enj",
    day_fri: "Pre", day_sat: "Sht", day_sun: "Die",
    week_rest: "Pushim",
    week_online_mon: "Forcë e pjesës së sipërme",
    week_online_tue: "Kondicionim",
    week_online_wed: "Forcë e pjesës së poshtme",
    week_online_thu: "Lëvizshmëri & rikuperim",
    week_online_fri: "Forcë e trupit të plotë",
    week_online_sat: "Kondicionim opsional",
    week_1on1_mon: "Seancë — Forcë e këmbëve",
    week_1on1_wed: "Seancë — Forcë e sipërme",
    week_1on1_fri: "Seancë — Kondicionim & bërthamë",
    week_1on1_sat: "Punë opsionale lëvizshmërie",

    btn_start_journey: "Fillo rrugëtimin",
    journey_eyebrow: "Fillo rrugëtimin tënd",
    journey_h2: "Le të ndërtojmë planin tënd",
    journey_p: "Përgjigju disa pyetjeve të shpejta dhe do të të kthehem me një plan të ndërtuar rreth objektivave të tua.",
    journey_q_goal: "Cili është objektivi yt kryesor?",
    journey_goal_muscle: "Ndërto muskuj",
    journey_goal_fatloss: "Humb yndyrë",
    journey_goal_strength: "Bëhu më i fortë",
    journey_goal_fitness: "Fitnes i përgjithshëm",
    journey_q_format: "Si dëshiron të stërvitesh?",
    journey_format_online: "Stërvitje online",
    journey_format_1on1: "Një-me-një personalisht",
    journey_format_unsure: "Ende s'jam i sigurt",
    journey_q_exp: "Sa përvojë ke në stërvitje?",
    journey_exp_beginner: "Sapo po filloj",
    journey_exp_intermediate: "Kam pak përvojë",
    journey_exp_advanced: "Me përvojë në palestër",
    journey_q_days: "Sa ditë në javë mund të stërvitesh?",
    journey_days_23: "2–3 ditë",
    journey_days_45: "4–5 ditë",
    journey_days_6: "6+ ditë",
    journey_q_nutrition: "Si do ta përshkruaje ushqyerjen tënde?",
    journey_nut_good: "Ha mirë & e ndjek me kujdes",
    journey_nut_ok: "Mirë, por jo gjithmonë",
    journey_nut_help: "Kam nevojë për udhëzime me ushqimin",
    journey_label_food: "Si duket një ditë tipike ushqimi për ty?",
    journey_ph_food: "p.sh. kafe në mëngjes, byrek në drekë, darkë e madhe, snacks në mbrëmje…",
    journey_q_health: "Ke dëmtime apo probleme shëndetësore që duhet t'i di?",
    journey_health_no: "Jo, gjithçka në rregull",
    journey_health_yes: "Po — do shpjegoj më poshtë",
    journey_label_health: "Më trego më shumë — dëmtime të vjetra, dhimbje, gjendje, medikamente…",
    journey_ph_health: "p.sh. dhimbje në pjesën e poshtme të shpinës, operacion në gju në 2022, tension i lartë…",
    journey_q_contact: "Gati — ku mund të të kontaktoj?",
    journey_label_name: "Emri",
    journey_ph_name: "Emri juaj i plotë",
    journey_label_email: "Email",
    journey_ph_email: "ju@email.com",
    journey_label_phone: "WhatsApp / telefon",
    journey_ph_phone: "+355 …",
    journey_label_notes: "Diçka tjetër që dëshiron të më tregosh?",
    journey_ph_notes: "Orari yt, çfarë ke provuar më parë, çfarë s'funksionoi, motivimi yt — shkruaj sa të duash…",
    journey_optional: "(opsionale)",
    journey_back: "Mbrapa",
    journey_next: "Vazhdo",
    journey_submit: "Dërgo përgjigjet",
    journey_success: "U mor — përgjigjet po vijnë tek unë. Do të përgjigjem brenda një dite.",
    journey_error: "Diçka shkoi keq. Provo përsëri, ose më shkruaj në WhatsApp."
  }
};

function runTypewriter() {
  var el = document.getElementById('hero-accent');
  if (!el) return;
  var fullText = el.textContent || el.innerText;
  if (!fullText) return;
  el.textContent = '';
  el.classList.add('typing');
  var i = 0;
  var delay = 80;
  function typeChar() {
    if (i < fullText.length) {
      el.textContent += fullText[i];
      i++;
      setTimeout(typeChar, delay);
    } else {
      // Remove cursor after done
      setTimeout(function () {
        el.classList.remove('typing');
      }, 800);
    }
  }
  setTimeout(typeChar, 400);
}

function applyLanguage(lang) {
  var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
      // Re-attach id to accent span after innerHTML replacement
      var accent = el.querySelector('.accent');
      if (accent && el.id !== 'hero-accent') {
        accent.id = 'hero-accent';
      }
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  document.documentElement.setAttribute('lang', lang === 'sq' ? 'sq' : 'en');
  try { localStorage.setItem('tlp_lang', lang); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function () {
  var savedLang = 'en';
  try { savedLang = localStorage.getItem('tlp_lang') || 'en'; } catch (e) {}
  applyLanguage(savedLang);
  runTypewriter();

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
      runTypewriter();
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });
      if (!isOpen) item.classList.add('open');
    });
  });

  var statEls = document.querySelectorAll('.stat-num[data-count], .num[data-count]');
  if (statEls.length && 'IntersectionObserver' in window) {
    var statIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 900;
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.classList.add('pop');
          }
        }
        requestAnimationFrame(step);
        statIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    statEls.forEach(function (el) { statIO.observe(el); });
  }

  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }
  }

  // Parallax on hero background
  var heroBgImg = document.querySelector('.hero-bg img');
  if (heroBgImg) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          var maxParallax = 80;
          var offset = Math.min(scrollY * 0.3, maxParallax);
          heroBgImg.style.transform = 'translateY(' + offset + 'px)';
          heroBgImg.style.webkitTransform = 'translateY(' + offset + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var successEl = document.getElementById('form-success');
      var errorEl = document.getElementById('form-error');
      var submitBtn = document.getElementById('form-submit-btn');

      if (successEl) successEl.classList.remove('show');
      if (errorEl) errorEl.classList.remove('show');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '0.6'; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (response.ok) {
          if (successEl) successEl.classList.add('show');
          form.reset();
        } else {
          if (errorEl) errorEl.classList.add('show');
        }
      })
      .catch(function () {
        if (errorEl) errorEl.classList.add('show');
      })
      .finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = '1'; }
      });
    });
  }

  // Scroll to top button
  var scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', function () {
      scrollBtn.classList.toggle('visible', window.scrollY > 200);
    }, { passive: true });
    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Highlight active nav link based on current page
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});
/* ===== START YOUR JOURNEY questionnaire ===== */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('journey-form');
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.journey-step'));
  var total = steps.length;
  var current = 0;

  var bar = document.getElementById('journey-progress-bar');
  var stepNum = document.getElementById('journey-step-num');
  var stepTotal = document.getElementById('journey-step-total');
  var backBtn = document.getElementById('journey-back');
  var nextBtn = document.getElementById('journey-next');
  var submitBtn = document.getElementById('journey-submit');
  var liveEl = document.getElementById('journey-live');
  var successEl = document.getElementById('journey-success');
  var errorEl = document.getElementById('journey-error');

  if (stepTotal) stepTotal.textContent = total;

  // JS owns button visibility — clear any hidden attributes from markup
  [backBtn, nextBtn, submitBtn].forEach(function (b) {
    if (b) b.removeAttribute('hidden');
  });

  // Consent-safe GA4 tracking (gtag only exists after cookie accept)
  function track(eventName, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
  }
  var maxStepSeen = 0;

  function stepHasChoice(stepEl) {
    var group = stepEl.querySelector('.journey-options');
    if (!group) return true; // contact step, validated natively
    return !!group.querySelector('.journey-option.selected');
  }

  function render() {
    steps.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    if (bar) bar.style.width = ((current + 1) / total * 100) + '%';
    if (stepNum) stepNum.textContent = current + 1;

    if (backBtn) backBtn.style.display = current === 0 ? 'none' : '';

    var isLast = current === total - 1;
    if (nextBtn) {
      nextBtn.style.display = isLast ? 'none' : '';
      nextBtn.disabled = !isLast && !stepHasChoice(steps[current]);
    }
    if (submitBtn) submitBtn.style.display = isLast ? '' : 'none';

    // Track deepest step reached (fires once per step, not on Back)
    if (current > maxStepSeen) {
      maxStepSeen = current;
      track('journey_step', { step_number: current + 1, step_total: total });
    }
  }

  // Option selection
  var journeyStarted = false;
  form.querySelectorAll('.journey-options').forEach(function (group) {
    var targetId = group.getAttribute('data-target');
    var target = document.getElementById(targetId);
    group.querySelectorAll('.journey-option').forEach(function (opt) {
      opt.addEventListener('click', function () {
        if (!journeyStarted) { journeyStarted = true; track('journey_start', {}); }
        group.querySelectorAll('.journey-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        if (target) target.value = opt.getAttribute('data-value');
        if (nextBtn) nextBtn.disabled = false;
      });
    });
  });

  if (nextBtn) nextBtn.addEventListener('click', function () {
    if (!stepHasChoice(steps[current])) return;
    if (current < total - 1) { current++; render(); }
  });
  if (backBtn) backBtn.addEventListener('click', function () {
    if (current > 0) { current--; render(); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Native validation for the contact step (name + email required)
    if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

    if (successEl) successEl.classList.remove('show');
    if (errorEl) errorEl.classList.remove('show');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '0.6'; }

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        if (liveEl) liveEl.style.display = 'none';
        if (successEl) successEl.classList.add('show');
        track('journey_submit', {
          goal: (document.getElementById('jf-goal') || {}).value || '',
          format: (document.getElementById('jf-format') || {}).value || ''
        });
        form.reset();
      } else {
        if (errorEl) errorEl.classList.add('show');
        track('journey_submit_error', {});
      }
    })
    .catch(function () {
      if (errorEl) errorEl.classList.add('show');
    })
    .finally(function () {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = '1'; }
    });
  });

  render();
});