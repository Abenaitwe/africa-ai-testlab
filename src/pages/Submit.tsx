import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Upload, Link as LinkIcon, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ai_tool: "",
    category: "",
    tags: "",
    live_url: "",
    video_url: "",
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please login to submit a project",
        variant: "destructive",
      });
      navigate('/login');
    } else {
      setUser(session.user);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 5) {
        toast({
          title: "Too many images",
          description: "You can upload a maximum of 5 images",
          variant: "destructive",
        });
        return;
      }

      setImages([...images, ...filesArray]);
      
      // Create preview URLs
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    
    // Revoke the object URL to free memory
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const uploadImage = async (file: File, projectId: string, order: number) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `project-images/${projectId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    return { image_url: publicUrl, display_order: order };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to submit a project",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          ai_tool: formData.ai_tool,
          category: formData.category,
          tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
          live_url: formData.live_url || null,
          video_url: formData.video_url || null,
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload images if any
      if (images.length > 0 && project) {
        const imagePromises = images.map((file, index) =>
          uploadImage(file, project.id, index)
        );

        const imageData = await Promise.all(imagePromises);

        const { error: imagesError } = await supabase
          .from('project_images')
          .insert(
            imageData.map(img => ({
              project_id: project.id,
              ...img,
            }))
          );

        if (imagesError) throw imagesError;
      }

      toast({
        title: "Project submitted!",
        description: "Your project has been published successfully.",
      });

      navigate('/explore');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/retro-waves-bg.jpg)' }}>
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-8 text-center">
            <div className="inline-block bg-card/95 backdrop-blur-sm border-4 border-accent shadow-thick p-8">
              <h1 className="mb-2">Submit Your Project</h1>
              <p className="text-muted-foreground text-lg">
                Share your AI-built application with the community
              </p>
            </div>
          </div>

          <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
            <CardHeader className="p-8">
              <CardTitle className="text-3xl">Project Details</CardTitle>
              <CardDescription>
                Fill in the details about your AI-built application
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., EduTrack Mobile"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your project does and the problem it solves..."
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tool">AI Builder Tool *</Label>
                    <Select
                      value={formData.ai_tool}
                      onValueChange={(value) => setFormData({ ...formData, ai_tool: value })}
                      required
                    >
                      <SelectTrigger id="tool">
                        <SelectValue placeholder="Select tool" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lovable">Lovable</SelectItem>
                        <SelectItem value="mocha">Mocha Orchids</SelectItem>
                        <SelectItem value="builder">Builder.ai</SelectItem>
                        <SelectItem value="v0">v0.dev</SelectItem>
                        <SelectItem value="cursor">Cursor</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                      required
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="transport">Transportation</SelectItem>
                        <SelectItem value="environment">Environment</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., mobile, offline, education (comma-separated)"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground">
                    Add tags to help users find your project
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="live-url">Live URL</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="live-url"
                      type="url"
                      placeholder="https://your-project.com"
                      className="pl-10"
                      value={formData.live_url}
                      onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-url">Video Demo URL (Optional)</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="video-url"
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      className="pl-10"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Screenshots *</Label>
                  
                  {/* Image Previews */}
                  {previews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-accent"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <label
                    htmlFor="screenshots"
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer block"
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 10MB (Max 5 images)
                    </p>
                    <input
                      id="screenshots"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Submitting..." : "Submit Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-card/95 backdrop-blur-sm rounded-lg border-4 border-accent shadow-thick">
            <h3 className="font-semibold text-xl mb-4">Submission Guidelines</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Ensure your project is functional and accessible</li>
              <li>• Provide clear screenshots showing key features</li>
              <li>• Be honest about the AI tool used and any limitations</li>
              <li>• Projects are reviewed within 24-48 hours</li>
            </ul>
          </div>
        </div>
      </div>

        <Footer />
      </div>
    </div>
  );
};

export default Submit;
