import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Liên hệ <span className="text-primary">& Hợp tác</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SEE-D sẵn sàng hợp tác với trường đại học, doanh nghiệp, 
            tổ chức quốc tế để phát triển nguồn nhân lực sáng tạo
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Thông tin liên hệ
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Điện thoại</h4>
                    <p className="text-muted-foreground">+84 (028) 7300 1866</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">hello@seed-academy.vn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Địa chỉ</h4>
                    <p className="text-muted-foreground">
                      475A Điện Biên Phủ, Phường 25,<br />
                      Quận Bình Thạnh, TP.HCM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-bold text-card-foreground mb-4">Đối tác hiện tại</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>• Đại học HUTECH</div>
                <div>• PNJ Corporation</div>
                <div>• VISSAN Group</div>
                <div>• Startup Ecosystem</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl p-8 border border-border card-hover">
            <h3 className="text-2xl font-bold mb-6 text-card-foreground">
              Đăng ký hợp tác
            </h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Họ và tên *
                  </label>
                  <Input placeholder="Nhập họ tên của bạn" />
                </div>
                <div>
                  <label className="text-sm font-medium text-card-foreground mb-2 block">
                    Email *
                  </label>
                  <Input type="email" placeholder="email@example.com" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Tổ chức / Doanh nghiệp
                </label>
                <Input placeholder="Tên tổ chức hoặc doanh nghiệp" />
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Loại hợp tác
                </label>
                <select className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm">
                  <option>Chọn loại hợp tác</option>
                  <option>Đào tạo nhân sự</option>
                  <option>Hợp tác giáo dục</option>
                  <option>Mentor/Giảng viên</option>
                  <option>Đối tác chiến lược</option>
                  <option>Khác</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground mb-2 block">
                  Nội dung hợp tác
                </label>
                <Textarea 
                  placeholder="Mô tả chi tiết về ý tưởng hợp tác của bạn..."
                  rows={4}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" className="flex-1 group">
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Đăng ký hợp tác
                </Button>
                <Button variant="accent" className="flex-1">
                  Liên hệ ngay
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;