let xDown: number = 0
enum Directions {
	prev,
	next,
}

type Slider = {
	slides: HTMLCollectionOf<HTMLElement>
	controls: HTMLCollectionOf<HTMLElement>
	timer: number
	intervalId: number | ReturnType<typeof setTimeout>
}

export function slidersInit(sliders: HTMLElement[]) {
	for (const element of sliders) {
		let currentIndex: number = 0

		const slider: Slider = {
			slides: element.getElementsByClassName('slide') as HTMLCollectionOf<HTMLElement>,
			controls: element.getElementsByClassName('control') as HTMLCollectionOf<HTMLElement>,
			timer: +element.getAttribute('data-timer')! || 0,
			intervalId: 0,
		}

		const slidesQuantity: number = slider.slides.length
		if (!slidesQuantity) break

		const visibleSlides: number = +getComputedStyle(element).getPropertyValue('--visible') || 1
		const scrollStep: number = +getComputedStyle(element).getPropertyValue('--step') || 1
		let slideWidth: number = slider.slides[0].clientWidth
		const slidesPages: number = Math.ceil(slidesQuantity / scrollStep)

		for (const slide of Array.from(slider.slides)) slide.style.width = slideWidth / visibleSlides + 'px'

		slider.controls[Directions.prev].addEventListener('click', () => showSlide(Directions.prev))
		slider.controls[Directions.next].addEventListener('click', () => showSlide(Directions.next))

		element.addEventListener('touchstart', handleTouchStart, false)
		element.addEventListener('touchmove', e => handleTouchMove(e, showSlide), false)

		element.addEventListener('pointerover', () => clearInterval(slider.intervalId))
		if (slider.timer) {
			slider.intervalId = setInterval(showSlide, slider.timer, Directions.next)
			element.addEventListener('pointerout', () => (slider.intervalId = setInterval(showSlide, slider.timer, Directions.next)))
		}
		function showSlide(direction: Directions): void {
			switch (direction) {
				case Directions.next:
					currentIndex = (currentIndex + 1) % slidesPages
					break
				case Directions.prev:
					currentIndex = (currentIndex - 1 + slidesPages) % slidesPages
					break
			}
			const slidesBox = element.querySelector('.slides') as HTMLElement
			const translateSlidesWidth: string = (-currentIndex * slideWidth * scrollStep) / visibleSlides + 'px'
			slidesBox.style.transform = `translateX(${translateSlidesWidth})`
		}
	}
}

function handleTouchStart(e: TouchEvent): void {
	xDown = e.touches[0].clientX
}

function handleTouchMove(e: TouchEvent, showSlide: Function): void {
	if (!xDown) return
	const xDiff = xDown - e.touches[0].clientX
	xDiff > 0 ? showSlide(Directions.next) : showSlide(Directions.prev)
	xDown = 0
}
