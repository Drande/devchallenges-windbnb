import "./Tag.scss";

interface TagProps { }

 
const Tag = ({ children }: React.PropsWithChildren<TagProps>) => {
    return (
        <div className="tag-container color-gray-4 subheader-4 text-nowrap border-color-gray-4">
            {children}
        </div>
    );
}
 
export default Tag;