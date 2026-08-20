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
    const { fullName, firstName, lastName, email, phone, companyName, company, service, budget, projectDescription, description, message, selectedDate, selectedTimeSlot } = req.body;
    const desc = projectDescription || description || req.body.project_description || req.body.details || '';
    const name = fullName || `${firstName || ''} ${lastName || ''}`.trim() || 'Prospective Client';
    
    console.log("📨 Received contact form submission for deonhowardppc@gmail.com:", {
      fullName: name,
      email,
      phone,
      companyName: companyName || company,
      service,
      budget,
      projectDescription: desc,
      selectedDate,
      selectedTimeSlot,
      receivedAt: new Date().toISOString()
    });
    appointmentsStore.push({
      type: "contact",
      ...req.body,
      fullName: name,
      projectDescription: desc,
      description: desc,
      id: `lead-${Date.now()}`,
      receivedAt: new Date().toISOString()
    });
    res.json({ success: true, message: "Inquiry received and logged successfully" });
  });

  // Appointments API endpoint
  app.post("/api/appointments", (req, res) => {
    const desc = req.body.projectDescription || req.body.description || req.body.project_description || req.body.details || '';
    const appointmentData = {
      id: `apt-${Date.now()}`,
      ...req.body,
      projectDescription: desc,
      description: desc,
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
