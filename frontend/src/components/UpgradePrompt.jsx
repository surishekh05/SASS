export default function UpgradePrompt({ onUpgrade }) {
  const plans = [
    {
      title: "Pro Starter",
      benefits: ["Unlimited Notes", "Priority Support", "Advanced Analytics", "Team Collaboration", "Custom Branding"],
    },
    {
      title: "Pro Business",
      benefits: ["Unlimited Notes", "Team Collaboration", "Data Export", "Custom Branding", "Dedicated Manager"],
    },
    {
      title: "Pro Enterprise",
      benefits: ["Dedicated Manager", "Custom Integrations", "24/7 Support", "SLA Uptime Guarantee"],
    },
  ];

  return (
    <>
      {plans.map((plan, index) => (
        <div key={index} className="border p-6 rounded shadow hover:shadow-lg transition-all bg-white w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-4">{plan.title}</h3>
          <ul className="mb-4 list-disc list-inside space-y-1">
            {plan.benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
          <button onClick={onUpgrade} className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-600 transition w-full">Upgrade to Pro</button>
        </div>
      ))}
    </>
  );
}
