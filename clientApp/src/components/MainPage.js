import Layout from "./Layout";
import NewOrder from "./NewOrder";
import EditUser from "./EditUser";
import OldOrder from "./OldOrder";
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MainPage(props){
    

    const container = document.getElementById('root');
    const root = ReactDOMClient.createRoot(container);

    if(props.user.typeOfUser=="KUPAC"){
      return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>      
                <Route path='/EditInformation'  element={<EditUser user={props.user} />} />
                <Route path='/NewOrder'  element={<NewOrder user={props.user} />}  />
                <Route path='/OldOrders'   element ={<OldOrder user={props.user}  />} />
                </Route>
            </Routes>
        </BrowserRouter>
        )
      }
      else if(props.user.typeOfUser=="PRODAVAC"){
        return(
          <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>      
              <Route path='/EditInformation'  element={<EditUser user={props.user} />} />
              </Route>
          </Routes>
      </BrowserRouter>
        )
      }
      else{
        return(
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>      
              <Route path='/EditInformation'  element={<EditUser user={props.user} />} />
              </Route>
          </Routes>
      </BrowserRouter>
        )
      }
    }
    