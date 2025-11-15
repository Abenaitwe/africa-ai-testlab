import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ExternalLink, Calendar, Eye, Star, Trash2, Edit } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { UpvoteButton } from "@/components/UpvoteButton";
import { motion } from "framer-motion";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Review form state
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [userReview, setUserReview] = useState<any>(null);

  useEffect(() => {
    loadProject();
    checkUser();
  }, [id]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const loadProject = async () => {
    try {
      // Increment view count
      await supabase.rpc('increment_project_views', { project_id: id });

      // Load project with all details
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select(`
          *,
          profiles (id, username, full_name, avatar_url),
          project_images (id, image_url, display_order)
        `)
        .eq('id', id)
        .single();

      if (projectError) throw projectError;

      if (projectData) {
        setProject(projectData);
        
        // Check if current user is the owner
        const { data: { session } } = await supabase.auth.getSession();
        setIsOwner(session?.user?.id === projectData.user_id);

        // Sort images by display order
        if (projectData.project_images) {
          projectData.project_images.sort((a: any, b: any) => a.display_order - b.display_order);
        }
      }

      // Load reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (username, full_name, avatar_url)
        `)
        .eq('project_id', id)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;
      setReviews(reviewsData || []);

      // Check if user has already reviewed
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const existingReview = reviewsData?.find((r: any) => r.user_id === session.user.id);
        setUserReview(existingReview || null);
        if (existingReview) {
          setReviewRating(existingReview.rating);
          setReviewComment(existingReview.comment || "");
        }
      }

    } catch (error: any) {
      console.error('Error loading project:', error);
      toast({
        title: "Error",
        description: "Failed to load project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to leave a review",
        variant: "destructive",
      });
      return;
    }

    if (reviewRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating",
        variant: "destructive",
      });
      return;
    }

    setSubmittingReview(true);

    try {
      if (userReview) {
        // Update existing review
        const { error } = await supabase
          .from('reviews')
          .update({
            rating: reviewRating,
            comment: reviewComment,
          })
          .eq('id', userReview.id);

        if (error) throw error;

        toast({
          title: "Review updated!",
          description: "Your review has been updated successfully.",
        });
      } else {
        // Create new review
        const { error } = await supabase
          .from('reviews')
          .insert({
            project_id: id,
            user_id: user.id,
            rating: reviewRating,
            comment: reviewComment,
          });

        if (error) throw error;

        toast({
          title: "Review submitted!",
          description: "Thank you for your feedback.",
        });
      }

      // Reload reviews
      loadProject();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      });

      navigate('/explore');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-off-white flex items-center justify-center">
        <div className="text-center bg-card/95 backdrop-blur-sm p-8 rounded-lg border-4 border-accent shadow-thick">
          <p className="text-xl">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background-off-white flex items-center justify-center">
        <div className="text-center bg-card/95 backdrop-blur-sm p-8 rounded-lg border-4 border-accent shadow-thick">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="mb-6">This project doesn't exist.</p>
          <Link to="/explore">
            <Button>Browse Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-background-off-white">
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Project Header */}
            <Card className="mb-8 border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
                      <Badge variant="secondary" className="text-md md:text-lg px-4 py-1 border-2 border-accent capitalize">
                        {project.ai_tool}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Link to={`/profile/${project.profiles?.username}`}>
                        <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                          <Avatar className="w-10 h-10 border-2 border-accent">
                            <AvatarImage src={project.profiles?.avatar_url} />
                            <AvatarFallback>
                              {project.profiles?.username?.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">
                              {project.profiles?.full_name || project.profiles?.username}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              @{project.profiles?.username}
                            </p>
                          </div>
                        </div>
                      </Link>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(project.created_at).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>

                    <Badge variant="outline" className="mb-4 capitalize">{project.category}</Badge>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <UpvoteButton 
                      projectId={project.id} 
                      initialUpvotes={project.upvotes || 0}
                      size="lg"
                    />
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Eye className="w-5 h-5" />
                      <span className="font-semibold">{project.views || 0} views</span>
                    </div>

                    {reviews.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary fill-primary" />
                        <span className="font-semibold">{averageRating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">
                          ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                        </span>
                      </div>
                    )}

                    {isOwner && (
                      <div className="flex gap-2 pt-4 border-t border-border">
                        <Link to={`/submit/${project.id}`}>
                          <Button variant="outline" size="sm" className="border-2 border-accent">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="border-2 border-accent">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-4 border-accent">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                project and remove all associated data including reviews and upvotes.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-2 border-accent">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={handleDeleteProject}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 border-2 border-accent"
                              >
                                Delete Project
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">About This Project</h3>
                  <p className="text-lg leading-relaxed">{project.description}</p>
                </div>

                {/* Links */}
                {(project.live_url || project.video_url) && (
                  <div className="flex flex-wrap gap-3">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-2 border-accent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Live Site
                        </Button>
                      </a>
                    )}
                    {project.video_url && (
                      <a href={project.video_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-2 border-accent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Watch Demo
                        </Button>
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Image Gallery */}
            {project.project_images && project.project_images.length > 0 && (
              <Card className="mb-8 border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-2xl">Screenshots</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  {/* Main Image */}
                  <div className="mb-4">
                    <img
                      src={project.project_images[selectedImage]?.image_url}
                      alt={`Screenshot ${selectedImage + 1}`}
                      className="w-full h-[300px] md:h-[500px] object-contain bg-muted/50 border-4 border-accent rounded-lg"
                    />
                  </div>

                  {/* Thumbnail Grid */}
                  {project.project_images.length > 1 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {project.project_images.map((img: any, index: number) => (
                        <motion.button
                          key={img.id}
                          onClick={() => setSelectedImage(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative aspect-video overflow-hidden border-4 ${
                            selectedImage === index ? 'border-primary' : 'border-accent'
                          } rounded-lg cursor-pointer hover:border-primary transition-colors`}
                        >
                          <img
                            src={img.image_url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Review Form */}
            {user && !isOwner && (
              <Card className="mb-8 border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                <CardHeader className="p-6">
                  <CardTitle className="text-2xl">
                    {userReview ? 'Update Your Review' : 'Leave a Review'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Rating *</Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-10 h-10 ${
                                star <= reviewRating
                                  ? 'text-primary fill-primary'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="review-comment">Your Review</Label>
                      <Textarea
                        id="review-comment"
                        rows={4}
                        placeholder="Share your thoughts about this project..."
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <Button type="submit" disabled={submittingReview} className="border-2 border-accent">
                      {submittingReview ? 'Submitting...' : (userReview ? 'Update Review' : 'Submit Review')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Reviews List */}
            <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl">
                  Reviews ({reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {reviews.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No reviews yet. Be the first to review this project!
                  </p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-border pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          <Link to={`/profile/${review.profiles?.username}`}>
                            <Avatar className="w-12 h-12 border-2 border-accent">
                              <AvatarImage src={review.profiles?.avatar_url} />
                              <AvatarFallback>
                                {review.profiles?.username?.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <Link to={`/profile/${review.profiles?.username}`}>
                                  <p className="font-semibold hover:text-primary transition-colors">
                                    {review.profiles?.full_name || review.profiles?.username}
                                  </p>
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(review.created_at).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? 'text-primary fill-primary'
                                        : 'text-muted-foreground'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            {review.comment && (
                              <p className="text-foreground leading-relaxed">{review.comment}</p>
                            )}
                            
                            {review.is_bug_report && (
                              <Badge variant="destructive" className="mt-2">Bug Report</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ProjectDetail;
