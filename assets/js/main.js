(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/* --- Extracted from index.html --- */
/* =========================================
   Skills Section Modal Logic
   ========================================= */
const skillsData = {
  "HTML": { logo: '<i class="devicon-html5-plain-wordmark colored" style="font-size: 70px;"></i>', desc: "HyperText Markup Language. The standard markup language for documents designed to be displayed in a web browser. I use it to form the foundational structure of all my digital applications." },
  "CSS": { logo: '<i class="devicon-css3-plain-wordmark colored" style="font-size: 70px;"></i>', desc: "Cascading Style Sheets used for describing the presentation of a document. Essential for crafting the responsive, aesthetic, and premium UI seen in my portfolio." },
  "Sass": { logo: '<i class="devicon-sass-original colored" style="font-size: 70px;"></i>', desc: "A preprocessor scripting language that compiles into CSS. Enhances my stylesheets heavily with logic, variables, advanced nesting, and clean reusable mixins." },
  "JavaScript": { logo: '<img src="assets/img/js_logo.png" style="width: 70px; height: 70px; object-fit: contain;" alt="JavaScript">', desc: "The core programming language of the web. I leverage it to drive deep interactivity, complex frontend rendering, and advanced AI API integrations dynamically." },
  "PHP": { logo: '<i class="devicon-php-plain colored" style="font-size: 70px;"></i>', desc: "A popular general-purpose scripting language suited for web development. Useful when managing standard backend integrations and specialized legacy server scripts." },
  "Python": { logo: '<img src="assets/img/python_logo.png" style="width: 70px; height: 70px; object-fit: contain;" alt="Python">', desc: "A versatile programming language heavily utilized across my workflows for handling AI scripts, data processing algorithms, and automated network operations." },
  "Canva": { logo: '<img src="assets/img/canva_logo.png" style="width: 70px; height: 70px; object-fit: contain;" alt="Canva">', desc: "An advanced graphic design platform I use for rapidly prototyping UI mockups, creating stunning visual content, and framing out optimal digital UX experiences." },
  "Git": { logo: '<i class="devicon-git-plain colored" style="font-size: 70px;"></i>', desc: "The global industry standard version control system. Central to my pipeline for securely managing repository history across my cybersecurity and web infrastructures." },
  "GitHub": { logo: '<i class="devicon-github-original-wordmark colored" style="font-size: 70px;"></i>', desc: "Hosting platform leveraging Git for advanced collaboration, version control, and continuous integration capabilities housing all my open-source logic bases." },
  "Docker": { logo: '<i class="devicon-docker-plain colored" style="font-size: 70px;"></i>', desc: "A powerful platform allowing me to develop, ship, and reliably run software layers inside isolated secure containers across diverse operational environments." },
  "MQTT": { logo: '<i class="bx bx-broadcast colored" style="font-size: 70px; color: #149ddd;"></i>', desc: "A lightweight messaging protocol crucial for robust interactions with small sensors and mobile devices. Integral to my IoT experiments and high-speed data exchanges." },
  "Firebase": { logo: '<i class="devicon-firebase-plain colored" style="font-size: 70px;"></i>', desc: "A massive platform backed by Google supplying essential real-time databases, authentication, and secure hosting supporting live apps like Hamro Chatting." },
  "ReactJS": { logo: '<i class="devicon-react-original colored" style="font-size: 70px;"></i>', desc: "A highly declarative, efficient JavaScript library built by Meta for rendering dynamic user interfaces rapidly—the backbone tech layer for scaling my progressive web projects." },
  "Node.js": { logo: '<i class="devicon-nodejs-plain colored" style="font-size: 70px;"></i>', desc: "An asynchronous event-driven JavaScript backend runtime environment I configure to launch scalable high-performance network APIs and logic bridges." },
  "Supabase": { logo: '<i class="devicon-supabase-plain colored" style="font-size: 70px;"></i>', desc: "A stellar open-source backend alternative providing instantly scalable PostgreSQL databases, real-time edge subscriptions, and rapid API configurations." },
  "PostgreSQL": { logo: '<i class="devicon-postgresql-plain colored" style="font-size: 70px;"></i>', desc: "An incredibly powerful, open-source object-relational database system reliably processing high-performance queries and safeguarding structured data logic environments." }
};

function openSkillModal(skillName) {
  const data = skillsData[skillName];
  if (!data) return;
  document.getElementById('skill-modal-icon').innerHTML = data.logo;
  document.getElementById('skill-modal-title').innerText = skillName;
  document.getElementById('skill-modal-desc').innerText = data.desc;
  document.getElementById('skill-modal-overlay').style.display = 'flex';
}

function closeSkillModal(e) {
  if (e && e.target !== e.currentTarget && e.target.id !== 'skill-modal-close') return;
  document.getElementById('skill-modal-overlay').style.display = 'none';
}
/* =========================================
   Contact Section Phone/Chat Popup
   ========================================= */
function toggleCallPopup(event) {
  event.stopPropagation();
  const popup = document.getElementById('call-popup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function (e) {
  const popup = document.getElementById('call-popup');
  if (popup && popup.style.display === 'block' && !e.target.closest('#call-popup')) {
    popup.style.display = 'none';
  }
});
/* =========================================
   Contact Form Submission & Validation
   ========================================= */
async function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submit-btn');
  const loading = document.getElementById('form-loading');
  const errorMsg = document.getElementById('form-error');
  const successMsg = document.getElementById('form-success');

  loading.style.display = 'flex';
  errorMsg.style.display = 'none';
  successMsg.style.display = 'none';
  btn.innerText = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  const contactInfo = form.contact_info.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[\d\s\-\(\)]{8,15}$/;

  if (!emailRegex.test(contactInfo) && !phoneRegex.test(contactInfo)) {
    errorMsg.innerText = "Please enter a valid email address or phone number.";
    errorMsg.style.display = 'flex';
    loading.style.display = 'none';
    btn.innerText = 'Send Message';
    btn.disabled = false;
    btn.style.opacity = '1';
    setTimeout(() => { errorMsg.style.display = 'none'; }, 6000);
    return;
  }

  try {
    const formData = new FormData(form);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    const data = await response.json();

    loading.style.display = 'none';
    if (data.success) {
      successMsg.style.display = 'flex';
      form.reset();
    } else {
      errorMsg.innerText = data.message || "Something went wrong!";
      errorMsg.style.display = 'flex';
    }
  } catch (error) {
    loading.style.display = 'none';
    errorMsg.innerText = "Error sending message. Please try again.";
    errorMsg.style.display = 'flex';
  } finally {
    btn.innerText = 'Send Message';
    btn.style.opacity = '1';
    btn.disabled = false;
    setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
  }
}
/* =========================================
   Cipher Text Effect & Hidden Terminal
   ========================================= */
