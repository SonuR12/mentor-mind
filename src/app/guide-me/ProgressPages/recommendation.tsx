"use client";

import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressContext } from "../../Context/ProgressContext";
import SkillCard from "@/app/components/skillCard";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";

interface SkillsRecommendations {
  skillName: string;
  trendScore: number;
  avgLearningTime: string;
  jobDemand: string;
  futureScope: string;
}

const Recommendation: React.FC = () => {
  const context = useContext(ProgressContext);
  const [isloading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [skillCards, setSkillCards] = React.useState<SkillsRecommendations[]>(
    []
  );

  async function getRecommendations() {
    try {
      setIsLoading(true);
      // const response = await fetch('/server/ai-skills-recommendations')
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setSkillCards([
      {
        skillName: "TypeScript",
        trendScore: 5,
        avgLearningTime: "~2 months",
        jobDemand: "High",
        futureScope:
          "Highly valued in modern web development, especially for scaling React & Next.js applications.",
      },
      {
        skillName: "Advanced UI/UX (Design Systems & Prototyping)",
        trendScore: 5,
        avgLearningTime: "~3-4 months",
        jobDemand: "High",
        futureScope:
          "Crucial for building intuitive and scalable digital experiences; companies seek UI/UX designers proficient in Figma and interactive prototyping.",
      },
      {
        skillName: "Backend with Prisma & GraphQL",
        trendScore: 4.5,
        avgLearningTime: "~3 months",
        jobDemand: "High",
        futureScope:
          "Modern backend technologies like Prisma & GraphQL optimize data handling and are increasingly preferred for scalable applications.",
      },
    ]);
    if (context) {
      const { guideFormData } = context;
      if (typeof window !== "undefined") {
        localStorage.setItem("guideFormData", JSON.stringify(guideFormData));
        console.log("Guide Form Data:", guideFormData);
      }
    }
  }, [context, router]);

  if (!context) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const { guideFormData } = context;

  const formFields = [
    { key: "fullName", label: "User Name" },
    { key: "email", label: "Email" },
    { key: "ageGroup", label: "Age Group" }, // Age group added here
    { key: "educationLevel", label: "Education" },
    { key: "currentField", label: "Current Field" },
    { key: "currentSkill", label: "Current Skills" },
    { key: "experience", label: "Experience" },
    { key: "careerGoal", label: "Career Path" },
    { key: "primaryLearningGoal", label: "Primary Learning Goals" },
    { key: "learningPreference", label: "Learning Preference" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen py-6 md:p-6">
      <div className="mt-4">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">
          Your Best-Matched Trending Skills
        </h1>
        <p className="text-primary mb-6 text-center">
          Based on your interests, experience, and industry trends, here are the
          top skills you should master
        </p>
      </div>
      <div className="skillCards grid lg:grid-cols-3 gap-4 mt-8">
        {skillCards.map((cardData, index) => (
          <SkillCard key={index} cardData={cardData} />
        ))}
      </div>
      <div className="badges flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
        <Badge variant="secondary" className="text-sm">
          <BadgeCheck />
          Data-Driven Suggestion
        </Badge>
        <Badge variant="secondary" className="text-sm">
          <BadgeCheck />
          High-Demand Skill
        </Badge>
      </div>
      <div className="mt-8 self-start px-4">
        <details>
          <summary className="text-primary cursor-pointer">
            Show summary
          </summary>
          <div className="mt-4 px-4 grid grid-cols-2 gap-x-8 sm:gap-x-12">
            <div>
              {formFields.map((data, index) => (
                <div key={index}>
                  <ul>
                    <li className="font-bold capitalize">{data.label}</li>
                  </ul>
                </div>
              ))}
            </div>
            <div>
              {Object.values(guideFormData).map((data, index) => {
                return (
                  <div key={index}>
                    <ul>
                      {Object.values(data).map((item, index) => (
                        <li key={index}>{item || "N/A"}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </details>
      </div>
      <hr />
      <div className="mt-12">
        <Card className="border border-teal-400">
          <CardContent>
            <h2 className="text-2xl font-bold mb-2 text-center">
              What&apos;s Next?
            </h2>
            <p className="mb-6 text-center">
              Start learning these skills with our personalized learning path
              and achieve your career goals
            </p>
            <div className="flex justify-center">
              <SignedOut>
                <Button asChild>
                  <SignInButton>Start Learning Path</SignInButton>
                </Button>
              </SignedOut>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Recommendation;
