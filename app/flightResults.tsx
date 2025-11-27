// components/FlightResults.tsx
import { FC } from "react";

interface FlightCardProps {
  airline: string;
  code: string;
  departure: string;
  arrival: string;
  duration: string;
  price: string;
  merchantUrl: string;
  sponsored?: boolean;
  recommended?: boolean;
}

const FlightCard: FC<FlightCardProps> = ({
  airline,
  code,
  departure,
  arrival,
  duration,
  price,
  merchantUrl,
  sponsored,
  recommended
}) => {
  return (
    <a
      href={merchantUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className={`border rounded-xl p-3 shadow-sm bg-white hover:shadow-md transition ${
          sponsored ? "border-yellow-400" : "border-gray-200"
        }`}
      >
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-sm font-semibold">
          {airline} – {code}
        </h2>
        {sponsored && (
          <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">
            Sponsored
          </span>
        )}
      </div>

      {recommended && (
        <p className="text-xs text-green-600 font-medium mb-1.5">
          ✨ Recommended for top-tier comfort and promo fare
        </p>
      )}

      <div className="text-xs text-gray-700 space-y-0.5">
        <p>
          <strong>Departure:</strong> {departure}
        </p>
        <p>
          <strong>Arrival:</strong> {arrival}
        </p>
        <p>
          <strong>Duration:</strong> {duration}
        </p>
        <p>
          <strong>Price:</strong> {price}
        </p>
      </div>
      </div>
    </a>
  );
};

const FlightResults = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-sm font-semibold mb-3">
        Sure! I can help with that. ✈️  <br />
        Here are some great flights for London → Dubai tomorrow:
      </h1>

      <div className="space-y-3">
        {/* Emirates Sponsored Option */}
        <FlightCard
          airline="APEX Airways"
          code="AX 004"
          departure="09:40 AM (London Heathrow)"
          arrival="20:10 PM (Dubai Intl)"
          duration="6h 30m"
          price="£579 (Promo Fare)"
          merchantUrl="https://merchant-demo-five.vercel.app/"
          sponsored={true}
          recommended={true}
        />

        <FlightCard
          airline="British Airways"
          code="BA 107"
          departure="13:55 PM (London Heathrow)"
          arrival="00:20 AM (+1 day)"
          duration="6h 25m"
          price="£545 (Economy)"
          merchantUrl="https://www.britishairways.com/"
        />

        <FlightCard
          airline="Qatar Airways"
          code="QR 012"
          departure="18:25 PM (London Gatwick)"
          arrival="05:15 AM (+1 day)"
          duration="9h 50m"
          price="£498 (Economy)"
          merchantUrl="https://www.qatarairways.com/"
        />
      </div>
    </div>
  );
};

export default FlightResults;
