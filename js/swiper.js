import Swiper from 'swiper/bundle';

const interviewSwiperElement = document.querySelector('.js-interview-swiper');

if (interviewSwiperElement) {
  const previousButtons = document.querySelectorAll('.js-interview-prev');
  const nextButtons = document.querySelectorAll('.js-interview-next');
  const interviewWrapper = interviewSwiperElement.querySelector('.swiper-wrapper');
  const sourceSlides = interviewWrapper.querySelectorAll('.swiper-slide');

  sourceSlides.forEach((slide, index) => {
    slide.dataset.interviewIndex = index.toString();
    const clonedSlide = slide.cloneNode(true);
    clonedSlide.dataset.interviewIndex = index.toString();
    interviewWrapper.append(clonedSlide);
  });

  const interviewSwiper = new Swiper(interviewSwiperElement, {
    a11y: {
      enabled: true,
      containerMessage: '先輩社員インタビュー一覧',
      slideLabelMessage: '{{index}} / {{slidesLength}}',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    slidesPerView: 2,
    spaceBetween: 12,
    speed: 600,
    loop: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 60,
      },
    },
  });

  const updateInterviewNavigation = () => {
    previousButtons.forEach((button) => {
      button.disabled = interviewSwiper.isLocked;
    });
    nextButtons.forEach((button) => {
      button.disabled = interviewSwiper.isLocked;
    });
  };

  const updateInterviewAccessibility = () => {
    interviewSwiper.slides.forEach((slide) => {
      const isVisible = slide.classList.contains('swiper-slide-visible');
      slide.setAttribute('aria-hidden', String(!isVisible));
      slide.tabIndex = isVisible ? 0 : -1;
    });
  };

  previousButtons.forEach((button) => {
    button.addEventListener('click', () => interviewSwiper.slidePrev());
  });
  nextButtons.forEach((button) => {
    button.addEventListener('click', () => interviewSwiper.slideNext());
  });
  interviewSwiper.on('slideChange lock unlock resize breakpoint', updateInterviewNavigation);
  interviewSwiper.on('slideChange transitionEnd update resize breakpoint', updateInterviewAccessibility);
  updateInterviewNavigation();
  updateInterviewAccessibility();
}
