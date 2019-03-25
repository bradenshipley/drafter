import React, { useState, useEffect } from 'react'
import { EditorState, RichUtils } from 'draft-js'
import CodeUtils from 'draft-js-code'
import Editor from "draft-js-plugins-editor"
import BlockStyleToolbar, { getBlockStyle } from "../BlockStyles/BlockStyleToolbar";
import InlineStyleControls from '../BlockStyles/InlineStyleControls'
//plugin imports
import createHighlightPlugin from '../Plugins/highlightPlugin'
import addLinkPlugin from '../Plugins/addLinkPlugin'
import './Editor.css'
const MyEditor = () => {
  const highlightPlugin = createHighlightPlugin()
  const plugins = [
    highlightPlugin,
    addLinkPlugin
  ]
  const starterState = EditorState.createEmpty()
  const [editorState, updateState] = useState(starterState)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      updateState(newState)
      return 'handled'
    }
    return 'not-handled'
  }
  useEffect(() => { console.log(editorState) }, editorState)

  const toggleBlockType = (blockType) => {
    updateState(RichUtils.toggleBlockType(editorState, blockType))
  }
  const toggleInlineStyle = (inlineStyle) => {
    updateState(
      RichUtils.toggleInlineStyle(editorState,
        inlineStyle
      )
    );
  }
  const onTab = (e) => {
    updateState(CodeUtils.onTab(e, editorState));
  }
  let className = 'RichEditor-editor';

  return (
    <div className='RichEditor-root'>
      <BlockStyleToolbar
        editorState={editorState}
        onToggle={toggleBlockType}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={toggleInlineStyle}
      />
      <div className={className}>
        <Editor
          plugins={plugins}
          spellCheck
          onTab={onTab}
          textAlignment="left"
          blockStyleFn={getBlockStyle}
          editorState={editorState}
          onChange={updateState}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  )
}


export default MyEditor
