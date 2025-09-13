import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, Circle, Flag } from "lucide-react";

const GrandTest = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds
  const [activeSubject, setActiveSubject] = useState("Physics");
  
  const examSubjects = {
    "jee-main": ["Physics", "Chemistry", "Mathematics"],
    "neet": ["Physics", "Chemistry", "Biology"],
    "eamcet": ["Physics", "Chemistry", "Mathematics"]
  };
  
  const subjects = examSubjects[examId as keyof typeof examSubjects] || ["Physics", "Chemistry", "Mathematics"];
  
  // Mock question data
  const sampleQuestion = {
    id: 1,
    subject: "Physics",
    question: "A particle moves in a straight line with constant acceleration. If its velocity changes from 10 m/s to 30 m/s in 4 seconds, what is the acceleration?",
    options: [
      "2.5 m/s²",
      "5 m/s²", 
      "7.5 m/s²",
      "10 m/s²"
    ],
    correctAnswer: "B"
  };
  
  // Mock question palette data (30 questions per subject)
  const questionStatus = Array.from({ length: 90 }, (_, i) => ({
    number: i + 1,
    status: i < 5 ? "answered" : i < 10 ? "marked" : "not-answered",
    subject: subjects[Math.floor(i / 30)]
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "answered":
        return <CheckCircle className="h-4 w-4 text-question-answered" />;
      case "marked":
        return <Flag className="h-4 w-4 text-question-marked" />;
      default:
        return <Circle className="h-4 w-4 text-question-not-answered" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "answered":
        return "bg-question-answered text-white";
      case "marked":
        return "bg-question-marked text-white";
      default:
        return "bg-question-not-answered text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NTA-style Header */}
      <header className="bg-gradient-to-r from-nta-blue to-nta-blue-dark text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/exam/${examId}`)}
                className="text-primary-foreground hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-bold">{examId?.toUpperCase()} - Grand Test</h1>
                <p className="text-sm text-nta-blue-light">Online Examination System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-lg font-bold">
                  <Clock className="h-5 w-5" />
                  {formatTime(timeLeft)}
                </div>
                <p className="text-xs text-nta-blue-light">Time Remaining</p>
              </div>
              
              <Button 
                variant="destructive" 
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                Submit Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Questions */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Subject Tabs */}
          <div className="flex gap-2 mb-6">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={activeSubject === subject ? "default" : "outline"}
                className={`px-6 py-2 ${
                  activeSubject === subject 
                    ? "bg-nta-blue text-primary-foreground" 
                    : "border-nta-blue text-nta-blue hover:bg-nta-blue hover:text-primary-foreground"
                }`}
                onClick={() => setActiveSubject(subject)}
              >
                {subject}
              </Button>
            ))}
          </div>

          {/* Question Card */}
          <Card className="p-6 shadow-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="px-3 py-1">
                    Question {currentQuestion}
                  </Badge>
                  <Badge className="bg-nta-blue text-primary-foreground">
                    {activeSubject}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="border-warning text-warning hover:bg-warning hover:text-white">
                  <Flag className="h-4 w-4 mr-2" />
                  Mark for Review
                </Button>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-foreground">
                  {sampleQuestion.question}
                </p>
              </div>

              <div className="space-y-3">
                {sampleQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors has-[:checked]:border-nta-blue has-[:checked]:bg-nta-blue-light"
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={String.fromCharCode(65 + index)}
                      checked={selectedAnswer === String.fromCharCode(65 + index)}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="w-4 h-4 text-nta-blue"
                    />
                    <span className="font-medium text-foreground">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-foreground">{option}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  disabled={currentQuestion === 1}
                  onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
                >
                  Previous
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="border-success text-success hover:bg-success hover:text-white"
                  >
                    Save & Next
                  </Button>
                  <Button
                    onClick={() => setCurrentQuestion(Math.min(90, currentQuestion + 1))}
                    className="bg-nta-blue hover:bg-nta-blue-dark"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Question Palette */}
        <div className="w-80 bg-card border-l shadow-lg p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Question Palette</h3>
              
              {/* Legend */}
              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-question-answered rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-question-marked rounded"></div>
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-question-not-answered rounded"></div>
                  <span>Not Answered</span>
                </div>
              </div>
            </div>

            {/* Question Grid by Subject */}
            {subjects.map((subject) => (
              <div key={subject}>
                <h4 className="font-semibold text-foreground mb-3 pb-2 border-b">
                  {subject}
                </h4>
                <div className="grid grid-cols-5 gap-2">
                  {questionStatus
                    .filter(q => q.subject === subject)
                    .map((question) => (
                      <Button
                        key={question.number}
                        variant="ghost"
                        size="sm"
                        className={`w-10 h-10 p-0 text-xs font-semibold ${getStatusColor(question.status)} ${
                          currentQuestion === question.number ? "ring-2 ring-nta-blue ring-offset-2" : ""
                        }`}
                        onClick={() => setCurrentQuestion(question.number)}
                      >
                        {question.number}
                      </Button>
                    ))}
                </div>
              </div>
            ))}

            {/* Summary */}
            <Card className="p-4 bg-secondary">
              <h4 className="font-semibold text-foreground mb-3">Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span className="font-semibold text-question-answered">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Marked:</span>
                  <span className="font-semibold text-question-marked">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Not Answered:</span>
                  <span className="font-semibold text-question-not-answered">80</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Total:</span>
                  <span className="font-semibold">90</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrandTest;