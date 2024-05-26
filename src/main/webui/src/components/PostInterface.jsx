import React, { useEffect, useRef } from 'react';
import { StacksEditor } from '@stackoverflow/stacks-editor';
import '@stackoverflow/stacks-editor/dist/styles.css';
import { sendToServer } from "../data/post.js";
import {usePostContext} from "../Context.jsx";

const PostInterface = () => {

    const { selectedPost, setSelectedPost } = usePostContext();

    const initialContent = selectedPost.content;

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

        // Set height of closest children of the editor container
        if (editorContainerRef.current) {
            const closestChildren = editorContainerRef.current.children;
            for (let child of closestChildren) {
                child.style.height = '720px';
            }
        }

        const handleContentChange = () => {
            // Debounce on input change
            clearTimeout(timeoutHold.current);
            timeoutHold.current = setTimeout(async () => {
                const content = editor.content;
                const tags = extractTags(content);

                let updatedPost = await sendToServer({ postId: selectedPost.id, content, tags });

                setSelectedPost(updatedPost);
            }, 2000);
        };

        editor.editorView.dom.addEventListener('input', handleContentChange);

        return () => {
            editor.destroy();

            if (editorContainerRef.current) {
                editorContainerRef.current.innerHTML = null;
            }
        };
    }, [selectedPost.id]);

    const extractTags = (content) => {
        const tagRegex = /#(\w+)/g;
        const matches = content.match(tagRegex);
        if (matches) {
            return matches.map(match => match.slice(1).toLowerCase()); // Remove '#' from tags
        }
        return [];
    };

    return (
        <div className="m-1">
            <div id="editor-container" ref={editorContainerRef} />
        </div>
    );
};

export default PostInterface;
