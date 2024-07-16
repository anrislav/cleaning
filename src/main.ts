import { modalInit } from './modules/modal'
import { slidersInit } from './modules/slider'
import './styles/styles.sass'

const sliders = document.getElementsByClassName('slider') as HTMLCollectionOf<HTMLElement>
slidersInit(Array.from(sliders))

const modalButtons = document.getElementsByClassName('modal-button') as HTMLCollectionOf<HTMLButtonElement>
const modalElement = document.getElementById('modal') as HTMLElement
modalInit(Array.from(modalButtons), modalElement)
