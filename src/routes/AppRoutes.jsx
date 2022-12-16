import { Routes, Route } from "react-router-dom"
import LogInPage from "../pages/LogInPage/LogInPage"
import HomePage from "../pages/HomePage/HomePage";
import PropertiesListPage from "../pages/PropertiesListPage/PropertiesListPage";
import NewPropertyPage from "../pages/NewPropertyPage/NewPropertyPage";
import PropertyDetailsPage from "../pages/PropertyDetails/PropertyDetails";
import EditPropertyPage from "../pages/EditPropertyPage/EditPropertyPage";
import Map from "../components/Map/Map";
import SignupPage from "../pages/SignUpPage/SignUpPage";
import PrivateRoute from "./PrivateRoute";
import LocationPage from "../pages/LocationSearchPage/LocationSearchPage";
import PropertyBookingPage from "../pages/PropertyBookingPage/PropertyBookingPage";
import MyProfilePage from "../pages/MyProfilePage/MyProfilePage";
import FilteredPropertiesPage from "../pages/FilteredPropertiesPage/FilteredPropertiesPage";
import HotelsListPage from "../pages/HotelsListPage/HotelsListPage";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/create-propety" element={<NewPropertyPage />} /> */}
            <Route path="/properties" element={<PropertiesListPage />} />
            <Route path="/properties/list" element={<FilteredPropertiesPage />} />
            <Route path="/detalles/:property_id" element={<PropertyDetailsPage />} />
            <Route path="/edit/:property_id" element={<EditPropertyPage />} />
            <Route path="/hotels" element={<HotelsListPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/map" element={<Map />} />
            <Route path="/maps" element={<LocationPage />} />


            <Route path="/*" element={<h1>404</h1>} />

            <Route path="/create-propety" element={<PrivateRoute />}>
                <Route path="" element={<NewPropertyPage />} />
            </Route>

            <Route path="/booking/:property_id" element={<PrivateRoute />}>
                <Route path="" element={<PropertyBookingPage />} />
            </Route>

            <Route path="/booking/:property_id" element={<PrivateRoute />}>
                <Route path="" element={<PropertyBookingPage />} />
            </Route>
            <Route path="/profile" element={<PrivateRoute />}>
                <Route path="" element={<MyProfilePage />} />
            </Route>


        </Routes >


    );
}

export default AppRoutes;