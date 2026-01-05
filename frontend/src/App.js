import { useState } from "react";
import "./App.css";

function App() {
  const userId = "user460"; // simple user display

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const claimDiscount = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        campaignId: "695b4a53b3503c28abaa0e71",
        cartValue: 1500,
      }),
    });

    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">
        <h2 className="title">Flash Sale</h2>

        <div className="info">
          <span>User</span>
          <strong>{userId}</strong>
        </div>

        <div className="info">
          <span>Cart Value</span>
          <strong>₹1500</strong>
        </div>

        <button onClick={claimDiscount} disabled={loading}>
          {loading ? "Claiming..." : "Claim Discount"}
        </button>

        {data && (
          <div className="result">
            <p>
              <b>Discount:</b> ₹{data.discount}
            </p>
            <p className="token">
              <b>Token:</b> {data.token}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