// --- 1. Cipher Decode Text Effect (Hacker Title Scramble) ---
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
const cipherElements = document.querySelectorAll('.section-title h2');

const scrambleText = (element) => {
  const originalText = element.dataset.original || element.innerText;
  if (!element.dataset.original) element.dataset.original = originalText;

  let iteration = 0;
  clearInterval(element.scrambleInterval);

  element.scrambleInterval = setInterval(() => {
    element.innerText = originalText
      .split('')
      .map((letter, index) => {
        if (letter === ' ') return ' ';
        if (index < iteration) return originalText[index];
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');

    if (iteration >= originalText.length) {
      clearInterval(element.scrambleInterval);
      element.innerText = originalText;
    }
    iteration += 1 / 3;
  }, 30);
};

const cipherObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('decoded')) {
      entry.target.classList.add('decoded');
      // small delay before decrypting for visual impact
      setTimeout(() => scrambleText(entry.target), 200);
    }
  });
}, { threshold: 0.5 });

cipherElements.forEach(el => cipherObserver.observe(el));

// --- 2. Hidden Terminal Easter Egg (WH2 Shell) ---
const trigger = document.getElementById('term-trigger');
const terminal = document.getElementById('wh2-terminal');
const closeBtn = document.getElementById('term-close');
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');

let keysPressed = '';
// Global keyboard listener for 'wh2'
document.addEventListener('keydown', (e) => {
  // ignore if typing in an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  keysPressed += e.key.toLowerCase();
  if (keysPressed.length > 3) keysPressed = keysPressed.slice(-3);
  if (keysPressed === 'wh2') {
    terminal.style.display = 'flex';
    setTimeout(() => termInput.focus(), 100);
  }
});

trigger.addEventListener('click', () => {
  terminal.style.display = terminal.style.display === 'flex' ? 'none' : 'flex';
  if (terminal.style.display === 'flex') {
    setTimeout(() => termInput.focus(), 100);
  }
});

