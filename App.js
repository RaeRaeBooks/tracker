import { useState, useMemo } from "react";

const days = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 7, 4 + i);
  return {
    day: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    checks: [false, false, false, false, false, false],
  };
});

const goals = [
  "80 oz water",
  "30 min strength",
  "20 min walk",
  "5 pages self-help",
  "No alcohol",
  "No sugar",
];

const quotes = [
  "Progress, not perfection.",
  "You’re stronger than you think.",
  "Little steps every day.",
  "Discipline is self-love.",
  "You’re doing amazing."
];

const colors = [
  "bg-pink-100",
  "bg-yellow-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-purple-100",
];

export default function SoftResetCalendar() {
  const [calendar, setCalendar] = useState(days);

  const toggleCheck = (dayIndex, goalIndex) => {
    const newCalendar = [...calendar];
    newCalendar[dayIndex].checks[goalIndex] = !newCalendar[dayIndex].checks[goalIndex];
    setCalendar(newCalendar);
  };

  const totalChecks = useMemo(
    () => calendar.reduce((sum, day) => sum + day.checks.filter(Boolean).length, 0),
    [calendar]
  );

  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let i = calendar.length - 1; i >= 0; i--) {
      if (calendar[i].checks.every(Boolean)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }, [calendar]);

  const badge =
    totalChecks >= 180 ? "🌟 Soft Reset Champ!" :
    totalChecks >= 120 ? "🔥 Consistency Queen!" :
    totalChecks >= 60 ? "✨ Reset Rookie!" : "🏁 Just Getting Started";

  const quoteOfTheDay = quotes[new Date().getDate() % quotes.length];

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-700">30-Day Soft Reset</h1>
        <p className="text-lg text-purple-600 mt-1">{quoteOfTheDay}</p>
        <p className="mt-2 text-sm text-gray-600">Total Progress: {totalChecks} / 180</p>
        <p className="text-sm text-gray-600">Current Streak: {currentStreak} days</p>
        <p className="text-md font-semibold text-purple-800 mt-1">Badge: {badge}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {calendar.map((entry, dayIndex) => (
          <div key={dayIndex} className={`rounded-2xl shadow-md p-3 ${colors[dayIndex % colors.length]}`}>
            <h2 className="text-lg font-bold text-gray-800 mb-2">{entry.day}</h2>
            <ul className="space-y-1">
              {goals.map((goal, goalIndex) => (
                <li key={goalIndex} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={entry.checks[goalIndex]}
                    onChange={() => toggleCheck(dayIndex, goalIndex)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-900">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
