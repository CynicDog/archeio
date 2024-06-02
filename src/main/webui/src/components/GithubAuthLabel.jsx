import React from 'react';
import { Avatar, Label } from '@patternfly/react-core';
import Github from '../../public/Github.jsx';
import { useAuth } from '../Context.jsx';

const GithubAuthLabel = () => {
    const { githubAuthenticated, githubAvatar, handleGithubSignOut } = useAuth();

    const githubSignOut = () => {
        handleGithubSignOut();
    };

    return (
        <div className="ms-auto mt-2 mr-4">
            {githubAuthenticated ? (
                <Label onClick={() => githubSignOut()} variant="outline"
                       style={{ marginRight: "5px" }} icon={<Avatar src={githubAvatar} size="sm" />}>
                    Sign out
                </Label>
            ) : (
                <a href="/sign-in">
                    <Label variant="outline" style={{ marginRight: "5px" }} icon={<Github />}>
                        Sign in
                    </Label>
                </a>
            )}
        </div>
    );
};

export default GithubAuthLabel;
