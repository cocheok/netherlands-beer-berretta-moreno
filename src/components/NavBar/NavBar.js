
export default function Header() {
    return (
        <div className="nav-bar">
          <div className="header">
            <img className="logo" src="logo.jpeg" alt='logo'/>
            <div className="brand">
                <p>Netherlands Beer</p>
                
            </div>
            
        </div>
        
        <nav className="subheader">
                <li><button>Home</button></li>
                <li><button>Products</button></li>
                <li><button>About us</button></li>
                <li><button>Contact</button></li>
        </nav>
        </div>
        
      );
}