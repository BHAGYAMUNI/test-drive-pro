import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, BookOpen, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const exams = [
    {
      id: "jee-main",
      name: "JEE Main",
      description: "Joint Entrance Examination for engineering admissions",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      duration: "3 hours",
      questions: 90,
      icon: "🎯"
    },
    {
      id: "neet",
      name: "NEET",
      description: "National Eligibility cum Entrance Test for medical admissions",
      subjects: ["Physics", "Chemistry", "Biology"],
      duration: "3 hours 20 min",
      questions: 180,
      icon: "🏥"
    },
    {
      id: "eamcet",
      name: "EAMCET",
      description: "Engineering, Agriculture & Medical Common Entrance Test",
      subjects: ["Physics", "Chemistry", "Mathematics/Biology"],
      duration: "3 hours",
      questions: 160,
      icon: "🎓"
    }
  ];

  const recentHistory = [
    { date: "2024-01-15", exam: "JEE Main", type: "Grand Test", score: "245/300" },
    { date: "2024-01-14", exam: "NEET", type: "Part Test - Physics", score: "42/50" },
    { date: "2024-01-13", exam: "EAMCET", type: "Grand Test", score: "198/200" },
    { date: "2024-01-12", exam: "JEE Main", type: "Part Test - Math", score: "28/30" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-nta-blue to-nta-blue-dark text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">ED Exams</h1>
                <p className="text-nta-blue-light">Online Exam Preparation Platform</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-nta-blue-light">Welcome,</p>
              <p className="text-lg font-semibold">Student</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Choose Your Exam Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Choose Your Exam</h2>
            <p className="text-muted-foreground">Select an exam to start your preparation journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {exams.map((exam, index) => (
              <Card key={exam.id} className="p-6 hover:shadow-xl transition-all duration-500 border-2 hover:border-nta-blue cursor-pointer group transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-card hover:to-nta-blue-light/10 animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                <div className="text-center space-y-4">
                  <div className="text-4xl mb-3 group-hover:animate-float transition-all duration-300 group-hover:scale-110">{exam.icon}</div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-nta-blue transition-all duration-300 group-hover:scale-105">
                    {exam.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exam.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {exam.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {exam.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {exam.questions} Qs
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="premium"
                    className="w-full group-hover:animate-glow"
                    onClick={() => navigate(`/exam/${exam.id}`)}
                  >
                    Start Exam
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Performance History Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-nta-blue" />
            <h2 className="text-2xl font-bold text-foreground">Performance History</h2>
          </div>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-nta-blue-light">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-nta-blue">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-nta-blue">Exam</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-nta-blue">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-nta-blue">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentHistory.map((record, index) => (
                    <tr key={index} className="hover:bg-gradient-to-r hover:from-secondary/50 hover:to-nta-blue-light/20 transition-all duration-300 cursor-pointer group">
                      <td className="px-6 py-4 text-sm text-foreground group-hover:font-medium transition-all duration-300">{record.date}</td>
                      <td className="px-6 py-4 text-sm font-medium text-foreground group-hover:text-nta-blue transition-all duration-300">{record.exam}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300">{record.type}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-success group-hover:scale-110 transition-all duration-300">{record.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;