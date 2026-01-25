import robot from "../assets/robot.png";

const pricingPlans = [
  {
    name: "Free Plan",
    price: "₹0",
    duration: "/ month",
    popular: false,
    features: [
      "Create 1 chatbot",
      "Up to 100 conversations / month",
      "Basic AI responses",
      "Website embed (CDN script)",
      "Basic usage analytics",
      "Community support"
    ]
  },{
    name: "Pro Plan",
    price: "₹1,499",
    duration: "/ month",
    popular: true,
    features: [
      "Create up to 10 chatbots",
      "Up to 10,000 conversations / month",
      "Advanced AI responses",
      "Custom chatbot appearance",
      "Advanced analytics & insights",
      "Priority email support"
    ]
  },
  {
    name: "Starter Plan",
    price: "₹499",
    duration: "/ month",
    popular: false,
    features: [
      "Create up to 3 chatbots",
      "Up to 1,000 conversations / month",
      "Improved AI accuracy",
      "Website embed (CDN script)",
      "Basic analytics dashboard",
      "Email support"
    ]
  }
];


const Plan = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-sm text-indigo-500 font-medium">
          ✦ Affordable
        </span>
        <h2 className="text-7xl neo font-bold mt-2 text-gray-900">
          Pricing Options
        </h2>
        <p className="text-gray-500 mt-3">
          Choose the plan that suits your needs and budget.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`
              relative rounded-2xl p-8 overflow-hidden transition
              ${plan.popular
                ? "bg-gradient-to-br from-gray-200 to-gray-100 shadow-2xl scale-105 border border-gray-300"
                : "bg-white border border-gray-200 shadow-sm"
              }
            `}
          >
            {/* Robot background for popular */}
            {plan.popular && (
              <img
                src={robot}
                alt="robot"
                className="absolute -bottom-10 -right-6 w-40 opacity-10 pointer-events-none"
              />
            )}

            {/* Popular badge */}
            {plan.popular && (
              <span className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full bg-black text-white">
                Popular
              </span>
            )}

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 relative z-10">
              {plan.name}
            </h3>

            {/* Price */}
            <div className="mt-4 mb-6 relative z-10">
              <span className="text-4xl font-bold text-gray-900">
                {plan.price}
              </span>
              <span className="text-sm text-gray-600 ml-1">
                {plan.duration}
              </span>
            </div>

            {/* Button */}
            <button
              className={`
                w-full py-3 rounded-full font-medium mb-8 transition relative z-10
                ${plan.popular
                  ? "bg-black text-white hover:opacity-90"
                  : "border border-gray-300 text-gray-800 hover:bg-gray-100"
                }
              `}
            >
              Get Started
            </button>

            {/* Features */}
            <div className="text-sm relative z-10">
              <p className="text-gray-400 tracking-widest mb-4">
                FEATURES
              </p>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Plan;
