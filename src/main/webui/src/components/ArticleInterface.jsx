import { useEffect, useRef } from 'react';
import { StacksEditor } from '@stackoverflow/stacks-editor';
import '@stackoverflow/stacks-editor/dist/styles.css';

const ArticleInterface = ({ initialContent = '' }) => {

    const editorContainerRef = useRef(null);

    useEffect(() => {

        // Initialize the Stacks Editor
        const editor = new StacksEditor(
            editorContainerRef.current,
            initialContent,
        );

        // Clean up the editor instance on component unmount
        return () => {
            editor.destroy();
        };
    }, [initialContent]);

    return (
        <div className="m-1">
            <div id="editor-container" ref={editorContainerRef} />
        </div>
    );
};

export default ArticleInterface;
