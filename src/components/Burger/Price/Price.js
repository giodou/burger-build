import React from 'react'

const price = (props) => <p><strong>Total: ${props.children.toFixed(2)}</strong></p>

export default price