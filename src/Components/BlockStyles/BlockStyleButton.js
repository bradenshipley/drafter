import React from 'react'
const BlockStyleButton = props => {
  const onToggle = (e) => {
    e.preventDefault()
    props.onToggle(props.style)
  }
  let params = "RichEditor-styleButton"
  if (props.active) {
    params += " RichEditor-activeButton"
  }
  return (
    <span className={params} onClick={onToggle}>
      {props.label}
    </span>
  )
}
export default BlockStyleButton
