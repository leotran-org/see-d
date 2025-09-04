import ecommerceIcon from "@/assets/ecommerce-icon.jpg";
import digitalMarketingIcon from "@/assets/digital-marketing-icon.jpg";
import martechIcon from "@/assets/martech-icon.jpg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProgramsSection = () => {
  const programs = [
    {
      id: "ecommerce",
      title: "E-commerce",
      subtitle: "Thương mại điện tử",
      description: "Làm chủ hệ sinh thái bán hàng thời AI",
      features: ["Quản lý cửa hàng online", "Chiến lược bán hàng", "Analytics & Data", "AI trong E-commerce"],
      icon: ecommerceIcon,
      color: "primary"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      subtitle: "Tiếp thị số",
      description: "Triển khai chiến dịch đa nền tảng, đo lường hiệu quả",
      features: ["Social Media Marketing", "Content Strategy", "SEO/SEM", "Performance Analytics"],
      icon: digitalMarketingIcon,
      color: "secondary"
    },
    {
      id: "martech",
      title: "Martech",
      subtitle: "Công nghệ tiếp thị",
      description: "Ứng dụng công nghệ & dữ liệu để tối ưu tiếp thị",
      features: ["Marketing Automation", "Data Analytics", "AI Tools", "Tech Integration"],
      icon: martechIcon,
      color: "primary"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Chương trình <span className="text-primary">đào tạo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            3 ngành trọng điểm với phương pháp đào tạo thực chiến, 
            cập nhật xu hướng công nghệ mới nhất
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div 
              key={program.id} 
              className="card-hover bg-card rounded-xl p-8 border border-border group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                  <img 
                    src={program.icon} 
                    alt={`${program.title} icon`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-primary font-medium mb-3">
                  {program.subtitle}
                </p>
                <p className="text-muted-foreground">
                  {program.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {program.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                variant="accent" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
              >
                Tìm hiểu thêm
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;