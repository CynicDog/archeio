import {useAuth} from "../Context.jsx";
import {Label} from "@patternfly/react-core";
import Github from "../../public/Github.jsx";
import React from "react";

const GithubLinkArea = () => {

    const {githubHome} = useAuth();

    return (
        <>
            <Label
                onClick={() => {window.open(githubHome || 'https://github.com/CynicDog')}}
                variant="outline"
                style={{marginRight: "5px"}}
                icon={<Github/>}
                size="sm">
                open GitHub
            </Label>
        </>
    );
}

export default GithubLinkArea