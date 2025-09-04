import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("vi");

  const navigation = [
    { name: "Trang chủ", href: "/" },
    { name: "Giới thiệu", href: "#about" },
    { name: "Chương trình", href: "#programs" },
    { name: "Phương pháp", href: "#methodology" },
    { name: "Đội ngũ", href: "#team" },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/4a4cbe50-33ef-4af1-a79c-8920cb692bb2.png" 
              alt="SEE-D Academy Logo"
              className="h-10 w-auto mr-3"
            />
            <div className="text-2xl font-bold">
              <span className="hero-text-gradient">SEE-D</span>
            </div>
            <span className="ml-2 text-sm text-muted-foreground hidden sm:block">
              Academy
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Language & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
              className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "vi" ? "EN" : "VI"}</span>
            </button>
            <Button variant="hero" size="sm">
              Đăng ký ngay
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="py-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <button
                  onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
                  className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "vi" ? "English" : "Tiếng Việt"}</span>
                </button>
                <Button variant="hero" size="sm">
                  Đăng ký ngay
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;