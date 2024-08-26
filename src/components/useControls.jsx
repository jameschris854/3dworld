import React, { useEffect, useState } from "react";

const useControls = () => {

    const [front,setFront] = useState();
    const [back,setBack] = useState();
    const [left,setLeft] = useState();
    const [right,setRight] = useState();
    const [handBrake,setHandBrake] = useState();


    useEffect(() => {

        const handleKeyDown = (e) => {
            switch (e.code) {
                case "ArrowUp":
                    setFront(true)
                    break;
                case "ArrowDown":
                    setBack(true)
                    break;
                case "ArrowLeft":
                    setLeft(true)
                    break;
                case "ArrowRight":
                    setRight(true)
                    break;
                case "Space":
                    setHandBrake(true)
                    break;
                default:
                    break;
            }
        }

        const handleKeyUp = (e) => {
            switch (e.code) {
                case "ArrowUp":
                    setFront(false)
                    break;
                case "ArrowDown":
                    setBack(false)
                    break;
                case "ArrowLeft":
                    setLeft(false)
                    break;
                case "ArrowRight":
                    setRight(false)
                    break;
                case "Space":
                    setHandBrake(false)
                    break;
                default:
                    break;
            }
        }

        document.addEventListener("keydown",handleKeyDown)
        document.addEventListener("keyup",handleKeyUp)

        return () => {
            document.removeEventListener("keydown",handleKeyDown)
            document.removeEventListener("keyup",handleKeyUp)
        }

    },[])

    return {
        front,
        back,
        left,
        right,
        handBrake
    }
}

export default useControls;