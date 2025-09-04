import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-background to-secondary-light/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-700"></div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div className="text-center lg:text-left fade-in-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="hero-text-gradient">SEE-D</span>
            <br />
            <span className="text-foreground">Hệ điều hành năng lực</span>
            <br />
            <span className="text-primary">cho tương lai nghề nghiệp</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            Kết nối giáo dục, doanh nghiệp và công nghệ để thế hệ trẻ sẵn sàng hành nghề ngay từ hôm nay.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="lg" className="group">
              Khám phá chương trình
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="accent" size="lg" className="group">
              <Play className="w-5 h-5 mr-2" />
              Liên hệ hợp tác
            </Button>
          </div>
        </div>
        
        {/* Right content */}
        <div className="relative fade-in-right">
          <div className="relative rounded-2xl overflow-hidden card-hover">
            <img 
              src={heroImage} 
              alt="SEE-D Academy - Kết nối giáo dục và doanh nghiệp"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
          </div>
          
          {/* Floating stats */}
          <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Thành phố</div>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Thực chiến</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;