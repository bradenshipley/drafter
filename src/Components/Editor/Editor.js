import React, { useState } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import Editor from "draft-js-plugins-editor"
import createHighlightPlugin from '../Plugins/highlightPlugin'
import './Editor.css'
const MyEditor = () => {
  const highlightPlugin = createHighlightPlugin()
  const plugins = [
    highlightPlugin
  ]
  //create our state
  const [editorState, updateState] = useState(EditorState.createEmpty())
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      updateState(newState)
      return 'handled'
    }
    return 'not-handled'
  }
  const onUnderlineClick = () => {
    updateState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'))
  }
  const onBoldClick = () => {
    updateState(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }
  const onItalicClick = () => {
    updateState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'))
  }
  const onHighlight = () => {
    updateState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
  }
  return (
    <div className='Container'>
      <button onClick={onUnderlineClick}>U</button>
      <button onClick={onBoldClick}><b>B</b></button>
      <button onClick={onItalicClick}><em>I</em></button>
      <button className="highlight" onClick={onHighlight}>
        <span style={{ background: "yellow" }}>H</span>
      </button>
      <div className='Editor'>
        <Editor
          plugins={plugins}
          editorState={editorState}
          onChange={updateState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>

    </div>
  )
}
export default MyEditor
