import React, { useState } from 'react'

function Cupcake({color="bg-green-200", children="Default"}) {
    const [amigo, setAmigo] = useState("Enojado")
    useState 
    return (
        <div className={color}>Cupcake - {children} {amigo}</div>
    )
}

export default Cupcake