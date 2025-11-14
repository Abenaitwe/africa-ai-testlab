import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [topTools, setTopTools] = useState<any[]>([]);
  const [topTesters, setTopTesters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = async () => {
    setLoading(true);
    try {
      // Load top AI tools (ranked by total upvotes and project count)
      const { data: toolsData } = await supabase
        .from('projects')
        .select('ai_tool, upvotes')
        .order('upvotes', { ascending: false });

      if (toolsData) {
        // Aggregate by AI tool
        const toolStats: any = {};
        toolsData.forEach((project) => {
          if (!toolStats[project.ai_tool]) {
            toolStats[project.ai_tool] = {
              name: project.ai_tool,
              projects: 0,
              totalUpvotes: 0,
            };
          }
          toolStats[project.ai_tool].projects += 1;
          toolStats[project.ai_tool].totalUpvotes += project.upvotes || 0;
        });

        // Convert to array and calculate average upvotes, then sort
        const toolsArray = Object.values(toolStats).map((tool: any) => ({
          ...tool,
          avgUpvotes: tool.totalUpvotes / tool.projects,
        })).sort((a: any, b: any) => b.totalUpvotes - a.totalUpvotes);

        setTopTools(toolsArray.slice(0, 10));
      }

      // Load top testers (ranked by number of projects + reviews)
      const { data: testersData } = await supabase
        .from('profiles')
        .select(`
          *,
          projects (count),
          reviews (count)
        `)
        .eq('user_type', 'tester')
        .limit(20);

      if (testersData) {
        // Calculate score and sort
        const testersWithScore = testersData.map((tester: any) => {
          const projectsCount = tester.projects?.[0]?.count || 0;
          const reviewsCount = tester.reviews?.[0]?.count || 0;
          // Score: projects worth 3 points, reviews worth 1 point
          const score = (projectsCount * 3) + reviewsCount;
          return {
            ...tester,
            projectsCount,
            reviewsCount,
            score,
          };
        }).sort((a, b) => b.score - a.score);

        setTopTesters(testersWithScore.slice(0, 10));
      }
    } catch (error) {
      console.error('Error loading leaderboards:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrophyColor = (index: number) => {
    if (index === 0) return "text-primary";
    if (index === 1) return "text-accent";
    if (index === 2) return "text-secondary";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="inline-block bg-card/95 backdrop-blur-sm border-4 border-accent shadow-thick p-8">
              <h1 className="mb-2">Leaderboards</h1>
              <p className="text-muted-foreground text-lg">
                Top-performing tools and most active community members
              </p>
            </div>
          </div>

          <Tabs defaultValue="tools" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="tools">Top AI Tools</TabsTrigger>
              <TabsTrigger value="testers">Top Testers</TabsTrigger>
            </TabsList>

            <TabsContent value="tools">
              <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-primary" />
                    Top AI Builder Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-8 pt-0">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading rankings...</p>
                    </div>
                  ) : topTools.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No tools ranked yet. Submit a project to get started!</p>
                    </div>
                  ) : (
                    topTools.map((tool, index) => (
                      <div
                        key={tool.name}
                        className="flex items-center gap-4 p-6 rounded-lg border-3 border-accent bg-card shadow-soft hover:shadow-thick transition-all hover:-translate-y-1"
                      >
                        <div className={`text-4xl font-bold ${getTrophyColor(index)}`}>
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg capitalize">{tool.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4 text-primary" />
                              <span className="font-semibold">{tool.totalUpvotes}</span>
                              <span>upvotes</span>
                            </div>
                            <span>{tool.projects} projects</span>
                            <span>{Math.round(tool.avgUpvotes)} avg upvotes/project</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Rankings based on total upvotes and number of projects
                </p>
              </div>
            </TabsContent>

            <TabsContent value="testers">
              <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-primary" />
                    Top Testers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-8 pt-0">
                  {loading ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Loading rankings...</p>
                    </div>
                  ) : topTesters.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No testers ranked yet. Join and start contributing!</p>
                    </div>
                  ) : (
                    topTesters.map((tester, index) => (
                      <Link key={tester.username} to={`/profile/${tester.username}`}>
                        <div className="flex items-center gap-4 p-6 rounded-lg border-3 border-accent bg-card shadow-soft hover:shadow-thick transition-all hover:-translate-y-1 cursor-pointer">
                          <div className={`text-4xl font-bold ${getTrophyColor(index)}`}>
                            #{index + 1}
                          </div>
                          <Avatar className="w-12 h-12 border-2 border-accent">
                            <AvatarImage src={tester.avatar_url} alt={tester.full_name} />
                            <AvatarFallback>
                              {tester.full_name?.split(' ').map((n: string) => n[0]).join('') || tester.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-bold">{tester.full_name || tester.username}</h3>
                            <p className="text-sm text-muted-foreground">@{tester.username}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 justify-end mb-1">
                              <Award className="w-5 h-5 text-primary" />
                              <span className="font-bold text-lg">{tester.score}</span>
                              <span className="text-sm text-muted-foreground">pts</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {tester.reviewsCount} reviews · {tester.projectsCount} projects
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Rankings based on activity: 3 points per project, 1 point per review
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
