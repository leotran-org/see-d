import { MapPin, Calendar, Target } from "lucide-react";

const ExpansionSection = () => {
  const timeline = [
    {
      period: "2025-2027",
      title: "Mở rộng trong nước",
      description: "Phủ sóng 10 thành phố chiến lược tại Việt Nam",
      cities: ["TP.HCM", "Hà Nội", "Đà Nẵng", "Cần Thơ", "Hải Phòng", "Nha Trang", "Huế", "Quy Nhon", "Vũng Tàu", "Bình Dương"],
      color: "primary"
    },
    {
      period: "2027-2029",
      title: "Mở rộng ASEAN",
      description: "RealBase OS phiên bản quốc tế",
      cities: ["Thailand", "Singapore", "Malaysia", "Indonesia", "Philippines"],
      color: "secondary"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Chiến lược <span className="text-primary">mở rộng</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kế hoạch phát triển bền vững, từ Việt Nam đến ASEAN và toàn cầu
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {timeline.map((phase, index) => (
            <div key={index} className="mb-16 last:mb-0">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="bg-card rounded-xl p-8 border border-border card-hover">
                    <div className="flex items-center mb-6">
                      <div className={`w-12 h-12 bg-${phase.color} rounded-lg flex items-center justify-center mr-4`}>
                        <Calendar className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className={`text-${phase.color} font-bold text-lg`}>
                          {phase.period}
                        </div>
                        <h3 className="text-2xl font-bold text-card-foreground">
                          {phase.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 text-lg">
                      {phase.description}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Target className={`w-5 h-5 text-${phase.color} mr-2`} />
                        <span className="text-card-foreground font-medium">Mục tiêu địa điểm:</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {phase.cities.map((city, cityIndex) => (
                          <div 
                            key={cityIndex}
                            className={`bg-${phase.color}-light/20 text-${phase.color} px-3 py-2 rounded-lg text-sm font-medium text-center`}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} text-center`}>
                  <div className="relative">
                    <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary-light to-secondary-light rounded-full flex items-center justify-center">
                      <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className={`w-24 h-24 text-${phase.color}`} />
                      </div>
                    </div>
                    
                    {/* Floating numbers */}
                    <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold text-xl">
                      {phase.cities.length}
                    </div>
                    
                    {/* Timeline connector */}
                    {index < timeline.length - 1 && (
                      <div className="hidden lg:block absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div className="w-1 h-16 bg-gradient-to-b from-primary to-secondary"></div>
                        <div className="w-4 h-4 bg-secondary rounded-full transform -translate-x-1.5"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-card rounded-xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">
              Tầm nhìn 2030
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Trở thành nền tảng giáo dục thực chiến hàng đầu Đông Nam Á, 
              xuất khẩu nhân lực chất lượng cao và mô hình giáo dục tiên tiến
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpansionSection;