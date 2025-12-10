import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddAthletePage, AddVenuePage, AthletePage, DashboardPage, VenuePage } from "../pages";
import PageNavigation from "../components/shared/PageNavigation";
import PageFooter from "../components/shared/PageFooter";
import { AthleteProvider } from "../contexts/AthleteContext";
import { VenueProvider } from "../contexts/VenueContext";
const AppRouting = () => {
    return (
        <>
            <BrowserRouter>
                <PageNavigation />
                <AthleteProvider>
                    <VenueProvider>
                        <Routes>
                            <Route path="/" element={<AthletePage />} />
                            <Route path="add-new-athlete" element={<AddAthletePage />} />
                            <Route path="dashboard" element={<DashboardPage />} />
                            <Route path="get-all-venues" element={<VenuePage />} />
                            <Route path="add-new-venues" element={<AddVenuePage />} />
                        </Routes>
                    </VenueProvider>
                </AthleteProvider>
                <PageFooter />

            </BrowserRouter>
        </>
    );
}

export default AppRouting;