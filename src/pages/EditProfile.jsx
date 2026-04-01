import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    profilePic: "",
    name: "",
    dept: "",
    startYear: 2020,
    endYear: 2024,
    about: ""
  });

  /* =========================
     LOAD PROFILE
  ========================= */
  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile(username);
        setForm({
          profilePic: data.profilePic || "",
          name: data.name || "",
          dept: data.dept || "",
          startYear: data.startYear || 2020,
          endYear: data.endYear || 2024,
          about: data.about || ""
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [username]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function saveProfile() {
    try {
      await updateProfile({
        ...form,
        startYear: Number(form.startYear),
        endYear: Number(form.endYear)
      });
      navigate(`/profile/${username}`);
    } catch (err) {
      alert("Failed to save profile");
    }
  }

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .zep-loading {
          min-height: 100vh; background: #FDF8F2;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif; color: #B97B4A;
          gap: 10px; font-size: 15px;
        }
        .zep-spin {
          width: 20px; height: 20px;
          border: 2.5px solid #FFD6A5;
          border-top-color: #F4854A;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div className="zep-loading">
        <div className="zep-spin" />
        Loading your profile...
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=DM+Sans:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .zep-root {
          min-height: 100vh;
          background: #FDF8F2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
          padding: 40px 16px;
        }

        .zep-blob {
          position: fixed;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }
        .zep-blob-1 { width: 420px; height: 420px; background: #FFD6A5; top: -80px; left: -120px; }
        .zep-blob-2 { width: 300px; height: 300px; background: #FFAAA5; bottom: -60px; right: -80px; }
        .zep-blob-3 { width: 200px; height: 200px; background: #A8DADC; top: 40%; left: 60%; opacity: 0.2; }

        .zep-card {
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,200,140,0.4);
          border-radius: 28px;
          padding: 44px 40px 40px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 8px 48px rgba(200,120,60,0.10), 0 1px 0 rgba(255,255,255,0.9) inset;
          animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* header */
        .zep-header {
          text-align: center;
          margin-bottom: 28px;
        }
        .zep-icon-wrap {
          width: 60px; height: 60px;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          border-radius: 18px;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 30px;
          box-shadow: 0 4px 18px rgba(244,133,74,0.3);
          margin-bottom: 14px;
          animation: wobble 3s ease-in-out infinite;
        }
        @keyframes wobble {
          0%,100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
        .zep-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 28px;
          font-weight: 600;
          color: #2C1A0E;
          letter-spacing: -0.5px;
        }
        .zep-subtitle {
          margin-top: 5px;
          font-size: 13px;
          color: #B97B4A;
          font-style: italic;
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 300;
        }

        /* avatar section */
        .zep-avatar-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding: 20px;
          background: linear-gradient(145deg, #FFF8F0, #FFF2E0);
          border: 1.5px dashed #FFD6A5;
          border-radius: 16px;
        }
        .zep-avatar {
          width: 84px; height: 84px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #F4854A;
          box-shadow: 0 4px 16px rgba(244,133,74,0.25);
        }
        .zep-avatar-placeholder {
          width: 84px; height: 84px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD6A5, #FFA86C);
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
          border: 3px solid rgba(244,133,74,0.3);
        }
        .zep-avatar-label {
          font-size: 12px;
          color: #C4A08A;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* divider */
        .zep-divider {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .zep-divider-line { flex: 1; height: 1px; background: #FFD6A5; }
        .zep-divider-text { font-size: 11px; color: #C4A08A; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }

        /* field */
        .zep-field { margin-bottom: 14px; }
        .zep-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #9B5B1A;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .zep-input, .zep-select, .zep-textarea {
          width: 100%;
          padding: 12px 14px;
          background: #FFFAF4;
          border: 1.5px solid #FFD6A5;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #2C1A0E;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          box-sizing: border-box;
        }
        .zep-input::placeholder,
        .zep-textarea::placeholder { color: #C4A08A; }
        .zep-input:focus, .zep-select:focus, .zep-textarea:focus {
          border-color: #F4854A;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(244,133,74,0.12);
        }
        .zep-textarea {
          height: 90px;
          resize: none;
          line-height: 1.5;
        }

        /* year row */
        .zep-year-row {
          display: flex;
          gap: 10px;
        }
        .zep-year-row .zep-select { flex: 1; }

        /* char count */
        .zep-char-count {
          text-align: right;
          font-size: 11px;
          color: #C4A08A;
          margin-top: 4px;
        }

        /* save button */
        .zep-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #F4854A, #E86A2A);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 18px rgba(244,133,74,0.35);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          margin-top: 8px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .zep-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(244,133,74,0.45);
        }
        .zep-btn:active { transform: translateY(0); }

        .zep-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C4A08A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 32px;
          cursor: pointer;
        }
      `}</style>

      <div className="zep-root">
        <div className="zep-blob zep-blob-1" />
        <div className="zep-blob zep-blob-2" />
        <div className="zep-blob zep-blob-3" />

        <div className="zep-card">

          <div className="zep-header">
            <div className="zep-icon-wrap">✏️</div>
            <h2 className="zep-title">Edit Profile</h2>
            <p className="zep-subtitle">"Make your cat identity shine."</p>
          </div>

          {/* avatar preview */}
          <div className="zep-avatar-section">
            {form.profilePic
              ? <img src={form.profilePic} alt="preview" className="zep-avatar" />
              : <div className="zep-avatar-placeholder">🐱</div>
            }
            <span className="zep-avatar-label">Profile photo preview</span>
            <div className="zep-field" style={{ width: "100%", marginBottom: 0 }}>
              <input
                name="profilePic"
                value={form.profilePic}
                onChange={handleChange}
                placeholder="Paste image URL here..."
                className="zep-input"
              />
            </div>
          </div>

          <div className="zep-divider">
            <div className="zep-divider-line" />
            <span className="zep-divider-text">Your details</span>
            <div className="zep-divider-line" />
          </div>

          {/* name */}
          <div className="zep-field">
            <label className="zep-label">👤 Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="zep-input"
            />
          </div>

          {/* dept */}
          <div className="zep-field">
            <label className="zep-label">🏫 Department</label>
            <select
              name="dept"
              value={form.dept}
              onChange={handleChange}
              className="zep-select"
              style={{ width: "100%" }}
            >
              <option value="">Select your department</option>
              <option value="CSE">CSE – Computer Science & Engineering</option>
              <option value="IT">IT – Information Technology</option>
              <option value="ECE">ECE – Electronics & Communication</option>
              <option value="EEE">EEE – Electrical & Electronics</option>
              <option value="MECH">MECH – Mechanical Engineering</option>
              <option value="CIVIL">CIVIL – Civil Engineering</option>
              <option value="CHEM">CHEM – Chemical Engineering</option>
              <option value="PROD">PROD – Production Engineering</option>
              <option value="ICE">ICE – Instrumentation & Control</option>
              <option value="TEXTILE">TEXTILE – Textile Technology</option>
              <option value="FT">FT – Fashion Technology</option>
              <option value="BME">BME – Biomedical Engineering</option>
              <option value="BT">BT – Biotechnology</option>
              <option value="MBA">MBA – Master of Business Administration</option>
              <option value="MCA">MCA – Master of Computer Applications</option>
              <option value="MSC_CS">M.Sc – Computer Science</option>
              <option value="MSC_MATHS">M.Sc – Mathematics</option>
              <option value="MSC_PHYSICS">M.Sc – Physics</option>
              <option value="MSC_CHEM">M.Sc – Chemistry</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* year */}
          <div className="zep-field">
            <label className="zep-label">📅 Year of Study</label>
            <div className="zep-year-row">
              <select
                name="startYear"
                value={form.startYear}
                onChange={handleChange}
                className="zep-select"
              >
                {years()}
              </select>
              <select
                name="endYear"
                value={form.endYear}
                onChange={handleChange}
                className="zep-select"
              >
                {years()}
              </select>
            </div>
          </div>

          {/* about */}
          <div className="zep-field">
            <label className="zep-label">💬 About You</label>
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              maxLength={120}
              placeholder="Tell the other cats a little about yourself..."
              className="zep-textarea"
            />
            <p className="zep-char-count">{form.about.length} / 120</p>
          </div>

          <button onClick={saveProfile} className="zep-btn">
            🐾 Save Profile
          </button>

        </div>
      </div>
    </>
  );
}

/* =========================
   YEARS
========================= */
function years() {
  const list = [];
  for (let y = 2010; y <= 2050; y++) {
    list.push(
      <option key={y} value={y}>
        {y}
      </option>
    );
  }
  return list;
}