closeBtn.addEventListener('click', () => terminal.style.display = 'none');

const typeText = (element, text, speed = 15, onComplete = null) => {
  let i = 0;
  termInput.disabled = true;
  const typingInterval = setInterval(() => {
    if (text[i] === '<') {
      // Find the end of the tag
      const tagEnd = text.indexOf('>', i);
      if (tagEnd !== -1) {
        // Append the whole tag at once so it renders instead of showing text
        element.innerHTML += text.substring(i, tagEnd + 1);
        i = tagEnd + 1;
      } else {
        element.innerHTML += text.charAt(i);
        i++;
      }
    } else {
      element.innerHTML += text.charAt(i);
      i++;
    }

    const bodyObj = document.getElementById('term-body');
    if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;

    if (i >= text.length) {
      clearInterval(typingInterval);
      termInput.disabled = false;
      termInput.focus();
      if (onComplete) onComplete();
    }
  }, speed);
};

const commandHistory = [];
let historyIndex = -1;

const processCommand = (cmdStr) => {
  const args = cmdStr.split(' ');
  const command = args[0].toLowerCase();

  const responses = {
    'help': `<div class="help-grid">
      <div class="help-cat"><strong>[ SYSTEM INFO ]</strong><br>
        whoami   - Operator details<br>
        skills   - Ability database<br>
        projects - Classified files<br>
        contact  - Secure comms<br>
        date     - Sync date<br>
        time     - Sync time<br>
        history  - Command log
      </div>
      <div class="help-cat"><strong>[ VISUALS ]</strong><br>
        theme      - Toggle mode<br>
        color      - UI color<br>
        background - Section bg<br>
        matrix     - Code overlay<br>
        darkweb    - CRT filter<br>
        roll       - Evasion roll
      </div>
      <div class="help-cat"><strong>[ UTILS ]</strong><br>
        scroll   - Nav sections<br>
        call     - Phone dial<br>
        chat     - WhatsApp<br>
        hack     - Edit DOM<br>
        play     - play snake
      </div>
      <div class="help-cat"><strong>[ NUCLEAR ]</strong><br>
        destroy - Self-destruct<br>
        refresh - Reboot site<br>
        sudo    - Format system<br>
        close   - Terminate tab<br>
        exit    - Close console<br>
        clear   - Wipe screen
      </div>
    </div>`,
    'whoami': 'Name: Chandan Kumar Thakur<br>Alias: The WH2<br>Role: AI Architect & Web Developer (BSc Hons)',
    'skills': 'Scanning host...<br>[+] ReactJS, Supabase, NodeJS<br>[+] Python, IoT, MQTT<br>[+] Pentesting & Exploit Dev.',
    'projects': 'Accessing project database...<br>1. TalkGPT - AI Conversational Platform<br>2. N-Traffic Jam - Real-time Traffic Systems<br>3. WH2 Store - Digital Architect Platform<br>Note: Use UI buttons above for full multimedia access.',
    'contact': 'Pinging secure line...<br>Status: Encrypted<br>Phone: +977 9825728982<br>Email: chandanthakur.nep@gmail.com',
    'matrix': 'MATRIX_MODE',
    'darkweb': 'DARKWEB_MODE',
    'roll': 'BARREL_ROLL',
    'play': args[1] === 'snake' ? 'SNAKE_GAME' : 'Usage: <span class="cmd-hit">play snake</span>',
    'sudo': args.join(' ') === 'sudo rm -rf' || args.join(' ') === 'sudo rm -rf /' ? 'SYSTEM_CRASH' : 'Command error. Usage: <span class="cmd-hit">sudo rm -rf /</span>',
    'theme': 'TOGGLE_THEME',
    'hack': args[1] === 'content' ? 'HACK_CONTENT' : 'Command error. Usage: <span class="cmd-hit">hack content</span>',
    'destroy': 'GRAVITY_FALL',
    'refresh': 'SITE_REFRESH',
    'close': 'CLOSE_TAB',
    'exit': 'EXIT_TERMINAL'
  };

  if (command === 'echo') {
    return args.slice(1).join(' ').replace(/</g, "&lt;").replace(/>/g, "&gt;") || '';
  }
  if (command === 'date') {
    return new Date().toLocaleDateString();
  }
  if (command === 'time') {
    return new Date().toLocaleTimeString();
  }
  if (command === 'scroll') {
    const validSections = ['home', 'about', 'resume', 'portfolio', 'services', 'contact'];
    const dir = args[1]?.toLowerCase();
    if (dir === 'down') return 'SCROLL_DOWN';
    if (dir === 'up') return 'SCROLL_UP';
    if (validSections.includes(dir)) return `SCROLL_SECTION|${dir}`;
    return "Usage: <span class=\"cmd-hit\">scroll [up|down|home|about|resume|portfolio|services|contact]</span>";
  }
  if (command === 'color') {
    if (!args[1]) return "Usage: <span class=\"cmd-hit\">color [name/hex]</span> (e.g. color red, color default)";
    const colorVal = args[1].toLowerCase();
    if (colorVal === 'default') return `COLOR_CHANGE|#149ddd`;
    if (/^[a-z]{3,20}$/i.test(colorVal) || /^#([0-9A-F]{3}){1,2}$/i.test(colorVal)) {
      return `COLOR_CHANGE|${colorVal}`;
    }
    return "Invalid color format. Use name or hex.";
  }
  if (command === 'background') {
    if (!args[1]) return "Usage: <span class=\"cmd-hit\">background [name/hex]</span> (e.g. background black, background default)";
    const colorVal = args[1].toLowerCase();
    if (colorVal === 'default') return `BG_CHANGE|default`;
    if (/^[a-z]{3,20}$/i.test(colorVal) || /^#([0-9A-F]{3}){1,2}$/i.test(colorVal)) {
      return `BG_CHANGE|${colorVal}`;
    }
    return "Invalid background format. Use name or hex.";
  }
  if (command === 'call') {
    if (!args[1]) return "Usage: <span class=\"cmd-hit\">call [number]</span>";
    return `CALL_ACTION|${args[1]}`;
  }
  if (command === 'chat') {
    if (!args[1]) return "Usage: <span class=\"cmd-hit\">chat [number]</span>";
    let num = args[1];
    if (!num.startsWith('+')) num = '+977' + num;
    return `CHAT_ACTION|${num}`;
  }
  if (command === 'history') {
    if (commandHistory.length === 0) return 'No commands in history.';
    return commandHistory.join('<br>');
  }

  const res = responses[command];
  if (res) return res;

  // Fuzzy Suggestions
  const allCmds = Object.keys(responses).concat(['echo', 'date', 'time', 'scroll', 'history', 'color', 'background', 'call', 'chat', 'clear']);
  const closest = allCmds.find(c => c.startsWith(command.substring(0, 2)));
  if (closest) {
    return `<span style="color:#ff0000;">[!] Command not found.</span> Did you mean <span class="cmd-hit">${closest}</span>?`;
  }
  return `<span style="color:#ff0000;">[!] Unknown protocol:</span> '${command}'. Type <span class="cmd-hit">help</span> for intel.`;
};

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      termInput.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      termInput.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      termInput.value = '';
    }
  }
});

termInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const cmdStr = termInput.value.trim();
    if (cmdStr === 'clear') {
      termOutput.innerHTML = '';
      termInput.value = '';
      return;
    }

    if (cmdStr) {
      if (commandHistory[commandHistory.length - 1] !== cmdStr) {
        commandHistory.push(cmdStr);
      }
      historyIndex = commandHistory.length;

      termOutput.innerHTML += `<br><span style="color:#fff;">root@wh2:~$</span> ${cmdStr.replace(/</g, "&lt;").replace(/>/g, "&gt;")}<br>`;

      const response = processCommand(cmdStr);

      if (response === 'TOGGLE_THEME') {
        terminal.classList.toggle('light-mode');
        termOutput.innerHTML += 'Terminal visual mode toggled.';
        const bodyObj = document.getElementById('term-body');
        if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;
      } else if (response === 'EXIT_TERMINAL') {
        termOutput.innerHTML += 'Terminating session...';
        setTimeout(() => {
          terminal.style.display = 'none';
          termOutput.innerHTML = 'Authentication: OK\nConnection Established.\nType \'help\' for available commands.';
        }, 800);
      } else if (response === 'SCROLL_DOWN') {
        window.scrollBy({ top: 500, behavior: 'smooth' });
        termOutput.innerHTML += 'Scrolling down...';
      } else if (response === 'SCROLL_UP') {
        window.scrollBy({ top: -500, behavior: 'smooth' });
        termOutput.innerHTML += 'Scrolling up...';
      } else if (response && response.startsWith('SCROLL_SECTION|')) {
        const sec = response.split('|')[1];
        if (sec === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sec);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        termOutput.innerHTML += `Navigating to ${sec}...`;
      } else if (response && response.startsWith('COLOR_CHANGE|')) {
        const hex = response.split('|')[1];

        let dynamicStyle = document.getElementById('dynamic-theme');
        if (!dynamicStyle) {
          dynamicStyle = document.createElement('style');
          dynamicStyle.id = 'dynamic-theme';
          document.head.appendChild(dynamicStyle);
        }

        if (hex.toLowerCase() === '#149ddd' || hex.toLowerCase() === 'default') {
          dynamicStyle.innerHTML = '';
          termOutput.innerHTML += 'System primary color restored to default.';
        } else {
          dynamicStyle.innerHTML = `
            a, a:hover, .nav-menu a:hover i, .nav-menu .active i, .nav-menu .active:focus i, 
            .nav-menu li:hover>a i, .about .content ul i, .facts .count-box i, .portfolio #portfolio-flters li:hover, 
            .portfolio #portfolio-flters li.filter-active, .services .icon-box:hover .icon i, #footer .credits a {
              color: ${hex} !important;
            }
            .back-to-top, .mobile-nav-toggle, #hero p span, .section-title h2::after, .skills .progress-bar, 
            .services .icon, #footer .footer-social-links a:hover, .custom-skill-hover p, #skill-modal-title,
            #submit-btn {
              background: ${hex} !important;
              border-color: ${hex} !important;
            }
            .section-title h2::after { background: ${hex} !important; }
            #hero p span { border-bottom-color: ${hex} !important; }
            .portfolio .portfolio-wrap .portfolio-links a { background: ${hex} !important; opacity: 0.8; }
            .portfolio .portfolio-wrap .portfolio-links a:hover { opacity: 1; }
          `;
          termOutput.innerHTML += `System primary color overridden to ${hex}. Reset on refresh or by typing 'color default'.`;
        }
      } else if (response && response.startsWith('BG_CHANGE|')) {
        const bgVal = response.split('|')[1];

        let dynamicBgStyle = document.getElementById('dynamic-bg');
        if (!dynamicBgStyle) {
          dynamicBgStyle = document.createElement('style');
          dynamicBgStyle.id = 'dynamic-bg';
          document.head.appendChild(dynamicBgStyle);
        }

        if (bgVal === 'default') {
          dynamicBgStyle.innerHTML = '';
          termOutput.innerHTML += 'Background color restored to default.';
        } else {
          dynamicBgStyle.innerHTML = `
            #main {
              background-color: ${bgVal} !important;
            }
            #main section, #main .section-bg {
              background-color: transparent !important;
            }
          `;
          termOutput.innerHTML += `Main body background changed to ${bgVal}. Header and footer preserved.`;
        }
      } else if (response && response.startsWith('CALL_ACTION|')) {
        const num = response.split('|')[1];
        termOutput.innerHTML += `Initiating secure call intercept to ${num}...`;
        setTimeout(() => window.location.href = `tel:${num}`, 800);
      } else if (response && response.startsWith('CHAT_ACTION|')) {
        const num = response.split('|')[1];
        termOutput.innerHTML += `Opening secure chat channel to ${num}...`;
        setTimeout(() => window.open(`https://wa.me/${num.replace('+', '')}`, '_blank'), 800);
      } else if (response === 'HACK_MODE') {
        termInput.disabled = true;
        termOutput.innerHTML += 'Initiating deep scan...<br>';
        let lines = 0;
        const hackInterval = setInterval(() => {
          const randomHex = Math.floor(Math.random() * 0xfffffffff).toString(16).padStart(8, '0');
          const randomIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
          termOutput.innerHTML += `Bypassing node ${randomHex}... [OK] -> IP: ${randomIp}<br>`;
          const bodyObj = document.getElementById('term-body');
          if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;
          lines++;

          if (lines > 6) {
            clearInterval(hackInterval);
            termOutput.innerHTML += '<span class="term-hack-text">Access Denied. Firewall triggered. Connection Intercepted.</span>';
            termInput.disabled = false;
            termInput.focus();
            if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;
          }
        }, 400);
      } else if (response === 'HACK_CONTENT') {
        document.body.contentEditable = true;
        document.body.spellcheck = false;
        termOutput.innerHTML += 'Root access granted. Website DOM is now fully editable. Click anywhere to type.<br>';
      } else if (response === 'GRAVITY_FALL') {
        termOutput.innerHTML += 'Self-destruct sequence initiated...<br>';
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('section, header, footer').forEach(el => el.classList.add('gravity-fall'));
        termInput.disabled = true;
      } else if (response === 'SYSTEM_CRASH') {
        termOutput.innerHTML += 'Critical failure. Deleting root file system...<br>';
        document.body.classList.add('system-crash');
        termInput.disabled = true;

        const hackerOverlay = document.createElement('div');
        hackerOverlay.id = 'hacker-attack-overlay';
        hackerOverlay.innerHTML = '<div class="hacker-text">SYSTEM OVERRIDE INITIATED</div><div class="shatter-glass"></div>';
        document.body.appendChild(hackerOverlay);

        setTimeout(() => {
          hackerOverlay.innerHTML = '<div class="hacker-text" style="font-size:3rem; color:#18d26e;">your system had been deleted</div>';
        }, 3000);

        setTimeout(() => {
          document.body.innerHTML = '';
          document.body.style.backgroundColor = '#000';
          document.documentElement.style.backgroundColor = '#000';
          document.body.classList.remove('system-crash');
        }, 4500);

        setTimeout(() => location.reload(), 10000);
      } else if (response === 'CLOSE_TAB') {
        termOutput.innerHTML += 'Closing terminal connection and browser tab...<br>';
        setTimeout(() => {
          window.location.href = "about:blank"; // Fallback to redirecting to blank if window.close is blocked by browser policies
          window.close();
        }, 800);
      } else if (response === 'SITE_REFRESH') {
        termOutput.innerHTML += 'Refreshing system...<br>';
        setTimeout(() => location.reload(), 500);
      } else if (response === 'BARREL_ROLL') {
        termOutput.innerHTML += 'Doing a barrel roll...<br>';
        document.body.classList.add('barrel-roll');
        setTimeout(() => document.body.classList.remove('barrel-roll'), 2000);
      } else if (response === 'DARKWEB_MODE') {
        document.body.classList.toggle('darkweb-mode');
        termOutput.innerHTML += document.body.classList.contains('darkweb-mode') ? 'Connected to Dark Web. CRT filter engaged.<br>' : 'Disconnected from Dark Web.<br>';
      } else if (response === 'MATRIX_MODE') {
        termOutput.innerHTML += 'Initializing Matrix protocols...<br>';
        if (document.getElementById('matrix-canvas')) {
          document.getElementById('matrix-canvas').remove();
          termOutput.innerHTML += 'Matrix overlay disabled.<br>';
        } else {
          const canvas = document.createElement('canvas');
          canvas.id = 'matrix-canvas';
          document.body.appendChild(canvas);
          const ctx = canvas.getContext('2d');
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~'.split('');
          const fontSize = 16;
          const columns = canvas.width / fontSize;
          const drops = [];
          for (let x = 0; x < columns; x++) drops[x] = 1;
          const drawMatrix = () => {
            if (!document.getElementById('matrix-canvas')) return;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#18d26e';
            ctx.font = fontSize + 'px monospace';
            for (let i = 0; i < drops.length; i++) {
              const text = letters[Math.floor(Math.random() * letters.length)];
              ctx.fillText(text, i * fontSize, drops[i] * fontSize);
              if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
              drops[i]++;
            }
            requestAnimationFrame(drawMatrix);
          };
          drawMatrix();
          window.addEventListener('resize', () => {
            if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
          });
        }
      } else if (response === 'SNAKE_GAME') {
        const scores = JSON.parse(localStorage.getItem('wh2_snake_scores') || '[0,0,0]').sort((a, b) => b - a).slice(0, 3);
        termOutput.innerHTML += `Initializing Snake...<br>Top Scores: ${scores.join(' | ')}<br><br>Select Difficulty:<br>[1] Easy (3 pts)<br>[2] Medium (5 pts)<br>[3] Hard (7 pts)<br>[4] Expert (10 pts)<br>`;
        termInput.disabled = true;

        let selectedDifficulty = 0;
        let pointsPerFood = 0;
        let intervalSpeed = 0;

        const startSnake = (isFullscreen) => {
          const snakeCanvas = document.createElement('canvas');
          snakeCanvas.id = 'snake-game';
          if (isFullscreen) {
            snakeCanvas.style.position = 'fixed';
            snakeCanvas.style.top = '0';
            snakeCanvas.style.left = '0';
            snakeCanvas.style.width = '100vw';
            snakeCanvas.style.height = '100vh';
            snakeCanvas.style.zIndex = '999999';
            snakeCanvas.width = window.innerWidth;
            snakeCanvas.height = window.innerHeight;
            document.body.appendChild(snakeCanvas);
          } else {
            snakeCanvas.width = 300;
            snakeCanvas.height = 150;
            snakeCanvas.style.display = 'block';
            snakeCanvas.style.marginTop = '10px';
            termOutput.appendChild(snakeCanvas);
            const bodyObj = document.getElementById('term-body');
            if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;
          }

          const origOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';

          let blockSize = isFullscreen ? 20 : 10;
          let cw = Math.floor(snakeCanvas.width / blockSize);
          let ch = Math.floor(snakeCanvas.height / blockSize);

          let snake = [{ x: Math.floor(cw / 2), y: Math.floor(ch / 2) }];
          let food = { x: Math.floor(Math.random() * cw), y: Math.floor(Math.random() * ch) };
          let dx = 1; let dy = 0;
          let score = 0;
          let bestScore = scores[0] || 0;
          let snakeLoop;
          const ctx = snakeCanvas.getContext('2d');

          const drawSnake = () => {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

            snake.forEach((part, index) => {
              ctx.fillStyle = index === 0 ? '#ffffff' : '#18d26e';
              ctx.fillRect(part.x * blockSize, part.y * blockSize, blockSize, blockSize);
            });
            ctx.fillStyle = '#fff';
            ctx.font = isFullscreen ? '20px monospace' : '10px monospace';
            ctx.textAlign = 'left';
            ctx.fillText(`Score: ${score} | High: ${bestScore}`, 10, isFullscreen ? 30 : 12);
          };

          const updateSnake = () => {
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            if (head.x < 0 || head.x >= cw || head.y < 0 || head.y >= ch || snake.some(p => p.x === head.x && p.y === head.y)) {
              clearInterval(snakeLoop);

              let currentScores = JSON.parse(localStorage.getItem('wh2_snake_scores') || '[0,0,0]');
              currentScores.push(score);
              currentScores.sort((a, b) => b - a);
              const topScores = currentScores.slice(0, 3);
              localStorage.setItem('wh2_snake_scores', JSON.stringify(topScores));

              ctx.fillStyle = 'rgba(0,0,0,0.85)';
              ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
              ctx.fillStyle = '#ff0000';
              ctx.textAlign = 'center';
              ctx.font = isFullscreen ? '40px monospace' : '18px monospace';
              ctx.fillText('GAME OVER!', snakeCanvas.width / 2, snakeCanvas.height / 2 - 30);

              ctx.fillStyle = '#fff';
              ctx.font = isFullscreen ? '20px monospace' : '10px monospace';
              ctx.fillText(`Final Score: ${score}`, snakeCanvas.width / 2, snakeCanvas.height / 2);
              ctx.fillText(`Top 3: ${topScores.join(' | ')}`, snakeCanvas.width / 2, snakeCanvas.height / 2 + 20);

              ctx.fillStyle = '#18d26e';
              ctx.font = isFullscreen ? '22px monospace' : '11px monospace';
              ctx.fillText('Press [R] to Play Again', snakeCanvas.width / 2, snakeCanvas.height / 2 + 50);
              ctx.fillText('Press [B] to Exit to Terminal', snakeCanvas.width / 2, snakeCanvas.height / 2 + (isFullscreen ? 80 : 65));

              const endListener = (e) => {
                const key = e.key.toLowerCase();
                if (key === 'r') {
                  document.removeEventListener('keydown', endListener);
                  if (snakeCanvas.parentNode) snakeCanvas.parentNode.removeChild(snakeCanvas);
                  startSnake(isFullscreen);
                } else if (key === 'b' || key === 'escape') {
                  document.removeEventListener('keydown', endListener);
                  if (snakeCanvas.parentNode) snakeCanvas.parentNode.removeChild(snakeCanvas);
                  document.body.style.overflow = origOverflow;
                  termInput.disabled = false;
                  termInput.focus();
                  termOutput.innerHTML += '> Game session terminated.<br>';
                  const bodyObj = document.getElementById('term-body');
                  if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;
                }
              };
              document.addEventListener('keydown', endListener);
              return;
            }
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
              score += pointsPerFood;
              if (score > bestScore) bestScore = score;
              food = { x: Math.floor(Math.random() * cw), y: Math.floor(Math.random() * ch) };
            } else {
              snake.pop();
            }
            drawSnake();
          };

          snakeLoop = setInterval(updateSnake, intervalSpeed);

          const handleKey = (e) => {
            if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; e.preventDefault(); }
            if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; e.preventDefault(); }
            if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; e.preventDefault(); }
            if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; e.preventDefault(); }
            if (e.key.toLowerCase() === 'q' || e.key === 'Escape') {
              clearInterval(snakeLoop);
              document.removeEventListener('keydown', handleKey);
              if (snakeCanvas.parentNode) snakeCanvas.parentNode.removeChild(snakeCanvas);
              document.body.style.overflow = origOverflow;
              termInput.disabled = false;
              termInput.focus();
            }
          };
          setTimeout(() => document.addEventListener('keydown', handleKey), 100);
        };

        const displayModeListener = (e) => {
          if (e.key === '1' || e.key === '2') {
            e.preventDefault();
            document.removeEventListener('keydown', displayModeListener);
            startSnake(e.key === '2');
          }
        };

        const diffListener = (e) => {
          if (['1', '2', '3', '4'].includes(e.key)) {
            e.preventDefault();
            selectedDifficulty = parseInt(e.key);
            document.removeEventListener('keydown', diffListener);

            if (selectedDifficulty === 1) { pointsPerFood = 3; intervalSpeed = 150; }
            else if (selectedDifficulty === 2) { pointsPerFood = 5; intervalSpeed = 100; }
            else if (selectedDifficulty === 3) { pointsPerFood = 7; intervalSpeed = 60; }
            else if (selectedDifficulty === 4) { pointsPerFood = 10; intervalSpeed = 35; }

            termOutput.innerHTML += `Press [1] to play in Terminal<br>Press [2] to play Fullscreen<br>`;
            const bodyObj = document.getElementById('term-body');
            if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;

            document.addEventListener('keydown', displayModeListener);
          }
        };
        document.addEventListener('keydown', diffListener);
      } else {
        const responseContainer = document.createElement('span');
        termOutput.appendChild(responseContainer);
        typeText(responseContainer, response, 15);
      }
    }

    termInput.value = '';
    const bodyObj = document.getElementById('term-body');
    if (bodyObj) bodyObj.scrollTop = bodyObj.scrollHeight;
  }
});

