
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { PublicRoutes } from './routes';
import { HomeLayout } from './components/layouts';


function App() {
  return (
    <Router>
      <Routes>
        {PublicRoutes.map( 
          (route, index) => {

            let Layout = HomeLayout;

              if(route.layout){
                Layout = route.layout;
              }else if(route.layout === null){
                Layout = Fragment;
              }
              
            const Page = route.component;

            return <Route key={index} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
          }
        )}
        
      </Routes>
    </Router>
  );
}

export default App;
