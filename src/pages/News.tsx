import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Plus } from "lucide-react";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useSeedPostMeta } from "@/hooks/use-get-posts-meta";
import { useDirectusSession } from "@/hooks/use-validate-admin";

const FALLBACK_IMG = "/lovable-uploads/4a4cbe50-33ef-4af1-a79c-8920cb692bb2.png";
const CREATE_POST_PATH = "/post/new"; // 🔧 Change this if your route differs

const News = () => {
  const { user, isAuthenticated, validating } = useDirectusSession("/cms-api");

  // Helper to decide if the user is an admin
  const isAdmin = useMemo(() => {
    const role = (user as any)?.role;
    if (!role) return false;
    return true;
  }, [user]);

  // Log once we know the auth state
  useEffect(() => {
    if (validating) return; // wait until validation finishes
    if (!isAuthenticated || !user) return;
    console.log(isAdmin ? "hello admin" : "hello user");
  }, [validating, isAuthenticated, user, isAdmin]);

  const [email, setEmail] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const { toast } = useToast();

  // Fetch posts
  const { data, loading, error } = useSeedPostMeta();

  useEffect(() => {
    // SEO metadata
    document.title = "Tin tức & Hoạt động - SEE-D Academy";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Cập nhật những tin tức và hoạt động mới nhất của SEE-D Academy - học viện thực chiến thế hệ mới"
      );
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Không thể tải tin tức",
        description: "Đang hiển thị dữ liệu dự phòng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate Supabase to store emails
    toast({
      title: "Đăng ký thành công!",
      description: "Bạn sẽ nhận được thông báo về các hoạt động mới nhất của SEE-D.",
    });
    setEmail("");
  };

  // Sort newest first (created_at desc)
  const sortedItems = useMemo(() => {
    return [...(data ?? [])].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [data]);

  const visibleItems = sortedItems.slice(0, visibleCount);
  const canLoadMore = visibleCount < sortedItems.length;

  // ————————————————————————————————————————————————
  // Admin-only Create Post Card
  // ————————————————————————————————————————————————
  const AdminCreateCard = () => (
    <Card className="group hover:shadow-elegant transition-transform duration-300 transform hover:scale-105 border-dashed border-2 border-primary">
      <Link
        to={CREATE_POST_PATH}
        className="flex flex-col items-center justify-center aspect-video rounded-t-lg bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary hover:bg-muted/10 transition-colors"
        aria-label="Tạo bài viết mới"
      >
        <Plus className="h-14 w-14 mb-3 text-primary group-hover:text-accent transition-colors" />
        <span className="text-lg font-semibold text-muted-foreground group-hover:text-primary">
          Tạo bài viết mới
        </span>
      </Link>
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground text-center">
          Bắt đầu chia sẻ thông tin mới từ SEE-D Academy.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-accent">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Tin tức & Hoạt động</h1>
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
              <CardTitle className="text-2xl font-bold text-primary">Đăng ký nhận tin tức</CardTitle>
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
          {/* Loading skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-muted animate-pulse" />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="h-6 w-20 bg-muted rounded animate-pulse" />
                      <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-muted rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {visibleItems.length === 0 ? (
                <div className="">
                  {isAdmin ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      <AdminCreateCard />
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">Chưa có bài viết nào.</div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Admin create-post card appears first */}
                  {isAdmin && <AdminCreateCard />}

                  {visibleItems.map((item) => (
                    <Card
                      key={item.id}
                      className="group hover:shadow-elegant transition-all duration-300 hover:scale-105"
                    >
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={item.cover_image_url || FALLBACK_IMG}
                          alt={item.title}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                          }}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{item.status || "Bản nháp"}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(item.created_at).toLocaleDateString("vi-VN")}
                          </div>
                        </div>

                        {/* Title optionally links to detail page by slug */}
                        {item.slug ? (
                          <Link to={`/post/${item.slug}`}>
                            <CardTitle className="text-xl group-hover:text-primary transition-colors">
                              {item.title}
                            </CardTitle>
                          </Link>
                        ) : (
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {item.title}
                          </CardTitle>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{item.excerpt}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-1" />
                          {/* We only have author_id in meta; display a sensible fallback */}
                          {item.author_id ? `Tác giả #${item.author_id}` : "SEE-D Team"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Load More */}
      {!loading && sortedItems.length > 0 && (
        <section className="pb-16">
          <div className="container mx-auto px-4 text-center">
            {canLoadMore ? (
              <Button variant="outline" size="lg" onClick={() => setVisibleCount((c) => c + 6)}>
                Xem thêm tin tức
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <p className="text-muted-foreground">Bạn đã xem tất cả bài viết.</p>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default News;

