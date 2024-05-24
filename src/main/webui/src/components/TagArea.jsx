import {useTheme} from "../Context.jsx";

const TagArea = () => {

    return (
        <div>
            <div className="p-2 fw-lighter">
                Tags
            </div>
            <a className="s-tag m-1" href="#">Java</a>
            <a className="s-tag m-1" href="#">Persistence</a>
            <a className="s-tag m-1" href="#">JPA</a>
            <a className="s-tag m-1" href="#">Hibernate</a>
            <a className="s-tag m-1" href="#">Panache</a>
            <a className="s-tag m-1" href="#">Quarkus</a>
            <a className="s-tag m-1" href="#">Supersonic</a>
        </div>
    );
}

export default TagArea