import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Link as LinkIcon, Calendar, Star, Award } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    try {
      // Get profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      setProfile(profileData);

      // Check if this is user's own profile
      const { data: { session } } = await supabase.auth.getSession();
      setIsOwnProfile(session?.user?.id === profileData?.id);

      if (profileData) {
        // Get user's projects
        const { data: projectsData } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', profileData.id)
          .order('created_at', { ascending: false });
        setProjects(projectsData || []);

        // Get user's reviews
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select(`
            *,
            projects (title, id)
          `)
          .eq('user_id', profileData.id)
          .order('created_at', { ascending: false });
        setReviews(reviewsData || []);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-card/95 backdrop-blur-sm p-8 rounded-lg border-4 border-accent shadow-thick">
          <p className="text-xl">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-card/95 backdrop-blur-sm p-8 rounded-lg border-4 border-accent shadow-thick">
          <h1 className="text-4xl font-bold mb-4">Profile Not Found</h1>
          <p className="mb-6">This user doesn't exist.</p>
          <Link to="/testers">
            <Button>Browse Testers</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Profile Header */}
            <Card className="mb-8 border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <Avatar className="w-32 h-32 border-4 border-accent shadow-thick">
                    <AvatarImage src={profile.avatar_url} alt={profile.username} />
                    <AvatarFallback className="text-4xl">{profile.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{profile.full_name}</h1>
                        <p className="text-xl text-muted-foreground mb-2">@{profile.username}</p>
                        <Badge variant="secondary" className="border-2 border-accent">
                          {profile.user_type === 'tester' ? 'Tester' : 'Builder'}
                        </Badge>
                      </div>
                      {isOwnProfile && (
                        <Link to="/settings">
                          <Button variant="outline">Edit Profile</Button>
                        </Link>
                      )}
                    </div>

                    {profile.bio && (
                      <p className="text-lg mb-4">{profile.bio}</p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {profile.university && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.university}</span>
                        </div>
                      )}
                      {profile.website_url && (
                        <div className="flex items-center gap-1">
                          <LinkIcon className="w-4 h-4" />
                          <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            Website
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>

                    {profile.skills && profile.skills.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-2">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill: string) => (
                            <Badge key={skill} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{projects.length}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{reviews.length}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {projects.reduce((sum, p) => sum + (p.upvotes || 0), 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Upvotes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects & Reviews Tabs */}
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 border-4 border-accent">
                <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="projects">
                {projects.length === 0 ? (
                  <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No projects yet</p>
                      {isOwnProfile && (
                        <Link to="/submit">
                          <Button className="mt-4">Submit Your First Project</Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <Link key={project.id} to={`/project/${project.id}`}>
                        <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm hover:shadow-thick-hover transition-all cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                              <Badge variant="secondary" className="ml-2 capitalize">{project.ai_tool}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Award className="w-4 h-4 text-primary" />
                                  <span className="font-semibold">▲ {project.upvotes || 0}</span>
                                </div>
                                <span className="text-muted-foreground text-sm">
                                  {new Date(project.created_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews">
                {reviews.length === 0 ? (
                  <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <p className="text-muted-foreground">No reviews yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-bold">{review.projects?.title}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-primary fill-primary' : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-muted-foreground">{review.comment}</p>
                          )}
                          {review.is_bug_report && (
                            <Badge variant="destructive" className="mt-2">Bug Report</Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Profile;
