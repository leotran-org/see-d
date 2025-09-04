import { Brain, Users, Briefcase } from "lucide-react";

const MethodologySection = () => {
  const steps = [
    {
      icon: Brain,
      title: "Khởi động tư duy",
      description: "Nhận diện năng lực & hướng nghề phù hợp",
      details: "Đánh giá năng lực cá nhân, định hướng nghề nghiệp rõ ràng"
    },
    {
      icon: Users,
      title: "Rèn năng lực lõi",
      description: "Học qua tình huống thật với mentor thực chiến",
      details: "Dự án thực tế, mentoring 1-1, phản hồi ngay lập tức"
    },
    {
      icon: Briefcase,
      title: "Kết nối thị trường",
      description: "Việc thật, dự án thật, đối tác thật",
      details: "Tham gia dự án thực tế, cơ hội việc làm có sẵn"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Cách SEE-D đào tạo <span className="text-primary">khác biệt</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Phương pháp 3 bước độc quyền, tập trung vào thực hành và kết nối thực tế
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-primary/30 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-primary/30 transform -translate-y-1/2"></div>

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div 
                  key={index}
                  className="text-center relative scroll-animate"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  <div className="bg-card rounded-xl p-8 card-hover border border-border">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 glow-effect">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    
                    <div className="bg-primary text-primary-foreground text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                      {index + 1}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-card-foreground">
                      {step.title}
                    </h3>
                    
                    <p className="text-primary font-medium mb-4">
                      {step.description}
                    </p>
                    
                    <p className="text-sm text-muted-foreground">
                      {step.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-card rounded-xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                <span className="text-primary">RealBase OS</span> - Nền tảng học tập thông minh
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hệ thống dữ liệu đo lường tiến bộ học tập và cá nhân hóa lộ trình 
                phát triển cho từng người học
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;