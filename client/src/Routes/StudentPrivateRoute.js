import { Redirect, Route } from "react-router-dom";

const StudentPrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("studentAuthToken") ?(
                    <Component {...props} />
                ) : (
                    <Redirect to="/student/signin" />
                )
            }
        />
    );
};

export default StudentPrivateRoute;