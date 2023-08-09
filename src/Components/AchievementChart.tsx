import React, { useEffect } from "react";
import Chart from "chart.js/auto"; // Chart.js를 제대로 임포트

interface AchievementItem {
  item: string;
  achievement: number;
}

const getTitleByAchievement = (achievement: number): string => {
  if (achievement <= 20) return "초심자";
  if (achievement <= 40) return "노력왕";
  if (achievement <= 60) return "도전왕";
  if (achievement <= 80) return "희망왕";
  if (achievement <= 99) return "열정왕";
  return "완벽왕";
};

interface BarChartProps {
  achievementData: AchievementItem[];
}

const BarChart: React.FC<BarChartProps> = ({ achievementData }) => {
  const itemNames = achievementData.map((item) => item.item);
  const achievementRates = achievementData.map((item) => item.achievement);

  useEffect(() => {
    const ctx = document.getElementById("myBarChart") as HTMLCanvasElement;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar", // "horizontalBar" 대신 "bar" 타입 사용
      data: {
        labels: itemNames,
        datasets: [
          {
            label: "Achievement Rate",
            data: achievementRates,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "Achievement Rate (%)",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const achievement = context.dataset?.data?.[context.dataIndex];
                if (achievement !== undefined) {
                  const title = getTitleByAchievement(achievement);
                  return title;
                }
                return "";
              },
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [achievementData]);

  return <canvas id="myBarChart" width={400} height={200}></canvas>;
};

export default BarChart;
