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
import ReadMe from "./ReadMe.jsx";

const PostEmptyState = () => {

    return (
        <div className="d-flex justify-content-center align-items-center border rounded-3 mt-4"
             style={{height: "80vh"}}>
            <div>
                <EmptyState variant={EmptyStateVariant.sm}>
                    <EmptyStateHeader titleText="No Notes Found" headingLevel="h3" style={{paddingBottom: "20px"}}/>
                    <EmptyStateBody>
                        It looks like you don't have any notes yet. Create your first note to get started!
                    </EmptyStateBody>
                    <EmptyStateFooter>
                        <EmptyStateActions>
                            <GithubLinkArea />
                            <ChatGPTLinkArea />
                            <ReadMe />
                        </EmptyStateActions>
                    </EmptyStateFooter>
                </EmptyState>
            </div>
        </div>
    );
}

export default PostEmptyState;