// --- 3. Voice Synthesizer & Recognition ---
const startVoiceRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const voiceTrigger = document.getElementById('voice-trigger');
  if (!SpeechRecognition || !voiceTrigger) return;

  const recognition = new SpeechRecognition();
  recognition.continuous = false; // Listen for a single command
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  voiceTrigger.addEventListener('click', () => {
    if (voiceTrigger.classList.contains('listening')) return;

    voiceTrigger.classList.add('listening');
    voiceTrigger.querySelector('span').innerText = 'Listening...';

    try {
      recognition.start();
    } catch (e) {
      console.log('Voice recognition already started', e);
    }
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    const cleanTranscript = transcript.replace(/[.,!?]/g, '');

    if (cleanTranscript.includes('hello chandan') || cleanTranscript.includes('chandan thakur')) {
      const msg = new SpeechSynthesisUtterance("Hi, How are you?");
      msg.rate = 0.8;
      msg.pitch = 1;
      msg.volume = 1;
      window.speechSynthesis.speak(msg);

      // Open Terminal
      if (terminal) {
        terminal.style.display = 'flex';
        setTimeout(() => termInput.focus(), 100);
      }
    }
  };

  recognition.onerror = (e) => {
    console.log('Speech recognition error', e);
    voiceTrigger.classList.remove('listening');
    voiceTrigger.querySelector('span').innerText = 'Say Hello';
  };

  recognition.onend = () => {
    voiceTrigger.classList.remove('listening');
    voiceTrigger.querySelector('span').innerText = 'Say Hello';
  };
};

// Initialize voice listener
startVoiceRecognition();

