//JSX
//fragment
import './style.css';

const MyComponent = () => {
  // const hoidanit = "nguyen" ; // string
  // const hoidanit = 25 ; // number
  // const hoidanit = true ; // boolean
  // const hoidanit = underfined ;
  const arrayToReact = [1, 2, 3] ; // array
  const getOnePartToReact = {
    name : "This Way is easy way to get one part of object in react",
    age : 25 
  }
  const getAllOfObjectToReactFollowString = {
    name : "This way is get all the object follow string type",
    notice : " da phan thoi gian su dung nhung bien so nay cho react la string va number"
  }

  return (
    <>
  <div>{arrayToReact} day la cach 1 de the hien array trong react</div>
  <div>{JSON.stringify(arrayToReact)} va day la cach thu 2</div>
  <div> {getOnePartToReact.name} cach 1 de the hien object trong react</div>
    <div>{JSON.stringify(getAllOfObjectToReactFollowString)} va day la cach thu 2</div>
       <div className="child"
            style={
                {borderRadius: "10px"}
            }
            > Dink </div>
    </>
  );
}

export default MyComponent;