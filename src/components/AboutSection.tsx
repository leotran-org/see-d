const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Giới thiệu <span className="text-primary">SEE-D</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="card-hover bg-card rounded-xl p-6">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Học viện thực chiến</h3>
              <p className="text-muted-foreground">
                Giải quyết đứt gãy giữa giáo dục và nhu cầu doanh nghiệp thực tế
              </p>
            </div>
            
            <div className="card-hover bg-card rounded-xl p-6">
              <div className="w-12 h-12 bg-secondary-light rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-secondary rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Năng lực nền tảng</h3>
              <p className="text-muted-foreground">
                Xây dựng năng lực nền tảng và rèn kỹ năng thực tế cần thiết
              </p>
            </div>
            
            <div className="card-hover bg-card rounded-xl p-6">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Kết nối thị trường</h3>
              <p className="text-muted-foreground">
                Kết nối trực tiếp với thị trường lao động và cơ hội nghề nghiệp
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Tầm nhìn</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Trở thành đơn vị giáo dục hàng đầu Việt Nam, mở rộng ASEAN, 
              xuất khẩu nhân lực chất lượng cao.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;