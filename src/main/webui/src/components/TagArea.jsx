import { useQuery } from "react-query";
import { fetchTags } from "../data/tag.js";
import { Spinner } from "@patternfly/react-core";
import React, {useEffect} from "react";
import {usePostContext} from "../Context.jsx";

const TagArea = ({onTagSelect}) => {

    const { selectedPost, setSelectedPost } = usePostContext();

    const { data: tags = [], isLoading, isError, refetch } = useQuery(
        'tags',
        () => fetchTags()
    );

    useEffect(() => {
        if (selectedPost) {
            refetch();
        }
    }, [selectedPost, refetch]);

    return (
        <div>
            <div className="p-2 fw-lighter">
                Tags
            </div>
            {isLoading ? (
                <div className="d-flex justify-content-center">
                    <Spinner/>
                </div>
            ) : (
                tags.map(tag => (
                    <a key={tag.id}
                       className="s-tag m-1"
                       onClick={() => {
                           onTagSelect('tags', tag.name, '');
                           setSelectedPost(null);
                       }}>
                        {tag.name}
                    </a>
                ))
            )}
        </div>
    );
}

export default TagArea;
