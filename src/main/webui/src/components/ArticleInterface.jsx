import React, { useEffect, useRef } from 'react';
import { StacksEditor } from '@stackoverflow/stacks-editor';
import '@stackoverflow/stacks-editor/dist/styles.css';
import { sendToServer } from "../data/post.js";

const ArticleInterface = ({ initialContent = '', folderId, postId, setSelectedPost }) => {
    const editorContainerRef = useRef(null);
    const timeoutHold = useRef(null);

    useEffect(() => {
        const imageUploadOptions = {
            handler: null
        };

        const editor = new StacksEditor(
            editorContainerRef.current,
            initialContent,
            {
                parserFeatures: {
                    tables: false
                },
                editorHelpLink: 'http://localhost:8080',
                imageUpload: imageUploadOptions
            }
        );

        const handleContentChange = () => {
            // Debounce on input change
            clearTimeout(timeoutHold.current);
            timeoutHold.current = setTimeout(async () => {
                const content = editor.content;
                const tags = extractTags(content);

                // Send content without tags and tags to the server
                let post = await sendToServer({folderId, postId, content, tags});
                setSelectedPost(post)
            }, 1500);
        };

        editor.editorView.dom.addEventListener('input', handleContentChange);

        return () => {
            editor.destroy();

            if (editorContainerRef.current) {
                editorContainerRef.current.innerHTML = null;
            }
        };
    }, [initialContent]);

    const extractTags = (content) => {
        const tagRegex = /#(\w+)/g;
        const matches = content.match(tagRegex);
        if (matches) {
            return matches.map(match => match.slice(1)); // Remove '#' from tags
        }
        return [];
    };

    return (
        <div className="m-1">
            <div id="editor-container" ref={editorContainerRef} />
        </div>
    );
};

export default ArticleInterface;
