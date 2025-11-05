import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, TrendingUp } from "lucide-react";

const Leaderboard = () => {
  // Mock leaderboard data
  const topTools = [
    { name: "Lovable", rating: 4.7, projects: 45, reviews: 234, trend: "+12%" },
    { name: "Mocha Orchids", rating: 4.5, projects: 38, reviews: 189, trend: "+8%" },
    { name: "Builder.ai", rating: 4.3, projects: 31, reviews: 156, trend: "+5%" },
  ];

  const topTesters = [
    {
      name: "Michael Otieno",
      username: "mikeot",
      reviews: 52,
      projects: 9,
      rating: 4.8,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "David Ochieng",
      username: "davidoch",
      reviews: 45,
      projects: 8,
      rating: 4.7,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      name: "Grace Wanjiru",
      username: "gracew",
      reviews: 38,
      projects: 7,
      rating: 4.6,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    },
    {
      name: "Sarah Mwangi",
      username: "sarahmw",
      reviews: 31,
      projects: 6,
      rating: 4.5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Jane Kamau",
      username: "janekamau",
      reviews: 23,
      projects: 5,
      rating: 4.4,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
  ];

  const getTrophyColor = (index: number) => {
    if (index === 0) return "text-primary";
    if (index === 1) return "text-accent";
    if (index === 2) return "text-secondary";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/retro-waves-bg.jpg)' }}>
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-2">Leaderboards</h1>
            <p className="text-muted-foreground text-lg">
              Top-performing tools and most active community members
            </p>
          </div>

          <Tabs defaultValue="tools" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="tools">Top AI Tools</TabsTrigger>
              <TabsTrigger value="testers">Top Testers</TabsTrigger>
            </TabsList>

            <TabsContent value="tools">
              <Card className="border-4 border-accent shadow-thick">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-primary" />
                    Top AI Builder Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-8 pt-0">
                  {topTools.map((tool, index) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-4 p-6 rounded-lg border-3 border-accent bg-card shadow-soft hover:shadow-thick transition-all hover:-translate-y-1"
                    >
                      <div className={`text-4xl font-bold ${getTrophyColor(index)}`}>
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{tool.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="font-semibold">{tool.rating}</span>
                          </div>
                          <span>{tool.projects} projects</span>
                          <span>{tool.reviews} reviews</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-accent font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        {tool.trend}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Rankings based on average ratings and community feedback
                </p>
              </div>
            </TabsContent>

            <TabsContent value="testers">
              <Card className="border-4 border-accent shadow-thick">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-primary" />
                    Top Testers & Builders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-8 pt-0">
                  {topTesters.map((tester, index) => (
                    <div
                      key={tester.username}
                      className="flex items-center gap-4 p-6 rounded-lg border-3 border-accent bg-card shadow-soft hover:shadow-thick transition-all hover:-translate-y-1 cursor-pointer"
                    >
                      <div className={`text-4xl font-bold ${getTrophyColor(index)}`}>
                        #{index + 1}
                      </div>
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={tester.avatar} alt={tester.name} />
                        <AvatarFallback>{tester.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold">{tester.name}</h3>
                        <p className="text-sm text-muted-foreground">@{tester.username}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          <span className="font-semibold">{tester.rating}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tester.reviews} reviews · {tester.projects} projects
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Rankings based on number of reviews, projects, and community contribution
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Leaderboard;
