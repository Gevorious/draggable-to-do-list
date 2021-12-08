import Header from "../Header";
import HomePage from "../../pages/HomePage";

const WithLayout = (WrappedComponent) => (props) => {
  return (
    <div className="main-container">
      <Header />
      <WrappedComponent {...props} />
    </div>
  );
};

export default WithLayout;
