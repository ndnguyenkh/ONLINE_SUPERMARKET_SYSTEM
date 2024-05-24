
import Chat from "~/components/containers/Chat";
import Footer from "~/components/containers/Footer";
import Header from "~/components/containers/Header";
import ToTop from "~/components/containers/ToTop";

function HomeLayout({ children }) {

    return ( 
        <div>
            <Header />
            <div>{children}</div>
            <Footer />
            <Chat />
            <ToTop />
        </div>
     );
}

export default HomeLayout;