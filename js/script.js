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
});
