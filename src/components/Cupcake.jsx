import React, { useState } from 'react'

function Cupcake({color}) {
    const [amigo, setAmigo] = useState("Enojado")
    useState 
    return (
        <div className={color}>Cupcake {amigo}</div>
    )
}

export default Cupcake