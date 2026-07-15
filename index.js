(function () {
	const carousel = document.getElementById('projectsCarousel');
	const dotsContainer = document.getElementById('projectsCarouselDots');
	if (!carousel) return;

	const track = carousel.querySelector('.projects-carousel-track');
	const slides = [...carousel.querySelectorAll('.projects-carousel-slide')];
	const prevBtn = document.querySelector('.projects-carousel-btn-prev');
	const nextBtn = document.querySelector('.projects-carousel-btn-next');

	let currentIndex = 0;

	function getSlidesPerView() {
		if (window.innerWidth >= 992) return 3;
		if (window.innerWidth >= 768) return 2;
		return 1;
	}

	function getMaxIndex() {
		return Math.max(0, slides.length - getSlidesPerView());
	}

	function getPageCount() {
		return getMaxIndex() + 1;
	}

	function buildDots() {
		if (!dotsContainer) return;
		dotsContainer.innerHTML = '';
		const pageCount = getPageCount();

		for (let i = 0; i < pageCount; i++) {
			const dot = document.createElement('button');
			dot.type = 'button';
			dot.className = 'projects-carousel-dot' + (i === currentIndex ? ' active' : '');
			dot.setAttribute('aria-label', 'Go to project slide ' + (i + 1));
			dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
			dot.addEventListener('click', function () {
				currentIndex = i;
				updateCarousel();
			});
			dotsContainer.appendChild(dot);
		}
	}

	function updateCarousel() {
		const slidesPerView = getSlidesPerView();
		const maxIndex = getMaxIndex();

		if (currentIndex > maxIndex) {
			currentIndex = maxIndex;
		}

		const slideWidth = carousel.clientWidth / slidesPerView;
		slides.forEach(function (slide) {
			slide.style.flexBasis = slideWidth + 'px';
			slide.style.maxWidth = slideWidth + 'px';
		});

		track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';

		if (prevBtn) prevBtn.disabled = currentIndex === 0;
		if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;

		if (dotsContainer) {
			const dots = dotsContainer.querySelectorAll('.projects-carousel-dot');
			if (dots.length !== getPageCount()) {
				buildDots();
			} else {
				dots.forEach(function (dot, i) {
					dot.classList.toggle('active', i === currentIndex);
					dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
				});
			}
		}
	}

	if (prevBtn) {
		prevBtn.addEventListener('click', function () {
			if (currentIndex > 0) {
				currentIndex--;
				updateCarousel();
			}
		});
	}

	if (nextBtn) {
		nextBtn.addEventListener('click', function () {
			if (currentIndex < getMaxIndex()) {
				currentIndex++;
				updateCarousel();
			}
		});
	}

	let resizeTimer;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(updateCarousel, 150);
	});

	buildDots();
	updateCarousel();
})();
