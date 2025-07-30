// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";

// const Main = () => {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const handleLogout = async () => {
//     try {
//       setLoading(true);
//       await auth.signOut();
//       navigate("/");
//     } catch (err) {
//       console.error("Logout error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth.currentUser;
//       if (!user) {
//         navigate("/");
//         return;
//       }

//       const userDoc = await getDoc(doc(db, "users", user.uid));
//       if (userDoc.exists()) {
//         setUserData(userDoc.data());
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   if (!userData) return <div>Loading user data...</div>;

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f7f7f7", height: "100vh", display: "flex", flexDirection: "column" }}>
//       {/* Header */}
//       <div style={{ backgroundColor: "#B39384", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div style={{ color: "white", fontWeight: "bold" }}>
//           <div>AI-Powered</div>
//           <div>Design Assistant</div>
//         </div>
//         <h1 style={{ color: "white", margin: 0 }}>ROOMIFY</h1>
//         <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//           <input
//             type="text"
//             placeholder="Chat History"
//             style={{
//               padding: "8px 12px",
//               borderRadius: "20px",
//               border: "1px solid #ccc",
//               width: "160px",
//             }}
//           />
//           <span style={{ cursor: "pointer" }}>❓ Help</span>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//         <span>Welcome, {userData.fullName}</span>
//         <button
//           onClick={handleLogout}
//           style={{
//             backgroundColor: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "6px",
//             padding: "8px 16px",
//             cursor: "pointer"
//           }}
//         >
//           Log Out
//       <div style={{ backgroundColor: "#f2f2f2", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <span style={{ fontWeight: "bold" }}>About Us</span>

//         <button
//           onClick={() => navigate("/furniture")}
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#B39384",
//             color: "white",
//             border: "none",
//             borderRadius: "6px",
//             cursor: "pointer"
//           }}
//         >
//           🪑 Try Furniture Swiper
//         </button>
//       </div>

//       {/* Chat area */}
//       <div style={{ flex: 1, padding: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
//         <div style={{ backgroundColor: "white", border: "1px solid #ddd", borderRadius: "8px", width: "90%", height: "100%", display: "flex", flexDirection: "column", padding: "20px", gap: "20px" }}>
//           {/* Chat Bubbles */}
//           <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//             <div style={{ alignSelf: "flex-start", backgroundColor: "#f1f1f1", padding: "10px 15px", borderRadius: "10px", maxWidth: "300px" }}>
//               Dawg, you gatta blow up that room...
//             </div>

//             <div style={{ alignSelf: "flex-end", textAlign: "right" }}>
//               <img
//                 src="https://i.imgur.com/3QkZ5zQ.jpg"
//                 alt="room"
//                 style={{ width: "150px", borderRadius: "6px" }}
//               />
//               <div style={{ backgroundColor: "#f1f1f1", padding: "10px 15px", borderRadius: "10px", marginTop: "5px", display: "inline-block" }}>
//                 Make my room cooler bru bru
//               </div>
//             </div>
//           </div>

//           {/* Input Bar */}
//           <div style={{ display: "flex", gap: "20px", marginTop: "auto" }}>
//             <button style={{ padding: "10px 20px", border: "1px solid #ccc", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>
//               Insert Image
//             </button>/Furniture/HomeOffice/Decoration/Frames Pictures/Frames/50370409.jpg
//             <input
//               type="text"
//               placeholder="Type here..."
//               style={{
//                 flex: 1,
//                 padding: "10px 15px",
//                 border: "1px solid #ccc",
//                 borderRadius: "6px",
//               }}
//             />
//             <button style={{ padding: "10px 20px", border: "1px solid #ccc", borderRadius: "6px", background: "#fff", cursor: "pointer" }}>
//               Ask anything
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const Main = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userData) return <div>Loading user data...</div>;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f7f7",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#B39384",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ color: "white", fontWeight: "bold" }}>
          <div>AI-Powered</div>
          <div>Design Assistant</div>
        </div>
        <h1 style={{ color: "white", margin: 0 }}>ROOMIFY</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <input
            type="text"
            placeholder="Chat History"
            style={{
              padding: "8px 12px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              width: "160px",
            }}
          />
          <span style={{ cursor: "pointer" }}>❓ Help</span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", padding: "10px 20px" }}>
        <span>Welcome, {userData.fullName}</span>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
      </div>

      {/* Action Panel */}
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "bold" }}>About Us</span>
        <button
          onClick={() => navigate("/furniture")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#B39384",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🪑 Try Furniture Swiper
        </button>
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            borderRadius: "8px",
            width: "90%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "20px",
          }}
        >
          {/* Chat Bubbles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#f1f1f1",
                padding: "10px 15px",
                borderRadius: "10px",
                maxWidth: "300px",
              }}
            >
              Dawg, you gatta blow up that room...
            </div>

            <div style={{ alignSelf: "flex-end", textAlign: "right" }}>
              <img
                src="https://i.imgur.com/3QkZ5zQ.jpg"
                alt="room"
                style={{ width: "150px", borderRadius: "6px" }}
              />
              <div
                style={{
                  backgroundColor: "#f1f1f1",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  marginTop: "5px",
                  display: "inline-block",
                }}
              >
                Make my room cooler bru bru
              </div>
            </div>
          </div>

          {/* Input Bar */}
          <div style={{ display: "flex", gap: "20px", marginTop: "auto" }}>
            <button
              style={{
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Insert Image
            </button>
            <input
              type="text"
              placeholder="Type here..."
              style={{
                flex: 1,
                padding: "10px 15px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Ask anything
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

