// Main JavaScript for lemi landing v2

  document.addEventListener('DOMContentLoaded', function () {
    // Modal functionality
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const reserveCallBtn = document.getElementById('reserveCallBtn');
    const heroReserveBtn = document.getElementById('heroReserveBtn');
    const solutionReserveBtn = document.getElementById('solutionReserveBtn');
    const benefitsReserveBtn = document.getElementById('benefitsReserveBtn');
    const testimonialsReserveBtn = document.getElementById('testimonialsReserveBtn');
    const finalCtaBtn = document.getElementById('finalCtaBtn');
    const reservationForm = document.getElementById('reservationForm');
    const discoverMoreBtn = document.getElementById('discoverMoreBtn');
    const problemCtaBtn = document.getElementById('problemCtaBtn');
    const solutionCtaBtn = document.getElementById('solutionCtaBtn');
    const solutionCtaBtn2 = document.getElementById('solutionCtaBtn2');
    const heroSolutionBtn = document.getElementById('heroSolutionBtn');
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const benefitsTrack = document.querySelector('.benefits-track');
    const benefitSlides = document.querySelectorAll('.benefit-slide');
    const benefitDots = document.querySelectorAll('.benefit-dot');
    const benefitsPrev = document.querySelector('.benefits-prev');
    const benefitsNext = document.querySelector('.benefits-next');
    let benefitIndex = 0;

    if (scrollElements.length) {
      if ('IntersectionObserver' in window) {
        const scrollObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.2,
          rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(el => scrollObserver.observe(el));
      } else {
        scrollElements.forEach(el => el.classList.add('in-view'));
      }
    }

    function updateBenefitCarousel(index) {
      if (!benefitsTrack) return;
      const total = benefitSlides.length;
      benefitIndex = (index + total) % total;
      benefitsTrack.style.transform = `translateX(-${benefitIndex * 100}%)`;
      benefitDots.forEach((dot, dotIndex) => {
        dot.classList.toggle('active', dotIndex === benefitIndex);
      });
    }

    if (benefitsTrack) {
      updateBenefitCarousel(0);
      if (benefitsPrev) benefitsPrev.addEventListener('click', () => updateBenefitCarousel(benefitIndex - 1));
      if (benefitsNext) benefitsNext.addEventListener('click', () => updateBenefitCarousel(benefitIndex + 1));
      benefitDots.forEach(dot => {
        dot.addEventListener('click', () => {
          const dotIndex = Number(dot.dataset.index || 0);
          updateBenefitCarousel(dotIndex);
        });
      });

      let benefitTimer = setInterval(() => updateBenefitCarousel(benefitIndex + 1), 7000);

      const resetBenefitTimer = () => {
        clearInterval(benefitTimer);
        benefitTimer = setInterval(() => updateBenefitCarousel(benefitIndex + 1), 7000);
      };

      [benefitsPrev, benefitsNext, ...benefitDots].forEach(ctrl => {
        if (!ctrl) return;
        ctrl.addEventListener('click', resetBenefitTimer);
      });
    }

    // Open modal function
    function openModal() {
      modal.classList.remove('hidden');
      setTimeout(() => {
        modalOverlay.classList.add('active');
      }, 10);
      document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
      modalOverlay.classList.remove('active');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 300);
      document.body.style.overflow = 'auto';
    }

    // Event listeners for opening modal
    if (reserveCallBtn) reserveCallBtn.addEventListener('click', openModal);
    if (heroReserveBtn) heroReserveBtn.addEventListener('click', openModal);
    if (solutionReserveBtn) solutionReserveBtn.addEventListener('click', openModal);
    if (benefitsReserveBtn) benefitsReserveBtn.addEventListener('click', openModal);
    if (testimonialsReserveBtn) testimonialsReserveBtn.addEventListener('click', openModal);
    if (finalCtaBtn) finalCtaBtn.addEventListener('click', openModal);
    if (discoverMoreBtn) discoverMoreBtn.addEventListener('click', openModal);
    if (problemCtaBtn) problemCtaBtn.addEventListener('click', openModal);
    if (solutionCtaBtn) solutionCtaBtn.addEventListener('click', openModal);
    if (solutionCtaBtn2) solutionCtaBtn2.addEventListener('click', openModal);
    if (heroSolutionBtn) heroSolutionBtn.addEventListener('click', openModal);

    // Event listeners for closing modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Form submission - Envío por WhatsApp
    if (reservationForm) {
      reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          company: document.getElementById('company').value,
          message: document.getElementById('message').value
        };

        // Crear mensaje para WhatsApp
        const whatsappMessage = `
            ¡Hola! Me interesa la financiación para mi empresa:

            *Nombre:* ${formData.name}
            *Email:* ${formData.email}
            *Teléfono:* ${formData.phone}
            *Empresa:* ${formData.company}
            *Mensaje:* ${formData.message || 'Sin mensaje adicional'}

            Por favor, contáctenme para agendar una llamada.`;

        // Codificar el mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Número de WhatsApp (reemplaza con tu número)
        const phoneNumber = '34617434266'; // Formato internacional sin +

        // Crear URL de WhatsApp
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');

        // Mostrar mensaje de confirmación
        alert('¡Redirigiendo a WhatsApp! Un especialista se pondrá en contacto contigo.');

        // Close modal and reset form
        closeModal();
        reservationForm.reset();
      });
    }
    // WhatsApp float button functionality
    const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');

    if (whatsappFloatBtn) {
      whatsappFloatBtn.setAttribute('aria-label', 'Habla con Lemi por WhatsApp');
    }
    // FAQ functionality
    const faqs = [
      {
        question: "¿Qué documentación necesito para iniciar la solicitud?",
        subtitle: "Checklist guiado 100% digital",
        answer: "Solo necesitas CIF o NIF, escrituras vigentes, últimas cuentas anuales. Nuestro equipo valida la consistencia antes de compartirla con las entidades."
      },
      {
        question: "¿Cuánto se tarda en conseguir una respuesta?",
        subtitle: "Primer feedback en 24-72 h",
        answer: "Enviamos tu expediente y recibimos pre-respuestas en horas, te mantenemos al tanto. Las propuestas finales dependen de cada banco."
      },
      {
        question: "¿Trabajan con empresas en toda España?",
        subtitle: "Cobertura nacional y remota",
        answer: "Sí, acompañamos a pymes y scaleups en cualquier comunidad autónoma. Coordinamos reuniones virtuales con bancos nacionales y también con financiadores regionales que operan en tu sector."
      },
      {
        question: "¿Puedo combinar financiación bancaria y alternativa?",
        subtitle: "Estructuras híbridas personalizadas",
        answer: "Diseñamos combinaciones de préstamo bancario, venture debt, leasing o líneas de circulante para equilibrar coste y flexibilidad. Nos aseguramos de que cada producto encaje con tu flujo de caja."
      },
      {
        question: "¿Tiene algún coste anticipado usar Lemi?",
        subtitle: "Modelo success fee",
        answer: "No pagas por registrarte. Solo aplicamos honorarios sobre la financiación conseguida y conoces el importe desde el inicio."
      }
    ];

    const faqsContainer = document.getElementById('faqsContainer');

    if (faqsContainer) {
      faqs.forEach((faq, index) => {
        const faqElement = document.createElement('div');
        faqElement.className = 'faq-item';
        faqElement.innerHTML = `
                <button type="button" class="faq-question" id="faq-question-${index}" aria-expanded="false">
                    <div class="flex items-start gap-4">
                        <span class="faq-number">${String(index + 1).padStart(2, '0')}</span>
                        <div>
                            <span class="faq-question-title">${faq.question}</span>
                            ${faq.subtitle ? `<p class="faq-question-subtitle">${faq.subtitle}</p>` : ''}
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${faq.answer}</p>
                </div>
            `;

        faqsContainer.appendChild(faqElement);

        // Add click event to toggle FAQ answer
        const questionEl = document.getElementById(`faq-question-${index}`);
        const answerEl = document.getElementById(`faq-answer-${index}`);

        questionEl.addEventListener('click', () => {
          answerEl.classList.toggle('active');
          const isOpen = answerEl.classList.contains('active');
          questionEl.setAttribute('aria-expanded', isOpen);
          faqElement.classList.toggle('active', isOpen);

          // Rotate icon
          const icon = questionEl.querySelector('svg');
          icon.classList.toggle('transform', isOpen);
          icon.classList.toggle('rotate-180', isOpen);
        });
      });
    }

    // Navigation scroll effect
    const nav = document.querySelector('nav');
    const financingCtaBtn = document.getElementById('financingCtaBtn');
    if (financingCtaBtn) financingCtaBtn.addEventListener('click', openModal);
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const navHeight = nav.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Animation on scroll
    function initAnimations() {
      const animatedElements = document.querySelectorAll('.card-hover, .progress-bar');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      }, {
        threshold: 0.1
      });

      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }

    initAnimations();
    });

      // === Sistema Legal (Modales + Cookies) ===
    // Funciones modales para secciones legales
    window.openModal = function (id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    };

    window.closeModal = function (id) {
      const modal = document.getElementById(id);
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    };

