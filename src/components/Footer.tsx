import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/4a4cbe50-33ef-4af1-a79c-8920cb692bb2.png" 
                alt="SEE-D Academy Logo"
                className="h-8 w-auto mr-3 brightness-0 invert"
              />
              <div className="text-2xl font-bold">
                <span className="text-secondary">SEE-D</span> Academy
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Hệ điều hành năng lực cho tương lai nghề nghiệp. 
              Kết nối giáo dục, doanh nghiệp và công nghệ.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-primary-foreground hover:bg-primary-foreground/10">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 text-primary-foreground hover:bg-primary-foreground/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#programs" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Chương trình đào tạo
                </a>
              </li>
              <li>
                <a href="#methodology" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Phương pháp đào tạo
                </a>
              </li>
              <li>
                <a href="#team" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Đội ngũ Mentor
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Chương trình</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  E-commerce
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Martech
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  RealBase OS
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-0.5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  475A Điện Biên Phủ, P.25,<br />
                  Q.Bình Thạnh, TP.HCM
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  +84 (028) 7300 1866
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  hello@seed-academy.vn
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 SEE-D Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors">
                Điều khoản sử dụng
              </a>
              <a href="/login" className="text-primary-foreground/60 hover:text-secondary text-sm transition-colors">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
