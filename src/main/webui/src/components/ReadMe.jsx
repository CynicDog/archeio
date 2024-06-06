import {Label} from "@patternfly/react-core";
import React from "react";
import PersonRaisedHand from "../../public/PersonRaisedHand.jsx";

const ReadMe = () => {

    return (
        <div className="mt-3">
            <Label
                onClick={() => {window.open('https://github.com/CynicDog/archeio/blob/master/README.md')}}
                variant="outline"
                style={{marginRight: "5px"}}
                icon={<PersonRaisedHand />}
                size="sm">
                README.md
            </Label>
        </div>
    );
}

export default ReadMe