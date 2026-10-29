const countUpElements = document.querySelectorAll('.js-count-up');
const countUpReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (countUpElements.length > 0 && !countUpReducedMotion) {
  const delays = [0.4, 0.2, 0.05, 0];

  countUpElements.forEach((element) => {
    const target = element.dataset.countUp;
    const accessibleValue = document.createElement('span');
    accessibleValue.className = 'js-count-up__accessible';
    accessibleValue.textContent = target;
    element.textContent = '';
    element.append(accessibleValue);

    [...target].forEach((digit, index) => {
      const digitWrap = document.createElement('span');
      const rail = document.createElement('span');
      const targetDigit = Number(digit);
      digitWrap.className = 'js-count-up__digit';
      digitWrap.setAttribute('aria-hidden', 'true');
      rail.className = 'js-count-up__rail';
      rail.style.setProperty('--count-up-delay', `${delays[index] ?? 0}s`);

      const railLength = targetDigit === 0 ? 10 : 9;

      for (let offset = 0; offset < railLength; offset += 1) {
        const label = document.createElement('span');
        label.className = 'js-count-up__label';
        label.textContent = String(
          targetDigit === 0 ? offset : ((targetDigit - 1 + offset) % 9) + 1,
        );
        rail.append(label);
      }

      digitWrap.append(rail);
      element.append(digitWrap);
    });

    element.classList.add('is-count-ready');
  });

  if ('IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-view');
          countObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    countUpElements.forEach((element) => countObserver.observe(element));
  } else {
    countUpElements.forEach((element) => element.classList.add('is-view'));
  }
}
