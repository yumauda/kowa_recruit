const drawerButton = document.querySelector('.js-drawer-button');
const drawer = document.querySelector('.js-drawer');

if (drawerButton && drawer) {
  const closeDrawer = () => {
    drawerButton.classList.remove('is-active');
    drawer.classList.remove('is-active');
    drawerButton.setAttribute('aria-expanded', 'false');
    drawerButton.setAttribute('aria-label', 'メニューを開く');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.inert = true;
    document.body.classList.remove('no-scroll');
  };

  const openDrawer = () => {
    drawerButton.classList.add('is-active');
    drawer.classList.add('is-active');
    drawerButton.setAttribute('aria-expanded', 'true');
    drawerButton.setAttribute('aria-label', 'メニューを閉じる');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.inert = false;
    document.body.classList.add('no-scroll');
  };

  drawerButton.addEventListener('click', () => {
    if (drawerButton.classList.contains('is-active')) {
      closeDrawer();
      return;
    }

    openDrawer();
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) closeDrawer();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawer();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeDrawer();
  });
}

const careerTabs = document.querySelectorAll('.js-career-tab');

careerTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(`#career-${tab.dataset.career}`);
    if (!target) return;

    careerTabs.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.p-career-plan__panel').forEach((panel) => {
      panel.classList.remove('is-active');
      panel.hidden = true;
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    target.classList.add('is-active');
    target.hidden = false;
  });

  tab.addEventListener('keydown', (event) => {
    const currentIndex = [...careerTabs].indexOf(tab);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % careerTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + careerTabs.length) % careerTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = careerTabs.length - 1;
    if (nextIndex === currentIndex) return;

    event.preventDefault();
    careerTabs[nextIndex].focus();
    careerTabs[nextIndex].click();
  });
});

const countUpElements = document.querySelectorAll('.js-count-up');

if (countUpElements.length > 0) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = 2000;
  const easing = (progress) => (progress === 1 ? 1 : 1 - 2 ** (-10 * progress));

  const animateCount = (element) => {
    if (element.dataset.countUpComplete === 'true') return;

    const target = Number(element.dataset.countUp);
    const startTime = performance.now();
    element.dataset.countUpComplete = 'true';

    element.animate(
      [
        { opacity: 0.35, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 800,
        easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
        fill: 'both',
      },
    );

    const update = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.textContent = String(progress === 1 ? target : Math.floor(target * easing(progress)));

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  if (!prefersReducedMotion) {
    countUpElements.forEach((element) => {
      const digitCount = element.dataset.countUp.length;
      element.style.setProperty('--count-up-width', `${digitCount}ch`);
      element.textContent = '0';
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            animateCount(entry.target);
            observer.unobserve(entry.target);
          });
        },
        {
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.35,
        },
      );

      countUpElements.forEach((element) => observer.observe(element));
    } else {
      countUpElements.forEach(animateCount);
    }
  }
}
