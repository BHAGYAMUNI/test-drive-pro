import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, BookOpen, Target, History } from "lucide-react";

const ExamSelection = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const examData = {
    "jee-main": {
      name: "JEE Main",
      description: "Joint Entrance Examination for engineering admissions",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      icon: "🎯"
    },
    "neet": {
      name: "NEET",
      description: "National Eligibility cum Entrance Test for medical admissions",
      subjects: ["Physics", "Chemistry", "Biology"],
      icon: "🏥"
    },
    "eamcet": {
      name: "EAMCET",
      description: "Engineering, Agriculture & Medical Common Entrance Test",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      icon: "🎓"
    }
  };

  const exam = examData[examId as keyof typeof examData];

  const examHistory = [
    { date: "2024-01-15", type: "Grand Test", score: "245/300", percentage: "81.67%" },
    { date: "2024-01-12", type: "Part Test - Physics", score: "28/30", percentage: "93.33%" },
    { date: "2024-01-10", type: "Grand Test", score: "198/300", percentage: "66.00%" },
    { date: "2024-01-08", type: "Part Test - Mathematics", score: "25/30", percentage: "83.33%" },
  ];

  if (!exam) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Exam not found</h1>
          <Button onClick={() => navigate("/")} className="mt-4">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-nta-blue to-nta-blue-dark text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{exam.icon}</span>
              <div>
                <h1 className="text-2xl font-bold">{exam.name}</h1>
                <p className="text-nta-blue-light">{exam.description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Exam Mode Selection */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Target className="h-6 w-6 text-nta-blue" />
              <h2 className="text-2xl font-bold text-foreground">Select Exam Mode</h2>
            </div>

            {/* Grand Test Card */}
            <Card className="p-6 border-2 hover:border-nta-blue transition-all duration-300 hover:shadow-lg cursor-pointer group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-nta-blue-light rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-nta-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-nta-blue transition-colors">
                      Grand Test
                    </h3>
                    <p className="text-muted-foreground text-sm">Full pattern exam like NTA official</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {exam.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      3 hours
                    </div>
                    <div>All subjects included</div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-nta-blue hover:bg-nta-blue-dark"
                  onClick={() => navigate(`/exam/${examId}/grand-test`)}
                >
                  Start Grand Test
                </Button>
              </div>
            </Card>

            {/* Part Test Card */}
            <Card className="p-6 border-2 hover:border-nta-blue transition-all duration-300 hover:shadow-lg cursor-pointer group">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-nta-blue transition-colors">
                      Part Test
                    </h3>
                    <p className="text-muted-foreground text-sm">Choose specific subject/topic/subtopic</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Select from {exam.subjects.join(", ")} and focus on specific topics
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Flexible duration
                    </div>
                    <div>Subject-wise practice</div>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full border-nta-blue text-nta-blue hover:bg-nta-blue hover:text-primary-foreground"
                  onClick={() => navigate(`/exam/${examId}/part-test`)}
                >
                  Start Part Test
                </Button>
              </div>
            </Card>
          </div>

          {/* Exam History */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <History className="h-6 w-6 text-nta-blue" />
              <h2 className="text-2xl font-bold text-foreground">{exam.name} History</h2>
            </div>
            
            <Card className="overflow-hidden">
              <div className="bg-nta-blue-light px-6 py-4">
                <h3 className="font-semibold text-nta-blue">Recent Attempts</h3>
              </div>
              
              <div className="divide-y divide-border">
                {examHistory.map((record, index) => (
                  <div key={index} className="px-6 py-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{record.type}</p>
                        <p className="text-sm text-muted-foreground">{record.date}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-semibold text-success">{record.score}</p>
                        <p className="text-sm text-muted-foreground">{record.percentage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {examHistory.length === 0 && (
                <div className="px-6 py-8 text-center text-muted-foreground">
                  <p>No previous attempts found</p>
                  <p className="text-sm">Start your first test to see results here</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSelection;