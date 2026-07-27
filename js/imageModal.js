// Image gallery modal: click a portfolio thumbnail to see it enlarged
// alongside its project title/description, with prev/next through
// any other images sharing the same data-gallery value.
(function () {
	var modal, imgEl, countEl, titleEl, descEl, prevBtn, nextBtn;
	var currentImages = [];
	var currentIndex = 0;
	var lastFocusedEl = null;

	function galleryImages(key) {
		var links = document.querySelectorAll('.gallery-link[data-gallery="' + key + '"]');
		return Array.prototype.map.call(links, function (link) {
			return { href: link.getAttribute('href'), alt: link.querySelector('img') ? link.querySelector('img').alt : '' };
		});
	}

	function openModal(link) {
		var key = link.getAttribute('data-gallery');
		currentImages = galleryImages(key);
		currentIndex = Array.prototype.indexOf.call(
			document.querySelectorAll('.gallery-link[data-gallery="' + key + '"]'),
			link
		);

		var block = link.closest('.blockStyles');
		titleEl.textContent = block && block.querySelector('h4') ? block.querySelector('h4').textContent : '';
		descEl.innerHTML = block && block.querySelector('.pBox') ? block.querySelector('.pBox').innerHTML : '';

		lastFocusedEl = document.activeElement;
		showImage();
		modal.hidden = false;
		document.body.classList.add('img-modal-open');
		modal.querySelector('.img-modal-close').focus();
	}

	function closeModal() {
		modal.hidden = true;
		document.body.classList.remove('img-modal-open');
		if (lastFocusedEl) lastFocusedEl.focus();
	}

	function showImage() {
		var current = currentImages[currentIndex];
		imgEl.src = current.href;
		imgEl.alt = current.alt || titleEl.textContent;

		var multiple = currentImages.length > 1;
		prevBtn.hidden = !multiple;
		nextBtn.hidden = !multiple;
		countEl.hidden = !multiple;
		countEl.textContent = multiple ? (currentIndex + 1) + ' / ' + currentImages.length : '';
	}

	function showPrev() {
		currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
		showImage();
	}

	function showNext() {
		currentIndex = (currentIndex + 1) % currentImages.length;
		showImage();
	}

	document.addEventListener('DOMContentLoaded', function () {
		modal = document.getElementById('imgModal');
		imgEl = modal.querySelector('.img-modal-img');
		countEl = modal.querySelector('.img-modal-count');
		titleEl = modal.querySelector('.img-modal-title');
		descEl = modal.querySelector('.img-modal-desc');
		prevBtn = modal.querySelector('.img-modal-prev');
		nextBtn = modal.querySelector('.img-modal-next');

		document.querySelectorAll('.gallery-link[data-gallery]').forEach(function (link) {
			link.addEventListener('click', function (event) {
				event.preventDefault();
				openModal(link);
			});
		});

		modal.querySelectorAll('[data-close]').forEach(function (el) {
			el.addEventListener('click', closeModal);
		});
		prevBtn.addEventListener('click', showPrev);
		nextBtn.addEventListener('click', showNext);

		document.addEventListener('keydown', function (event) {
			if (modal.hidden) return;
			if (event.key === 'Escape') closeModal();
			if (event.key === 'ArrowLeft' && !prevBtn.hidden) showPrev();
			if (event.key === 'ArrowRight' && !nextBtn.hidden) showNext();
		});
	});
})();
