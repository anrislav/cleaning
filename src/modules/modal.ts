export function modalInit(buttons: HTMLButtonElement[], modal: HTMLElement) {
	modal.querySelector('.modal__close')!.addEventListener('click', () => {
		const window = modal.querySelector('.modal__window')!
		window.innerHTML = ''
		modal.classList.remove('modal--opened')
	})

	for (const button of buttons) {
		const modalType: string = button.dataset.modal!
		button.addEventListener('click', e => {
			switch (modalType) {
				case 'image':
					const target = e.target as HTMLImageElement
					if (target && target.src) openPhoto(target.src)
					break

				default:
					button.addEventListener('click', () => openModal(button.parentElement?.querySelector('.navigation')!))
					break
			}
		})
	}
}

function openModal(html: Node) {
	const element = html.cloneNode(true) as HTMLElement

	element.style['display'] = 'block'
	const modal = document.getElementById('modal')!
	modal.classList.add('modal--opened')
	const window = modal.querySelector('.modal__window')!
	window.innerHTML = element.outerHTML
	console.log(window)
}

function openPhoto(src: string) {
	const modal = document.getElementById('modal')!
	modal.classList.add('modal--opened')
	const window = modal.querySelector('.modal__window')!
	window.innerHTML = `<img class="modal__image" src="${src}" alt="">`
}
