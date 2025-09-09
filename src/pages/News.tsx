import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const News = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // SEO metadata
    document.title = "Tin tức & Hoạt động - SEE-D Academy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Cập nhật những tin tức và hoạt động mới nhất của SEE-D Academy - học viện thực chiến thế hệ mới');
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: This requires Supabase integration to store emails
    toast({
      title: "Đăng ký thành công!",
      description: "Bạn sẽ nhận được thông báo về các hoạt động mới nhất của SEE-D.",
    });
    setEmail("");
  };

  const newsItems = [
    {
      id: 1,
      title: "SEE-D Academy hợp tác với HUTECH ra mắt chương trình E-commerce thực chiến",
      excerpt: "Chương trình đào tạo mới giúp sinh viên nắm vững kỹ năng thương mại điện tử từ lý thuyết đến thực hành với doanh nghiệp thật.",
      date: "2024-03-15",
      author: "SEE-D Team",
      category: "Hợp tác",
      image: "/lovable-uploads/4a4cbe50-33ef-4af1-a79c-8920cb692bb2.png"
    },
    {
      id: 2,
      title: "Workshop Digital Marketing: Từ chiến lược đến ROI với 100+ sinh viên",
      excerpt: "Sự kiện thu hút hơn 100 sinh viên và chuyên gia, chia sẻ kinh nghiệm thực tế về triển khai chiến dịch marketing đa nền tảng.",
      date: "2024-03-10",
      author: "Nguyễn Song Toàn",
      category: "Sự kiện",
      image: "/lovable-uploads/4a4cbe50-33ef-4af1-a79c-8920cb692bb2.png"
    },
    {
      id: 3,
      title: "SEE-D Academy được vinh danh 'Đơn vị đào tạo sáng tạo năm 2024'",
      excerpt: "Giải thưởng ghi nhận những đóng góp của SEE-D trong việc cải thiện chất lượng giáo dục nghề nghiệp tại Việt Nam.",
      date: "2024-03-05",
      author: "SEE-D Team",
      category: "Thành tựu",
      image: "/lovable-uploads/4a4cbe50-33ef-4af1-a79c-8920cb692bb2.png"
    },
    {
      id: 4,
      title: "Mở rộng hợp tác quốc tế: SEE-D ký MOU với các đối tác ASEAN",
      excerpt: "Thỏa thuận hợp tác mở ra cơ hội cho sinh viên Việt Nam tiếp cận chương trình đào tạo và thị trường lao động khu vực.",
      date: "2024-02-28",
      author: "Phan Sĩ Tuệ",
      category: "Quốc tế",
      image: "/lovable-uploads/4a4cbe50-33ef-4af1-a79c-8920cb692bb2.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-accent">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tin tức & Hoạt động
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Cập nhật những hoạt động mới nhất mà SEE-D tham gia và tổ chức
          </p>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                Đăng ký nhận tin tức
              </CardTitle>
              <CardDescription className="text-lg">
                Nhận thông báo sớm nhất về các hoạt động và cơ hội từ SEE-D Academy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" className="whitespace-nowrap">
                  Đăng ký
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-elegant transition-all duration-300 hover:scale-105">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{item.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(item.date).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    {item.author}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="pb-16">
        <div className="container mx-auto px-4 text-center">
          <Button variant="outline" size="lg">
            Xem thêm tin tức
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
