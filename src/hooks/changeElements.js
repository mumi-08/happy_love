import { useState, useRef, useEffect } from "react"
import confetti from 'canvas-confetti'

export const useChangeElements = () => {
    const [index, setIndex] = useState(0)
    const [textP, setTextP] = useState('Vamos, respondeme! ')
    const [image, setImage] = useState('https://i.pinimg.com/originals/f6/a5/f7/f6a5f7ddff1f05cbcc560256b9f98c2e.gif')
    const audioRef = useRef(null);

    const options = ['Segura?', 'Segurisima?', 'Estas completamente segura?', 'No te arrepentiras?', 'Pero si estas segura?', 'No hay vuelta atras', 'No hay devoluciones', 'No hay garantias', 'No hay reembolsos', 'No hay cambios', 'No hay nada', 'No hay', 'Que no hay']

    const handleButtonNo = () => {
        setIndex(index + 1)
        setImage('https://media.tenor.com/ivKWdfdbV3EAAAAi/goma-goma-cat.gif')
        setTextP(options.at(index))
        
        if(index === options.length - 1) setIndex(0)
    }

    const handleButtonYes = () => {
        setImage("https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif")
        setTextP('Gracias por aceptar, te amo 💚')
        confetti()
    }

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/Me_enamore.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
        }

        audioRef.current.play().catch(err => console.error("Error reproduciendo audio:", err));

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []); 

    return { handleButtonNo, handleButtonYes, textP, image, audioRef }
}