import React, { Component } from 'react'
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'
import CodeUtils from 'draft-js-code'
import Editor from "draft-js-plugins-editor"
import BlockStyleToolbar from "../BlockStyles/BlockStyleToolbar";
import InlineStyleControls from '../BlockStyles/InlineStyleControls'
import MediaBlockRenderer from '../Entities/MediaBlockRenderer'
//plugin imports
import createHighlightPlugin from '../Plugins/highlightPlugin'
import addLinkPlugin from '../Plugins/addLinkPlugin'
import './Editor.css'
class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  onChange = editorState => {
    this.setState({
      editorState
    });
  }
  onAddImage = (e) => {
    e.preventDefault();
    const editorState = this.state.editorState;
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        )
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  };
  focus = () => this.refs.editor.focus();
  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }
  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType))
  }
  toggleInlineStyle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState,
        inlineStyle
      )
    );
  }
  onTab = (e) => {
    this.onChange(CodeUtils.onTab(e, this.state.editorState));
  }
  render() {
    const highlightPlugin = createHighlightPlugin()
    const plugins = [
      highlightPlugin,
      addLinkPlugin
    ]
    return (
      <div className='RichEditor-root'>
        <BlockStyleToolbar
          editorState={this.state.editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={this.state.editorState}
          onToggle={this.toggleInlineStyle}
          onAddImage={this.onAddImage}
        />
        <div className='RichEditor-editor'>
          <Editor
            plugins={plugins}
            spellCheck
            onTab={this.onTab}
            blockRendererFn={MediaBlockRenderer}
            textAlignment="left"
            blockStyleFn={this.getBlockStyle}
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            ref="editor"
          />
        </div>
      </div>
    )
  }
}


export default MyEditor
