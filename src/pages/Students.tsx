import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock students data
  const students = [
    {
      id: "1",
      name: "Jane Kamau",
      username: "janekamau",
      university: "University of Nairobi",
      bio: "Building apps to solve local problems. Passionate about education tech.",
      skills: ["React", "Mobile Dev", "UI/UX"],
      projects: 5,
      reviews: 23,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
    {
      id: "2",
      name: "David Ochieng",
      username: "davidoch",
      university: "Makerere University",
      bio: "AgriTech enthusiast connecting farmers to markets.",
      skills: ["Next.js", "AI", "Data"],
      projects: 8,
      reviews: 45,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: "3",
      name: "Sarah Mwangi",
      username: "sarahmw",
      university: "Kenyatta University",
      bio: "Healthcare apps for rural communities. Saving lives through code.",
      skills: ["Flutter", "Backend", "APIs"],
      projects: 6,
      reviews: 31,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "4",
      name: "John Mutua",
      username: "johnmutua",
      university: "Strathmore University",
      bio: "Transportation and logistics tech. Making cities safer.",
      skills: ["Vue", "Maps", "Real-time"],
      projects: 4,
      reviews: 19,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "5",
      name: "Grace Wanjiru",
      username: "gracew",
      university: "JKUAT",
      bio: "Environmental tech advocate. Green solutions for a better tomorrow.",
      skills: ["Angular", "IoT", "Sustainability"],
      projects: 7,
      reviews: 38,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    },
    {
      id: "6",
      name: "Michael Otieno",
      username: "mikeot",
      university: "Moi University",
      bio: "E-commerce platforms for local artisans. Supporting African creators.",
      skills: ["React", "Payment", "Design"],
      projects: 9,
      reviews: 52,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="mb-2">Student Community</h1>
            <p className="text-muted-foreground text-lg">
              Meet the testers and builders pushing AI tools to their limits
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, university, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <Link key={student.id} to={`/profile/${student.username}`}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full border-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold truncate">{student.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">@{student.username}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{student.university}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {student.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {student.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm pt-4 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{student.projects}</span>
                        <span className="text-muted-foreground">projects</span>
                      </div>
                      <div className="text-muted-foreground">
                        {student.reviews} reviews
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Students;
