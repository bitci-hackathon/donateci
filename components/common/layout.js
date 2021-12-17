import Footer from "./footer/footer";
import Header from "./header/header";

const Layout = ({ children }) => {
    return (
      <>
        <div className="min-h-full">
            <Header />    
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            <Footer />
        </div>
      </>
    );
  }
  
  export default Layout;
  