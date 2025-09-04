import { User, Building2, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ParticipantsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Người học & <span className="text-primary">Doanh nghiệp</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giải pháp toàn diện cho cả cá nhân và tổ chức trong việc phát triển năng lực
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* For Individuals */}
          <div className="bg-card rounded-xl p-8 border border-border card-hover">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Dành cho Người học
              </h3>
              <p className="text-muted-foreground">
                Phát triển bản thân với lộ trình cá nhân hóa và cơ hội nghề nghiệp rõ ràng
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    Cá nhân hóa lộ trình
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Đánh giá năng lực ban đầu và thiết kế lộ trình học phù hợp với mục tiêu cá nhân
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    Đo lường tiến bộ
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Theo dõi quá trình học tập qua RealBase OS với dữ liệu chi tiết và phản hồi tức thì
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Building2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    Mở rộng cơ hội nghề nghiệp
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Kết nối trực tiếp với doanh nghiệp đối tác và cơ hội việc làm phù hợp
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">85%</div>
                  <div className="text-xs text-muted-foreground">Có việc sau khóa học</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">92%</div>
                  <div className="text-xs text-muted-foreground">Hài lòng với chương trình</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">150%</div>
                  <div className="text-xs text-muted-foreground">Tăng mức lương trung bình</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="hero" className="w-full">
                Đăng ký học ngay
              </Button>
            </div>
          </div>

          {/* For Businesses */}
          <div className="bg-card rounded-xl p-8 border border-border card-hover">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-secondary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Dành cho Doanh nghiệp
              </h3>
              <p className="text-muted-foreground">
                Tìm kiếm và đào tạo nhân sự chất lượng cao theo nhu cầu thực tế
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Target className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    Đồng thiết kế chương trình
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Tham gia xây dựng nội dung đào tạo phù hợp với nhu cầu thực tế của doanh nghiệp
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    Tiếp cận ứng viên đã rèn đúng kỹ năng
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Tuyển dụng từ nguồn nhân lực đã được đào tạo chuyên sâu theo yêu cầu
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1">
                    Nâng cao năng suất
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Nhân viên mới có thể làm việc hiệu quả ngay từ ngày đầu
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-secondary">50+</div>
                  <div className="text-xs text-muted-foreground">Doanh nghiệp đối tác</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">70%</div>
                  <div className="text-xs text-muted-foreground">Giảm thời gian tuyển dụng</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">95%</div>
                  <div className="text-xs text-muted-foreground">Hài lòng với chất lượng</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="cta" className="w-full">
                Hợp tác với SEE-D
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipantsSection;