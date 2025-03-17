//JSX
//fragment
import './style.css';

const MyComponent = () => {
  return (
    <>
       <div> Nguyen </div>
       <div className="child"
            style={
                {borderRadius: "10px"}
            }
            > Dink </div>
    </>
  );
}

export default MyComponent;