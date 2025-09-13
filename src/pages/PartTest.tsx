import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, BookOpen, Target, ChevronRight } from "lucide-react";

const PartTest = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubtopic, setSelectedSubtopic] = useState("");

  const examData = {
    "jee-main": {
      name: "JEE Main",
      subjects: {
        "Physics": {
          "Mechanics": ["Kinematics", "Laws of Motion", "Work Power Energy", "Rotational Motion"],
          "Thermodynamics": ["First Law", "Second Law", "Kinetic Theory", "Heat Transfer"],
          "Electricity": ["Electrostatics", "Current Electricity", "Magnetism", "Electromagnetic Induction"]
        },
        "Chemistry": {
          "Physical Chemistry": ["Atomic Structure", "Chemical Bonding", "Thermodynamics", "Equilibrium"],
          "Organic Chemistry": ["Hydrocarbons", "Biomolecules", "Polymers", "Chemistry in Everyday Life"],
          "Inorganic Chemistry": ["Periodic Table", "s-Block Elements", "p-Block Elements", "d-Block Elements"]
        },
        "Mathematics": {
          "Algebra": ["Complex Numbers", "Quadratic Equations", "Sequences & Series", "Permutations & Combinations"],
          "Calculus": ["Limits", "Derivatives", "Integrals", "Differential Equations"],
          "Coordinate Geometry": ["Straight Lines", "Circles", "Parabola", "Ellipse & Hyperbola"]
        }
      }
    },
    "neet": {
      name: "NEET",
      subjects: {
        "Physics": {
          "Mechanics": ["Kinematics", "Laws of Motion", "Work Power Energy", "Gravitation"],
          "Thermodynamics": ["First Law", "Second Law", "Kinetic Theory"],
          "Optics": ["Ray Optics", "Wave Optics", "Optical Instruments"]
        },
        "Chemistry": {
          "Physical Chemistry": ["Atomic Structure", "Chemical Bonding", "States of Matter"],
          "Organic Chemistry": ["Basic Principles", "Hydrocarbons", "Biomolecules"],
          "Inorganic Chemistry": ["Periodic Table", "Chemical Bonding", "Coordination Compounds"]
        },
        "Biology": {
          "Botany": ["Plant Kingdom", "Morphology", "Anatomy", "Reproduction"],
          "Zoology": ["Animal Kingdom", "Human Physiology", "Reproduction", "Genetics"],
          "Ecology": ["Ecosystem", "Environment", "Biodiversity", "Evolution"]
        }
      }
    },
    "eamcet": {
      name: "EAMCET",
      subjects: {
        "Physics": {
          "Mechanics": ["Motion in One Dimension", "Motion in Two Dimensions", "Laws of Motion"],
          "Heat & Thermodynamics": ["Thermal Properties", "Kinetic Theory", "First Law"],
          "Electricity": ["Electrostatics", "Current Electricity", "Magnetic Effects"]
        },
        "Chemistry": {
          "Physical Chemistry": ["Atomic Structure", "Chemical Bonding", "Gaseous State"],
          "Organic Chemistry": ["Basic Principles", "Hydrocarbons", "Halogen Derivatives"],
          "Inorganic Chemistry": ["Periodic Classification", "s-Block Elements", "p-Block Elements"]
        },
        "Mathematics": {
          "Algebra": ["Functions", "Mathematical Induction", "Complex Numbers"],
          "Trigonometry": ["Trigonometric Functions", "Inverse Functions", "Equations"],
          "Calculus": ["Limits & Continuity", "Differentiation", "Integration"]
        }
      }
    }
  };

  const exam = examData[examId as keyof typeof examData];
  const topics = selectedSubject ? exam?.subjects[selectedSubject as keyof typeof exam.subjects] : {};
  const subtopics = selectedTopic && topics ? topics[selectedTopic as keyof typeof topics] : [];

  const canStartTest = selectedSubject && selectedTopic && selectedSubtopic;

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
              onClick={() => navigate(`/exam/${examId}`)}
              className="text-primary-foreground hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Exam Selection
            </Button>
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6" />
              <div>
                <h1 className="text-2xl font-bold">{exam.name} - Part Test</h1>
                <p className="text-nta-blue-light">Select Subject, Topic & Subtopic</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Subject Selection */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-nta-blue" />
                  <h3 className="text-lg font-semibold text-foreground">Select Subject</h3>
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(exam.subjects).map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Topic Selection */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ChevronRight className="h-5 w-5 text-nta-blue" />
                  <h3 className="text-lg font-semibold text-foreground">Select Topic</h3>
                </div>
                <Select 
                  value={selectedTopic} 
                  onValueChange={setSelectedTopic}
                  disabled={!selectedSubject}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedSubject ? "Choose a topic" : "Select subject first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(topics || {}).map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Subtopic Selection */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-nta-blue" />
                  <h3 className="text-lg font-semibold text-foreground">Select Subtopic</h3>
                </div>
                <Select 
                  value={selectedSubtopic} 
                  onValueChange={setSelectedSubtopic}
                  disabled={!selectedTopic}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={selectedTopic ? "Choose a subtopic" : "Select topic first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subtopics.map((subtopic: string) => (
                      <SelectItem key={subtopic} value={subtopic}>
                        {subtopic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </div>

          {/* Selection Summary & Start Button */}
          {canStartTest && (
            <Card className="p-6 bg-nta-blue-light border-nta-blue">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-nta-blue">Test Configuration</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Subject:</span>
                    <p className="font-medium text-foreground">{selectedSubject}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Topic:</span>
                    <p className="font-medium text-foreground">{selectedTopic}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Subtopic:</span>
                    <p className="font-medium text-foreground">{selectedSubtopic}</p>
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button 
                    className="bg-nta-blue hover:bg-nta-blue-dark px-8 py-3 text-lg"
                    onClick={() => navigate(`/exam/${examId}/part-test/start?subject=${selectedSubject}&topic=${selectedTopic}&subtopic=${selectedSubtopic}`)}
                  >
                    Start Part Test
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Instructions */}
          <Card className="mt-8 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Instructions</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-nta-blue font-semibold">1.</span>
                <p>Select a subject from the dropdown menu above.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-nta-blue font-semibold">2.</span>
                <p>Choose a specific topic within that subject.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-nta-blue font-semibold">3.</span>
                <p>Select a subtopic to focus your practice session.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-nta-blue font-semibold">4.</span>
                <p>Click "Start Part Test" to begin your targeted practice.</p>
              </div>
              <div className="mt-4 p-3 bg-secondary rounded-lg">
                <p className="text-foreground font-medium">
                  💡 <strong>Tip:</strong> Part tests are great for focused practice on specific topics where you need improvement.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartTest;