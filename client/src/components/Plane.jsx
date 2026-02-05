import axios from "axios";
import robot from "../assets/robot.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentService from "../Services/PaymentService";

const pricingPlans = [
  {
    name: "FREE",
    price: "₹0",
    duration: "/ month",
    popular: false,
    features: [
      "Create 1 chatbot",
      "Up to 100 conversations / month",
      "Website embed (CDN script)",
      "usage analytics",
      "Community support"
    ]
  }, {
    name: "PRO",
    price: "₹1,499",
    duration: "/ month",
    popular: true,
    features: [
      "Create up to 10 chatbots",
      "Up to 10,000 conversations / month",
      "Website embed (CDN script)",
      "usage analytics",
      "Community support"
    ]
  },
  {
    name: "STARTER",
    price: "₹499",
    duration: "/ month",
    popular: false,
    features: [
      "Create up to 3 chatbots",
      "Up to 1,000 conversations / month",
      "Website embed (CDN script)",
      "usage analytics",
      "Community support"
    ]
  }
];


const Plan = () => {

  const [mail, setMail] = useState(null);
  const navigate = useNavigate();

  const fetchUser = () => {
    try {
      let store_user = JSON.parse(localStorage.getItem("USER")) || null
      if (!store_user) {
        navigate("/login");
      } else {
        // console.log(store_user);
        setMail(store_user.email);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckout = async (plan) => {
     if(!mail){
      fetchUser();
      return;
     }

    try {
      const amount = parseInt(plan.price.replace(/[₹,]/g, "")) * 100;
      if (amount === 0) {
        navigate("/signup");
        return;
      }
      // 2. Call your Spring Boot API
      const response = await PaymentService.pay(amount, plan.name, mail);
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Failed to initiate payment. Is your Spring Boot app running?");
    }
  };


  return (
    <section id="pricing" className="py-24 px-6 w-[95%] border-l-4 border-r-4 mx-auto">
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
              onClick={() => handleCheckout(plan)} // Add this line
              className={`
 w-full py-3 rounded-full font-medium mb-8 transition relative z-10
    ${plan.popular
                  ? "bg-black text-white hover:opacity-90"
                  : "border border-gray-300 text-gray-800 hover:bg-gray-100"
                }
  `}
            >
              {plan.price === "₹0" ? "Sign Up Free" : "Get Started"}
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
