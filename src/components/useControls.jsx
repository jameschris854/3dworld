import React, { useEffect, useState } from "react";

const useControls = ({reset}) => {

    const [front,setFront] = useState();
    const [back,setBack] = useState();
    const [left,setLeft] = useState();
    const [right,setRight] = useState();
    const [handBrake,setHandBrake] = useState();


    useEffect(() => {

        const handleKey = (e) => {
            const update = e.type === "keyup" ? false : true
            switch (e.code) {
                case "ArrowUp":
                    setFront(update)
                    break;
                case "ArrowDown":
                    setBack(update)
                    break;
                case "ArrowLeft":
                    setLeft(update)
                    break;
                case "ArrowRight":
                    setRight(update)
                    break;
                case "Space":
                    setHandBrake(update)
                    break;
                default:
                    break;
            }
        }

        const handleKeyPress = (e) => {
            switch (e.code) {
                case "KeyR":
                    reset && reset()
                    break;
                default:
                    break
            }
        }

        document.addEventListener("keypress",handleKeyPress)
        document.addEventListener("keydown",handleKey)
        document.addEventListener("keyup",handleKey)

        return () => {
            document.removeEventListener("keydown",handleKey)
            document.removeEventListener("keyup",handleKey)
        }

    },[])

    return {
        front,
        back,
        left,
        right,
        handBrake,
        reset
    }
}

export default useControls;