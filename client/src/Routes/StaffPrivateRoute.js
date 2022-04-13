import { Navigate, Route } from "react-router-dom";

const StaffPrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("staffAuthToken") ?(
                    <Component {...props} />
                ) : (
                    <Navigate to="/staff/signin" />
                )
            }
        />
    );
};

export default StaffPrivateRoute;