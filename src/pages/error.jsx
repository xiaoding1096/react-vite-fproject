import { Button, Result } from "antd";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      
      <Result
        status="403"
        title="Oops!"
        subTitle={error.statusText || error.message}
        extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
      />
    </div>
  );
}

export default ErrorPage;