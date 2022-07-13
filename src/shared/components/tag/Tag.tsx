import "./Tag.scss";

interface TagProps { }

 
const Tag = ({ children }: React.PropsWithChildren<TagProps>) => {
    return (
        <div className="tag-container color-gray-2 subheader-4 text-nowrap border-color-gray-2">
            {children}
        </div>
    );
}
 
export default Tag;