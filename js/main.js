/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});
*/

const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}

	return element;
};



const createHeader = ({
	title,
	header: {
		logo,
		menu,
		social
	}
}) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);
	const menuButton = getElement('button', ['menu-button']);
	menuButton.addEventListener('click', () => {
		menuButton.classList.toggle('menu-button-active');
		wrapper.classList.toggle('header-active');
	});

	if (logo) {
		const logoImg = getElement('img', ['logo'], {
			src: logo,
			alt: 'logo ' + title,
		});
		wrapper.append(logoImg);
	}

	if (menu) {
		const nav = getElement('nav', ['menu-list']);
		const allMenuLink = menu.map(item => {
			const link = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});
			return link;
		});
		nav.append(...allMenuLink);
		wrapper.append(nav);
	}

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', '', {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link;
			return socialLink;
		});

		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper, menuButton);

	return header;
};



const createMain = ({
	title,
	subColor,
	main: {
		genre,
		rating,
		description,
		trailer,
		slider
	}
}) => {
	const main = getElement('main');
	const container = getElement('div', ['container']);
	const mainContent = getElement('div', ['main-content']);
	const content = getElement('div', ['content']);

	main.append(container);
	container.append(mainContent);
	mainContent.append(content);

	if (genre) {
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {
			textContent: genre
		});

		content.append(genreSpan);
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `${rating}/10`
		});

		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: !i || i < rating ? 'img/star.svg' : 'img/star-o.svg'
			});
			star.style.fill = subColor;

			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}

	content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
		textContent: title
	}));

	if (description) {
		content.append(getElement('p',
			['main-description', 'animated', 'fadeInRight'], {
				textContent: description
			},
		));
	}

	if (trailer) {
		const youtubeLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
			href: trailer,
			textContent: 'Watch trailer',
		});

		const youtubeImgLink = getElement('a', ['play', 'youtube-modal'], {
			href: trailer,
			ariaLabel: 'Watch trailer',
		});

		const iconPlay = getElement('img', ['play-img'], {
			src: 'img/play.svg',
			alt: '',
			ariaHidden: true,
		});

		content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		mainContent.append(youtubeImgLink);
	}

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map((item) => {
			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: ((item.title || '') + ' ' + (item.subtitle || '')).trim(),
			});

			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', ['card-description']);
				cardDescription.innerHTML = `
				${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''} 
				${item.title ? `<p class="card-title">${item.title}</p>` : ''}
				`;
				
				card.append(cardDescription);
			}

			swiperSlide.append(card);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);
		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	};

	return main;
};



const createFooter = ({ 
	backgroundColor,
	footer: { 
		copyright, 
		navigation
}
}) => {
	const footer = getElement('footer', ['footer']);
	const footerBlock = getElement('div', ['container']);
	const footerContent = getElement('div', ['footer-content']);
	const footerLeft = getElement('div', ['left']);
	const footerRight = getElement('div', ['right']);

	if (copyright) {
		footerLeft.append(getElement('span', ['copyright'], {
			textContent: copyright
		}));
	}

	if (navigation) {
		const footerMenu = getElement('nav', ['footer-menu']);
		const allNavLink = navigation.map(item => {
			const navLink = getElement('a', ['footer-link'], {
				href: item.link,
				textContent: item.title
			});
			return navLink;
		});

		footerMenu.append(...allNavLink);
		footerRight.append(footerMenu);
	}

	footerContent.append(footerLeft, footerRight);
	footerBlock.append(footerContent);
	footer.append(footerBlock);
	footer.style.backgroundColor = backgroundColor || '';

	return footer;
};



const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');
	app.style.backgroundImage = options.background ? `url("${options.background}")` : '';
	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';
	document.title = options.title;

	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	if (options.favicon) {
		const type = options.favicon.substring(options.favicon.lastIndexOf('.') + 1);
		document.head.append(getElement('link', '', {
			rel: 'icon',
			type: 'image/' + (type === 'svg' ? 'svg-xml' : type),
			href: options.favicon
		}));
	}

	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}

	if (options.footer) {
		app.append(createFooter(options));
	}
}

movieConstructor('.app', {
	title: 'Good Omens',
	background: 'good-omens/background.jpg',
	favicon: 'good-omens/logo.png',
	fontColor: '#ffffff',
	backgroundColor: '#002d3d',
	subColor: '#e17a2d',
	header: {
		logo: 'good-omens/logo.png',
		social: [{
			title: 'Twitter',
			link: 'https://twitter.com',
			image: 'good-omens/social/twitter.svg',
		},
		{
			title: 'Instagram',
			link: 'https://instagram.com',
			image: 'good-omens/social/instagram.svg',
		},
		{
			title: 'Facebook',
			link: 'https://facebook.com',
			image: 'good-omens/social/facebook.svg',
		}],
		menu: [{
			title: 'Description',
			link: '#',
		},
		{
			title: 'Trailer',
			link: '#',
		},
		{
			title: 'Feedback',
			link: '#',
		}],
	},
	main: {
		genre: '2019, fantasy comedy',
		rating: '8',
		description: 'With Armageddon just days away, the armies of Heaven and Hell are amassing and The Four Horsemen are ready to ride. Aziraphale, an angel, and Crowley, a demon, agree to join forces to find the missing Anti-Christ and to stop the war that will end everything.',
		trailer: 'https://www.youtube.com/watch?v=On0RbFjh8tI',
		slider: [{
			img: 'good-omens/series/series-1.jpg',
			title: 'In the Beginning',
			subtitle: 'Episode 1',
		},
		{
			img: 'good-omens/series/series-2.jpg',
			title: 'The Book',
			subtitle: 'Episode 2',
		},
		{
			img: 'good-omens/series/series-3.jpg',
			title: 'Hard Times',
			subtitle: 'Episode 3',
		},
		{
			img: 'good-omens/series/series-4.jpg',
			title: 'Saturday Morning Funtime',
			subtitle: 'Episode 4',
		},
		{
			img: 'good-omens/series/series-5.jpg',
			title: 'The Doomsday Option',
			subtitle: 'Episode 5',
		},
		{
			img: 'good-omens/series/series-6.jpg',
			title: 'The Very Last Day of the Rest of Their Lives',
			subtitle: 'Episode 6',
		}],
	},
	footer: {
		copyright: '© 2019 Good Omens. All rights reserved.',
		navigation: [{
			title: 'Privacy Policy',
			link: '#',
		},
		{
			title: 'Terms of Service',
			link: '#',
		},
		{
			title: 'Legal',
			link: '#',
		}]
	}
});