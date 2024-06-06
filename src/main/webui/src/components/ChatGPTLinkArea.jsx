import {Label} from "@patternfly/react-core";
import Github from "../../public/Github.jsx";
import React from "react";
import ChatGPT from "../../public/ChatGPT.jsx";

const ChatGPTLinkArea = () => {

    return (
        <>
            <Label
                onClick={() => {window.open('https://chat.openai.com/')}}
                variant="outline"
                style={{marginRight: "5px"}}
                icon={<ChatGPT />}
                size="sm">
                open ChatGPT
            </Label>
        </>
    );
}

export default ChatGPTLinkArea