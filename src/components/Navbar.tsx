
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between bg-white shadow-sm">
      <Link to="/" className="flex items-center space-x-2">
        <span className="text-primary text-2xl">👕</span>
        <span className="text-2xl font-semibold">Verkleiden</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/login">
          <Button variant="ghost">Sign In</Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
