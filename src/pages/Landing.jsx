export default function Landing() {
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <h1>🐱 Zinger Cat</h1>

      <p><b>“A place where college cats help each other.”</b></p>
      <p><b>“Ask. Share. Grow. Together.”</b></p>

      {/* Animation placeholder */}
      <div
        style={{
          height: 200,
          margin: "30px auto",
          border: "2px dashed #ccc",
          width: 300
        }}
      >
        <p style={{ paddingTop: 80 }}>🐾 Animation goes here</p>
      </div>

      <button onClick={() => (window.location.href = "/register")}>
        🐱 New Cat? Sign Up
      </button>
      
      <br /><br />

      <button onClick={() => (window.location.href = "/login")}>
        😺 Already a Cat? Log In
      </button>
    </div>
  );
}
