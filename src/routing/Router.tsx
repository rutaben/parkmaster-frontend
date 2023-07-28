import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./routes";
import CircularProgress from "@mui/material/CircularProgress";
import Layout from "../common/Layout/Layout";
import { useSelector } from "react-redux";
import { AuthStateType } from "../store/auth/reducer";

const Vehicles = lazy(() => import("../pages/Vehicle/Vehicles/Vehicles"));
const VehicleUpload = lazy(
  () => import("../pages/Vehicle/VehicleUpload/VehicleUpload")
);
const FeeSettings = lazy(() => import("../pages/FeeSettings/FeeSettings"));
const SignIn = lazy(() => import("../pages/SignIn/SignIn"));
const SignUp = lazy(() => import("../pages/Auth/SignUp/SignUp"));

// Different available routes and different default routes depending on user authentification status

const Router = () => {
  const isAuthenticated = useSelector(
    (state: { auth: AuthStateType }) => state.auth.isAuthenticated
  );

  return (
    <BrowserRouter basename={routes.homepage}>
      <Suspense fallback={<CircularProgress />}>
        <Layout isAuthenticated={isAuthenticated}>
          {!isAuthenticated ? (
            <Routes>
              <Route path={routes.signIn} element={<SignIn />} />
              <Route path={routes.signUp} element={<SignUp />} />
              <Route path="*" element={<Navigate to={routes.signIn} />} />
            </Routes>
          ) : (
            <Routes>
              <Route path={routes.vehicles.list} element={<Vehicles />} />
              <Route
                path={routes.vehicles.upload}
                element={<VehicleUpload />}
              />
              <Route path={routes.settings} element={<FeeSettings />} />
              <Route
                path="*"
                element={<Navigate to={routes.vehicles.list} />}
              />
            </Routes>
          )}
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
