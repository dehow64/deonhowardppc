import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON parser for any future API endpoints
  app.use(express.json());

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Contact form submission API endpoint
  const appointmentsStore: any[] = [];

  app.post("/api/contact", (req, res) => {
    const { fullName, email, phone, companyName, service, budget, message, selectedDate, selectedTimeSlot } = req.body;
    console.log("📨 Received contact form submission for deonhowardppc@gmail.com:", {
      fullName,
      email,
      phone,
      companyName,
      service,
      budget,
      selectedDate,
      selectedTimeSlot,
      receivedAt: new Date().toISOString()
    });
    appointmentsStore.push({
      type: "contact",
      ...req.body,
      id: `lead-${Date.now()}`,
      receivedAt: new Date().toISOString()
    });
    res.json({ success: true, message: "Inquiry received and logged successfully" });
  });

  // Appointments API endpoint
  app.post("/api/appointments", (req, res) => {
    const appointmentData = {
      id: `apt-${Date.now()}`,
      ...req.body,
      targetAdminEmail: "deonhowardppc@gmail.com",
      status: "scheduled",
      createdAt: new Date().toISOString()
    };
    appointmentsStore.push(appointmentData);
    console.log("📅 Strategy Consultation appointment recorded for deonhowardppc@gmail.com:", appointmentData);
    res.json({ success: true, appointment: appointmentData });
  });

  app.get("/api/appointments", (req, res) => {
    res.json({ appointments: appointmentsStore });
  });

  // Vite middleware for development vs Static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // SPA Fallback: send index.html for all non-file route requests
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
