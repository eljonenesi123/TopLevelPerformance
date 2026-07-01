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
    nav_call: "Call now",

    hero_eyebrow: "Online & 1-on-1 coaching",
    hero_h1: "Train like it's<br>the only thing<br>that <span class=\"accent\">matters.</span>",
    hero_p: "Strength and conditioning programs built around your goals — not generic workouts.",
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
    gym_h3: "Where I train",
    gym_p: "Square Wellness Center, Tirana",
    gym_link: "View on Instagram",
    cert1_h3: "Certified Personal Trainer",
    cert2_h3: "Corrective Exercise Specialist",
    cert_link: "View certificate",

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
    ex1_h4: "Back squat",
    ex2_h4: "Loaded box step-up",
    ex3_h4: "Stability ball plank",
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
    form_error: "Something went wrong. Please try again or call instead."
  },
  sq: {
    nav_home: "Ballina",
    nav_programs: "Programet",
    nav_training: "Stërvitje",
    nav_contact: "Kontakt",
    nav_call: "Telefono tani",

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
    gym_h3: "Ku stërvitem",
    gym_p: "Square Wellness Center, Tiranë",
    gym_link: "Shiko në Instagram",
    cert1_h3: "Trajner Personal i Certifikuar",
    cert2_h3: "Specialist i Ushtrimeve Korrigjuese",
    cert_link: "Shiko certifikatën",

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
    ex1_h4: "Squat me shtangë",
    ex2_h4: "Hap mbi kuti me peshë",
    ex3_h4: "Plank me top stabiliteti",
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
    form_error: "Diçka shkoi keq. Provoni përsëri ose telefononi."
  }
};

function applyLanguage(lang) {
  var dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
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

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
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

  var statEls = document.querySelectorAll('.stat-num[data-count]');
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
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        statIO.unobserve(el);
      });
    }, { threshold: 0.4 });
    statEls.forEach(function (el) { statIO.observe(el); });
  }

  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }
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
      scrollBtn.classList.toggle('visible', window.scrollY > 400);
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