import { Outlet, Link } from "react-router-dom";

const LayoutProdavac = () => {
  return (
    
    <>
    <html lang="en">
    <head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        </head>

<body>      
    <nav class="navbar navbar-inverse">  <div class="container-fluid">
        <ul  class="list-inline">
         
          <li>
            <Link to="/EditInformation">Edit</Link>
          </li>
          <li>
            <Link to="/MyArticles">My Articles</Link>
          </li>
          <li>
            <Link to="/NewOrdersUser">New Orders</Link>
          </li>
          <li>
            <Link to="/OldOrdersUser">Old Orders</Link>
          </li>
          <li>
            <Link to="/AddNew">New Article</Link>
          </li>
        </ul></div>
      </nav>

      <Outlet /></body>
</html>
    </>
  )
};

export default LayoutProdavac;