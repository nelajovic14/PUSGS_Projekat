import LayoutKupac from "./LayoutKupac";
import LayoutProdavac from "./LayoutProdavac";
import NewOrder from "./NewOrder";
import EditUser from "./EditUser";
import OldOrder from "./OldOrder";
import MyArticles from "./MyArticles"
import OrdersOfUser from "./OrdersOfUser"
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewArticleFunction from "./NewArticle";

export default function MainPage(props){
    
  const container = document.getElementById('root');
  const root = ReactDOMClient.createRoot(container);

  if(props.user.typeOfUser=="KUPAC"){
    return(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<LayoutKupac />}>      
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
            <Route path="/" element={<LayoutProdavac />}>      
            <Route path='/EditInformation'  element={<EditUser user={props.user} />} />
            <Route path="/MyArticles" element={<MyArticles user={props.user}/>}/>
            <Route path="/NewOrdersUser" element={<OrdersOfUser user={props.user} IsOld={false}/>}/>
            <Route path="/OldOrdersUser" element={<OrdersOfUser user={props.user} IsOld={true}/>}/>
            <Route path="/AddNew" element={<NewArticleFunction user={props.user}/>}/>
            </Route>
        </Routes>
      </BrowserRouter>
    )
  }
  else{
    return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutProdavac />}>      
        <Route path='/EditInformation'  element={<EditUser user={props.user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
    )
  }
}
    