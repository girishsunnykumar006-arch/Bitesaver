import { Link } from "react-router-dom";
import { Leaf, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", to: "/about" },
    { label: "Careers", to: "#" },
    { label: "Press", to: "#" },
    { label: "Blog", to: "#" },
  ],
  support: [
    { label: "Help Center", to: "#" },
    { label: "Contact", to: "#" },
    { label: "FAQ", to: "#" },
    { label: "Terms of Service", to: "#" },
  ],
  partners: [
    { label: "Sell Your Food", to: "/seller" },
    { label: "Partner Portal", to: "#" },
    { label: "Success Stories", to: "#" },
    { label: "Resources", to: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, to: "#", label: "Instagram" },
  { icon: Twitter, to: "#", label: "Twitter" },
  { icon: Facebook, to: "#", label: "Facebook" },
  { icon: Linkedin, to: "#", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold">
                BiteSaver
              </span>
            </Link>
            <p className="text-background/70 mb-6 max-w-sm">
              Rescuing delicious food from going to waste, one surprise bag at a time. 
              Join us in building a more sustainable food system.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.to}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.to.startsWith("/") ? (
                    <Link to={link.to} className="text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.to} className="text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  {link.to.startsWith("/") ? (
                    <Link to={link.to} className="text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.to} className="text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Partners</h4>
            <ul className="space-y-3">
              {footerLinks.partners.map((link) => (
                <li key={link.label}>
                  {link.to.startsWith("/") ? (
                    <Link to={link.to} className="text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.to} className="text-background/70 hover:text-background transition-colors">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} BiteSaver. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-background/60 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors">
              Terms of Use
            </a>
            <a href="#" className="text-background/60 hover:text-background transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
