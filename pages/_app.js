import "../styles/global.scss"

import Modal from "react-modal"
// this allows the modal to apply aria-hidden to the root element, improving UX for screen-readers
Modal.setAppElement("#__next")

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}
