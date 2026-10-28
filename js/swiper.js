import Swiper from 'swiper/bundle';

const initializeInterviewSwiper = ({
  selector,
  previousButtonSelector,
  nextButtonSelector,
  containerMessage,
  mobileSpaceBetween,
  desktopSpaceBetween,
}) => {
  const interviewSwiperElement = document.querySelector(selector);

  if (!interviewSwiperElement) return;

  const sliderSection = interviewSwiperElement.closest('section') ?? document;
  const previousButtons = sliderSection.querySelectorAll(previousButtonSelector);
  const nextButtons = sliderSection.querySelectorAll(nextButtonSelector);
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
      containerMessage,
      slideLabelMessage: '{{index}} / {{slidesLength}}',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    slidesPerView: 2,
    spaceBetween: mobileSpaceBetween,
    speed: 600,
    loop: true,
    watchSlidesProgress: true,
    watchOverflow: true,
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: desktopSpaceBetween,
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

      if (slide.matches('a, button')) {
        slide.tabIndex = isVisible ? 0 : -1;
      }
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
};

initializeInterviewSwiper({
  selector: '.js-interview-swiper',
  previousButtonSelector: '.js-interview-prev',
  nextButtonSelector: '.js-interview-next',
  containerMessage: '先輩社員インタビュー一覧',
  mobileSpaceBetween: 12,
  desktopSpaceBetween: 60,
});

initializeInterviewSwiper({
  selector: '.js-more-interview-swiper',
  previousButtonSelector: '.js-more-interview-prev',
  nextButtonSelector: '.js-more-interview-next',
  containerMessage: '他のインタビュー一覧',
  mobileSpaceBetween: 18,
  desktopSpaceBetween: 70,
});
