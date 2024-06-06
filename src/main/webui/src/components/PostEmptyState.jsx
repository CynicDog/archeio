import {
    EmptyState,
    EmptyStateActions,
    EmptyStateBody,
    EmptyStateFooter,
    EmptyStateHeader,
    EmptyStateVariant
} from "@patternfly/react-core";
import React from "react";
import GithubLinkArea from "./GithubLinkArea.jsx";
import ChatGPT from "../../public/ChatGPT.jsx";
import ChatGPTLinkArea from "./ChatGPTLinkArea.jsx";

const PostEmptyState = () => {

    return (
        <div className="d-flex justify-content-center align-items-center border rounded-3 mt-4"
             style={{height: "85vh"}}>
            <div>
                <EmptyState variant={EmptyStateVariant.xs}>
                    <EmptyStateHeader titleText="No Notes Found" headingLevel="h4"/>
                    <EmptyStateBody>
                        It looks like you don't have any notes yet. Create your first note to get started!
                    </EmptyStateBody>
                    <EmptyStateFooter>
                        <EmptyStateActions>
                            <GithubLinkArea />
                            <ChatGPTLinkArea />
                        </EmptyStateActions>
                    </EmptyStateFooter>
                </EmptyState>
            </div>
        </div>
    );
}

export default PostEmptyState;