import {Avatar, Spinner} from "@patternfly/react-core";
import React from "react";
import {useQuery} from "react-query";
import {fetchUser} from "../data/user.js";

const ProfileArea = () => {

    const username = window.location.pathname.split('/')[1] || 'CynicDog';

    const {data: user, isLoading: isUserLoading, isError} = useQuery(
        [username],
        () => fetchUser()
    );

    return (
        <>
            {isUserLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner/>
                </div>
            ) : isError ? (
                <div>User not found</div>
            ) : (
                <div className="bs-sm rounded-3 d-flex justify-content-between align-items-center p-2 mb-3">
                    <Avatar
                        style={{cursor: "pointer"}}
                        src={user.avatarUrl}
                        alt="avatar"
                        size="md"
                        border="light"
                        onClick={() => {window.open(user.githubHome)}}/>
                    <span className="fw-lighter fs-5 mx-1">{user.username}'s Archeio</span>
                </div>
            )}
        </>
    )
}

export default ProfileArea