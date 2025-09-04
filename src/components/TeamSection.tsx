import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamSection = () => {
  const mentors = [
    {
      name: "Nguyễn Song Toàn",
      title: "Chuyên gia Digital & Social Marketing",
      company: "PNJ",
      description: "10+ năm kinh nghiệm marketing đa nền tảng, chuyên gia social commerce",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Nguyễn Phúc Khoa",
      title: "Chủ tịch HĐQT VISSAN",
      company: "Trưởng ngành TMĐT HUTECH",
      description: "Lãnh đạo doanh nghiệp hàng đầu, chuyên gia e-commerce và quản trị",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Phan Sĩ Tuệ",
      title: "MBA, Founder & Startup Advisor",
      company: "Ecosystem Builder",
      description: "Mentor khởi nghiệp, chuyên gia phát triển hệ sinh thái startup",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Trần Kim Duy Lân",
      title: "Chuyên gia AI & Blockchain",
      company: "Tech Innovator & Educator",
      description: "Researcher AI/Blockchain, giảng viên đại học, mentor công nghệ",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Đội ngũ <span className="text-primary">Mentor</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Những chuyên gia hàng đầu trong ngành, sẵn sàng chia sẻ kinh nghiệm thực tiễn
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 card-hover border border-border text-center scroll-animate"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                  <img 
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-card-foreground mb-2">
                {mentor.name}
              </h3>
              
              <p className="text-primary font-medium text-sm mb-1">
                {mentor.title}
              </p>
              
              <p className="text-secondary text-sm font-medium mb-3">
                {mentor.company}
              </p>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {mentor.description}
              </p>

              <div className="flex justify-center space-x-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-light to-secondary-light rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Tham gia với tư cách Mentor?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Chúng tôi luôn tìm kiếm những chuyên gia có kinh nghiệm để chia sẻ 
              và hướng dẫn thế hệ trẻ
            </p>
            <Button variant="hero" size="lg">
              Đăng ký làm Mentor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;