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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const openingTargets = document.querySelectorAll(
    '.js-header, .p-home-hero__content, .p-home-hero__image, .p-page-hero__content, .p-page-hero__image, .p-interview-hero__copy, .p-interview-hero > figure, .p-recruit-person__heading',
  );

  openingTargets.forEach((element) => {
    if (element.classList.contains('js-header')) {
      element.classList.add('js-opening-header');
      return;
    }

    if (element.matches('figure, [class$="__image"]')) {
      element.classList.add('js-opening-clip');
      return;
    }

    element.classList.add('js-opening-fade');
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      openingTargets.forEach((element) => element.classList.add('is-view'));
    });
  });

  const fadeCandidates = [
    ...document.querySelectorAll(
      'main section [class$="__heading"], main section [class$="__content"], main section article, main section a[class*="__card"], main section div[class*="__card"], main section dl, main section table, main section h2, main section h3',
    ),
  ];
  const fadeTargets = fadeCandidates.filter((element, index, candidates) => {
    if (element.closest('.p-home-hero, .p-page-hero, .p-interview-hero')) return false;
    if (element.classList.contains('p-recruit-person__heading')) return false;

    return !candidates.some((candidate, candidateIndex) => (
      candidateIndex !== index && candidate.contains(element)
    ));
  });
  const clipTargets = [...document.querySelectorAll('main section figure')].filter((element) => (
    !element.closest('.p-home-hero, .p-page-hero, .p-interview-hero')
  ));

  fadeTargets.forEach((element) => element.classList.add('js-scroll-fade'));
  clipTargets.forEach((element) => {
    element.classList.add('js-scroll-clip');
  });

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-view');
          fadeObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.01,
      },
    );
    const clipGroups = new Map();

    fadeTargets.forEach((element) => fadeObserver.observe(element));
    clipTargets.forEach((element) => {
      const observerTarget = element.parentElement;
      const targets = clipGroups.get(observerTarget) ?? [];
      targets.push(element);
      clipGroups.set(observerTarget, targets);
    });

    const clipObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          clipGroups.get(entry.target).forEach((element) => element.classList.add('is-view'));
          clipObserver.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.01,
      },
    );

    clipGroups.forEach((targets, observerTarget) => clipObserver.observe(observerTarget));
  } else {
    fadeTargets.forEach((element) => element.classList.add('is-view'));
    clipTargets.forEach((element) => element.classList.add('is-view'));
  }
}
