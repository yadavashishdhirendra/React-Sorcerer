import React, { useState, useEffect, Fragment } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, Modifier } from 'draft-js';
import 'draft-js/dist/Draft.css';
import Alerts from '../Components/Alerts/Alerts';
import useAlert from '../Components/Alerts/CustomAlert';

const style_Map = {
    RED: {
        color: 'red',
    },
};

const DraftEditor = () => {
    const [editor, setEditor] = useState(EditorState.createEmpty());

    const [alert, showAlert] = useAlert();

    useEffect(() => {
        const editor__sorcerer = localStorage.getItem('sorcerer');
        if (editor__sorcerer) {
            const parse__contentState = convertFromRaw(JSON.parse(editor__sorcerer));
            setEditor(EditorState.createWithContent(parse__contentState));
        }
    }, []);



    const handleBeforeInput = (chars) => {
        const currentContent = editor.getCurrentContent();
        const selection = editor.getSelection();
        const startKey = selection.getStartKey();
        const startOffset = selection.getStartOffset();

        // For '#'
        if (chars === ' ' && startOffset === 1) {
            const text = currentContent.getBlockForKey(startKey).getText();
            if (text === '#') {
                const newContent = Modifier.removeRange(
                    currentContent,
                    selection.merge({
                        anchorOffset: 0,
                        focusOffset: 1,
                    }),
                    'backward'
                );
                const newEditorState = EditorState.push(
                    editor,
                    newContent,
                    'remove-range'
                );
                setEditor(RichUtils.toggleBlockType(newEditorState, 'header-one'));
                return 'handled';
            }
        }

        // For '*' 
        if (chars === ' ' && startOffset === 1) {
            const text = currentContent.getBlockForKey(startKey).getText();
            if (text === '*') {
                const newContent = Modifier.removeRange(
                    currentContent,
                    selection.merge({
                        anchorOffset: 0,
                        focusOffset: 1,
                    }),
                    'backward'
                );
                const newEditorState = EditorState.push(
                    editor,
                    newContent,
                    'remove-range'
                );
                setEditor(RichUtils.toggleInlineStyle(newEditorState, 'BOLD'));
                return 'handled';
            }
        }

        // For '**' 
        if (chars === ' ' && startOffset === 2) {
            const text = currentContent.getBlockForKey(startKey).getText();
            if (text === '**') {
                const newContent = Modifier.removeRange(
                    currentContent,
                    selection.merge({
                        anchorOffset: 0,
                        focusOffset: 2,
                    }),
                    'backward'
                );
                const newEditorState = EditorState.push(
                    editor,
                    newContent,
                    'remove-range'
                );
                setEditor(RichUtils.toggleInlineStyle(newEditorState, 'RED'));
                return 'handled';
            }
        }

        // For '***' 
        if (chars === ' ' && startOffset === 3) {
            const text = currentContent.getBlockForKey(startKey).getText();
            if (text === '***') {
                const newContent = Modifier.removeRange(
                    currentContent,
                    selection.merge({
                        anchorOffset: 0,
                        focusOffset: 3,
                    }),
                    'backward'
                );
                const newEditorState = EditorState.push(
                    editor,
                    newContent,
                    'remove-range'
                );
                setEditor(RichUtils.toggleInlineStyle(newEditorState, 'UNDERLINE'));
                return 'handled';
            }
        }

        return 'not-handled';
    };


    // Here Save Editor Content to localStorage
    const handleSave = () => {
        const content = editor.getCurrentContent();

        if (!content.hasText()) {
            showAlert("Please Enter Some Text in Editor", 'danger');
            return;
        }

        localStorage.setItem('sorcerer', JSON.stringify(convertToRaw(content)));
        showAlert("Data Stored Success", 'success')
    };



    return (
        <Fragment>
            <div className="container">
                {
                    alert.display && <Alerts message={alert.message} prompt={alert.type} />
                }
                {/* Header component starts here */}
                <div className='d-flex flex-row align-items-center justify-content-between mt-3 mb-3'>
                    <h1>My Editor</h1>
                    <button className='btn btn-primary' onClick={handleSave}>Save</button>
                </div>
                {/* Header component ends here */}

                <div className='editor__container'>
                    <Editor
                        editorState={editor}
                        handleBeforeInput={handleBeforeInput}
                        customStyleMap={style_Map}
                        onChange={setEditor}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default DraftEditor;