// === Sistema Legal: Cookies conforme normativa 2025 ===
const cookieBanner = document.getElementById('cookieBanner');
const acceptBtn = document.getElementById('acceptCookiesBtn');
const rejectBtn = document.getElementById('rejectCookiesBtn');

if (cookieBanner && acceptBtn && rejectBtn) {
  // Ver si el usuario ya tomó una decisión
  const cookieConsent = localStorage.getItem('cookieConsent');

  if (!cookieConsent) {
    cookieBanner.classList.remove('hidden');
  } else {
    cookieBanner.remove();
  }

  // Aceptar todas las cookies
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.remove();
    enableAnalyticsCookies(); // activa scripts analíticos o de terceros
  });

  // Rechazar todas las cookies
  rejectBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'rejected');
    cookieBanner.remove();
    disableAnalyticsCookies();
  });
      // Legal Modal Functionality
    const legalLinks = document.querySelectorAll('.legal-link');
    const modalLegal = document.getElementById('modal-legal');
    const modalOverlayLegal = document.getElementById('modalOverlayLegal');
    const closeModalLegalBtn = document.getElementById('closeModalLegalBtn');
    const acceptLegalBtn = document.getElementById('acceptLegalBtn');
    const legalContent = document.getElementById('legal-content');
    const modalLegalTitle = document.getElementById('modal-legal-title');

    // Legal documents content
    const legalDocuments = {
      'aviso': {
        title: 'Aviso Legal - Términos de Servicio',
        content: `
          <h2>AVISO LEGAL</h2>
          <p><strong>Denominación Social:</strong> Lemi Finance S.L.<br>
          <strong>CIF:</strong> B1235778<br>
          <strong>Domicilio Social:</strong> Calle Mestre Sanchis Almiñano 8, 4º piso<br>
          <strong>Correo electrónico:</strong> info@lemi.es<br>
          <strong>Web:</strong> www.lemi.es</p>

          <h3>1. Objeto</h3>
          <p>1.1. Lemi Finance S.L. (en adelante, <em>el prestador</em>), responsable del sitio web, pone a disposición de los usuarios el presente documento, con el que pretende dar cumplimiento a las obligaciones dispuestas en la Ley 34/2002, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), así como informar a todos los usuarios del sitio web respecto a las condiciones de uso del mismo.</p>
          <p>1.2. Toda persona que acceda a este sitio web y utilice sus servicios, o facilite sus datos, asume el papel de usuario, comprometiéndose a la observancia y cumplimiento riguroso de las disposiciones aquí contenidas, así como a cualesquiera otra disposición legal que fuera de aplicación.</p>
          
          <h3>2. Identidad de las partes</h3>
          <p>2.1. Por una parte, el prestador, identificado más arriba.<br>
          2.2. Por otra, el usuario, registrado en el sitio web y que será responsable de la veracidad de los datos personales facilitados al prestador.</p>
          
          <h3>3. Obligaciones del usuario</h3>
          <p>3.1. El usuario será responsable del tratamiento confidencial y la adecuada custodia de sus contraseñas, evitando el acceso de terceras personas no autorizadas.</p>
          
          <h3>8. Legislación y jurisdicción</h3>
          <p>8.1. La ley aplicable en caso de disputa o conflicto de interpretación de los términos de estas Condiciones de Uso, así como cualquier cuestión relacionada con los servicios del Portal, será la ley española.<br>
          8.2. Para la resolución de cualquier controversia que pudiera surgir con ocasión del uso del Portal y sus servicios, las partes acuerdan someterse a la jurisdicción de los jueces y tribunales de la ciudad de Barcelona.</p>
        `
      },
      'privacidad': {
        title: 'Política de Privacidad',
        content: `
          <h2>POLÍTICA DE PRIVACIDAD</h2>
          
          <h3>1. Protección de datos</h3>
          <p>1.1. El prestador se encuentra profundamente comprometido con el cumplimiento de la normativa española y europea de protección de datos de carácter personal, en especial el <strong>Reglamento (UE) 2016/679 (RGPD)</strong> y la <strong>Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD)</strong>, garantizando la implementación de las medidas de seguridad correspondientes.</p>
          <p>1.2. Mediante la marcación de las correspondientes casillas en los formularios de recogida de datos del sitio web, los usuarios aceptan expresamente y de forma libre e inequívoca que sus datos personales sean tratados por parte del prestador para las finalidades indicadas en cada caso.</p>
          <p>1.3. Las finalidades principales del tratamiento serán: atender solicitudes de información o contacto, gestionar consultas, prestar servicios de consultoría financiera y estratégica, facilitar la adquisición de archivos programados de índole financiera, así como asisitir o vender cursos y manuales relacionados con actividades empresariales y financieras.</p>
          <p>1.4. El usuario podrá ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de los datos, remitiendo una solicitud expresa, junto a copia de su DNI, a la dirección: <strong>Calle Mestre Sanchis Almiñano 8, 4º piso</strong>, o al correo electrónico: <strong>info@lemi.es</strong>.</p>
        `
      },
      'cookies': {
        title: 'Política de Cookies',
        content: `
          <h2>Política de Cookies</h2>
          
          <h3>1. ¿Qué son las cookies?</h3>
          <p>Las cookies son archivos que se descargan en su dispositivo al acceder a determinadas páginas web. Permiten, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo, y dependiendo de la información que contengan y de cómo utilice su equipo, pueden usarse para reconocer al usuario.</p>
          <p>El navegador del usuario almacena cookies en el disco duro únicamente durante la sesión actual, ocupando un espacio mínimo y sin perjudicar al ordenador. La mayoría se borran automáticamente al finalizar la sesión (cookies de sesión).</p>
          
          <h3>2. Tipos de cookies utilizadas en este sitio web</h3>
          <ul>
            <li><strong>Cookies técnicas</strong>: permiten la navegación y el uso de las diferentes opciones o servicios del sitio.</li>
            <li><strong>Cookies de personalización</strong>: permiten acceder al servicio con características predefinidas.</li>
            <li><strong>Cookies de análisis</strong>: permiten cuantificar el número de usuarios y analizar su uso del sitio.</li>
            <li><strong>Cookies publicitarias</strong>: gestionan los espacios publicitarios del sitio.</li>
            <li><strong>Cookies de publicidad comportamental</strong>: almacenan información del comportamiento de los usuarios.</li>
          </ul>
          
          <h3>5. Contacto</h3>
          <p>Si tiene dudas sobre esta Política de Cookies, puede ponerse en contacto con nosotros en:<br>
          <strong>info@lemi.es</strong></p>
        `
      }
    };

    // Open legal modal function
    function openLegalModal(legalType) {
      if (legalDocuments[legalType]) {
        modalLegalTitle.textContent = legalDocuments[legalType].title;
        legalContent.innerHTML = legalDocuments[legalType].content;
        modalLegal.classList.remove('hidden');
        setTimeout(() => {
          modalOverlayLegal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
      }
    }

    // Close legal modal function
    function closeLegalModal() {
      modalOverlayLegal.classList.remove('active');
      setTimeout(() => {
        modalLegal.classList.add('hidden');
      }, 300);
      document.body.style.overflow = 'auto';
    }

    // Event listeners for legal links
    legalLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const legalType = this.getAttribute('data-legal-type');
        openLegalModal(legalType);
      });
    });

    // Event listeners for closing legal modal
    if (closeModalLegalBtn) closeModalLegalBtn.addEventListener('click', closeLegalModal);
    if (modalOverlayLegal) modalOverlayLegal.addEventListener('click', closeLegalModal);
    if (acceptLegalBtn) acceptLegalBtn.addEventListener('click', closeLegalModal);
  
}

     // 🔚 CIERRA EL DOMContentLoaded

  // Mobile menu functionality
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('open');

      // Cambiar icono del botón
      const icon = mobileMenuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('hidden')) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      }
    });

    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('open');
        mobileMenuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
      });
    });
    // CIF/NIF validation function
    function validateCIF(cif) {
      // Eliminar espacios y convertir a mayúsculas
      cif = cif.trim().toUpperCase();

      // Patrón para CIF (Letra + 7 u 8 números)
      const cifPattern = /^[ABCDEFGHJNPQRSUVW]{1}\d{7}[\dJ]$/;

      // Patrón para NIF (8 números + Letra)
      const nifPattern = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/;

      // Validar formato
      if (!cifPattern.test(cif) && !nifPattern.test(cif)) {
        return false;
      }

      return true;
    }
  }
