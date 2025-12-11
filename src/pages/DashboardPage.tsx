import { Link } from "react-router-dom";
import AthleteList from "../components/Athlete/AthleteList";

const DashboardPage = () => {

    
    return (
        <>
         <div className="max-w-6xl mx-auto p-6">
               <h1 className="text-5xl font-bold my-4">Dashboard page</h1>

            <div className="grid border ">

                    <div className="finance">
                <div className="balance">
                    <h3>Your balance is: 480 043kr</h3>

                    <Link to={"/loan"}>$Ask for more money</Link>
                </div>
            </div>


                <div className="athlests">
                <div className="container">
                    <h3>Your fightersw</h3>
        //TODO only render athletes on purchased status = true
                   
                     <AthleteList/>
       
                </div>
            </div>
            </div>
         </div>
        </>
    );
}

export default DashboardPage;