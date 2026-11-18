import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { SERVICES_DATA, INITIAL_USER_REQUESTS, INITIAL_COURIERS } from './src/data/mockData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data_store.json');

app.use(express.json());

// Persistent store structure
interface StoreData {
  requests: any[];
  services: any[];
  couriers: any[];
  adminSettings: any;
}

let store: StoreData = {
  requests: [...INITIAL_USER_REQUESTS],
  services: [...SERVICES_DATA],
  couriers: [...INITIAL_COURIERS],
  adminSettings: {
    primaryPhone: '01098765432',
    whatsappPhone: '01098765432',
    secondaryPhone: '01123456789',
    adminName: 'إدارة ومناديب منصة SKIP المعتمدين',
    primaryChannel: 'whatsapp',
    whatsappNumber: '01098765432',
    emailAddress: 'admin@skip-portal.com',
    soundEnabled: true,
    browserNotificationsEnabled: true,
    autoOpenWhatsAppOnOrder: true
  }
};

// Load existing data from file if present
function loadStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.requests && Array.isArray(parsed.requests)) {
        store.requests = parsed.requests;
      }
      if (parsed.services && Array.isArray(parsed.services) && parsed.services.length > 0) {
        store.services = parsed.services;
      }
      if (parsed.couriers && Array.isArray(parsed.couriers) && parsed.couriers.length > 0) {
        store.couriers = parsed.couriers;
      }
      if (parsed.adminSettings) {
        store.adminSettings = { ...store.adminSettings, ...parsed.adminSettings };
      }
      console.log(`[Store] Loaded ${store.requests.length} requests and ${store.services.length} services from disk.`);
    }
  } catch (err) {
    console.error('[Store] Failed to load store, using defaults:', err);
  }
}

// Persist store to file
function saveStore() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Store] Failed to save store:', err);
  }
}

loadStore();

// Server-Sent Events subscribers
const sseClients = new Set<express.Response>();

function broadcast(eventType: string, payload: any) {
  const data = `event: ${eventType}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(data);
    } catch (e) {
      sseClients.delete(client);
    }
  }
}

// 15-second heartbeat to keep SSE alive through Cloud Run / proxy timeouts
setInterval(() => {
  for (const client of sseClients) {
    try {
      client.write(': ping\n\n');
    } catch {
      sseClients.delete(client);
    }
  }
}, 15000);

// ==================== REST API ENDPOINTS ====================

// SSE endpoint for immediate real-time push to all connected browsers/devices
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  // Send initial connection event
  res.write(`event: connected\ndata: ${JSON.stringify({ time: new Date().toISOString() })}\n\n`);

  sseClients.add(res);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// Requests API
app.get('/api/requests', (_req, res) => {
  res.json(store.requests);
});

app.post('/api/requests', (req, res) => {
  try {
    const body = req.body || {};
    const service = body.service || {};
    const applicantData = body.applicantData || {};

    const serviceId = service.id || body.serviceId || `srv-${Date.now()}`;
    const serviceTitle = body.serviceTitle || service.title || 'معاملة حكومية ورقية';
    const serviceTitleEn = body.serviceTitleEn || service.titleEn || serviceTitle;
    const category = body.category || service.category || 'government';
    
    const applicantName = body.applicantName || applicantData.name || 'مواطن كريم';
    const applicantPhone = body.applicantPhone || applicantData.phone || '01000000000';
    const nationalId = body.nationalId || applicantData.nationalId || '29000000000000';
    const address = body.address || applicantData.address || 'العنوان المسجل لدى العميل';
    const paymentMethod = body.paymentMethod || applicantData.paymentMethod || 'cash';
    const isCash = paymentMethod === 'cash';
    const isCourier = body.courierRequested ?? applicantData.courierRequested ?? true;
    const totalFee = Number(body.fee || service.fee || 350) + (isCourier ? 60 : 0);

    const randomRef = 'SKP-' + (new Date().getFullYear()) + '-' + Math.floor(10000 + Math.random() * 90000);
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const newReq = {
      id: `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      serviceId,
      serviceTitle,
      serviceTitleEn,
      category,
      referenceNumber: randomRef,
      status: isCourier ? 'delegate_assigned' : 'processing',
      createdAt: dateStr,
      fee: totalFee,
      paymentMethod,
      paymentStatus: isCash ? 'pending' : 'paid',
      applicantName,
      applicantPhone,
      nationalId,
      address,
      courierRequested: isCourier,
      courierName: isCourier ? (store.adminSettings.adminName || 'كابتن أحمد سامي (مندوب سكيب)') : undefined,
      courierPhone: isCourier ? (store.adminSettings.primaryPhone || '01098765432') : undefined,
      estimatedCompletion: service.estimatedDuration || 'خلال 48 ساعة',
      trackingSteps: [
        { title: 'تم استلام وتأكيد المعاملة رقمياً', titleEn: 'Application confirmed digitally', completed: true, timestamp: 'الآن' },
        { 
          title: isCash ? 'في انتظار تحصيل الرسوم نقداً عند وصول المندوب' : 'سداد الرسوم الحكومية ورسوم الخدمة إلكترونياً', 
          titleEn: isCash ? 'Awaiting cash on delivery collection' : 'Electronic fee settlement', 
          completed: !isCash, 
          timestamp: !isCash ? 'تم' : 'معلق' 
        },
        { 
          title: isCourier ? 'توجيه مندوب سكيب المعتمد لاستلام أصول الأوراق' : 'فحص ومطابقة المستندات بالجهة الحكومية', 
          titleEn: isCourier ? 'SKIP courier dispatched to pick up original papers' : 'Document verification at authority', 
          completed: false 
        },
        { title: 'إصدار الوثيقة الرسمية وختمها', titleEn: 'Official document stamped & printed', completed: false },
        { 
          title: isCourier ? 'التوصيل النهائي حتى باب المنزل' : 'جاهزة للاستلام من الشباك الموحد', 
          titleEn: isCourier ? 'Doorstep home delivery' : 'Ready for pickup at counter', 
          completed: false 
        }
      ]
    };

    // Prepend new request
    store.requests.unshift(newReq);
    saveStore();

    console.log(`[API] ✅ New request created: ${newReq.referenceNumber} - ${newReq.applicantName} (${newReq.paymentMethod})`);

    // Broadcast in real-time to all connected devices/admins
    broadcast('new_request', newReq);

    res.status(201).json(newReq);
  } catch (err: any) {
    console.error('[API] Error creating request:', err);
    res.status(500).json({ error: err.message || 'Server error creating request' });
  }
});

app.patch('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const idx = store.requests.findIndex(r => r.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  const current = store.requests[idx];
  const updated = { ...current, ...req.body };

  // If status changed, update tracking steps accordingly
  if (req.body.status && req.body.status !== current.status) {
    const newStatus = req.body.status;
    updated.status = newStatus;
    if (updated.trackingSteps && Array.isArray(updated.trackingSteps)) {
      updated.trackingSteps = updated.trackingSteps.map((step: any, sIdx: number) => {
        if (newStatus === 'completed') return { ...step, completed: true, timestamp: 'مكتمل' };
        if (newStatus === 'delivered' && sIdx <= 4) return { ...step, completed: true, timestamp: 'تم التسليم' };
        if (newStatus === 'ready_for_delivery' && sIdx <= 3) return { ...step, completed: true, timestamp: 'جاهز' };
        if (newStatus === 'documents_verified' && sIdx <= 2) return { ...step, completed: true, timestamp: 'تم الفحص' };
        if (newStatus === 'delegate_assigned' && sIdx <= 1) return { ...step, completed: true, timestamp: 'تم التعيين' };
        return step;
      });
    }
  }

  store.requests[idx] = updated;
  saveStore();

  broadcast('request_updated', updated);
  res.json(updated);
});

app.delete('/api/requests/:id', (req, res) => {
  const { id } = req.params;
  const initialLen = store.requests.length;
  store.requests = store.requests.filter(r => r.id !== id);
  if (store.requests.length !== initialLen) {
    saveStore();
    broadcast('request_deleted', { id });
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'Request not found' });
});

// Services CRUD API (Admin price & document editing)
app.get('/api/services', (_req, res) => {
  res.json(store.services);
});

app.put('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const idx = store.services.findIndex(s => s.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  const updatedService = {
    ...store.services[idx],
    ...req.body,
    fee: Number(req.body.fee ?? store.services[idx].fee)
  };

  store.services[idx] = updatedService;
  saveStore();

  broadcast('service_updated', updatedService);
  res.json(updatedService);
});

app.post('/api/services', (req, res) => {
  try {
    const newService = {
      ...req.body,
      id: req.body.id || `srv-custom-${Date.now()}`,
      fee: Number(req.body.fee || 0),
      courierSupported: req.body.courierSupported ?? true,
      digitalInstant: req.body.digitalInstant ?? false,
      requiredDocuments: req.body.requiredDocuments || [],
      procedureSteps: req.body.procedureSteps || ['تقديم الطلب والأوراق إلكترونياً', 'مراجعة الأوراق بواسطة المندوب أو الجهة', 'استلام المعاملة المكتملة'],
      procedureStepsEn: req.body.procedureStepsEn || ['Submit dossier online', 'Review by courier/authority', 'Receive completed document'],
      conditions: req.body.conditions || ['سريان بطاقة الرقم القومي لصاحب الشأن'],
      conditionsEn: req.body.conditionsEn || ['Valid National ID required']
    };

    store.services.unshift(newService);
    saveStore();

    broadcast('service_added', newService);
    res.status(201).json(newService);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', (req, res) => {
  const { id } = req.params;
  const initialLen = store.services.length;
  store.services = store.services.filter(s => s.id !== id);
  if (store.services.length !== initialLen) {
    saveStore();
    broadcast('service_deleted', { id });
    return res.json({ success: true });
  }
  res.status(404).json({ error: 'Service not found' });
});

// Couriers API
app.get('/api/couriers', (_req, res) => {
  res.json(store.couriers);
});

app.post('/api/couriers', (req, res) => {
  const newCourier = {
    ...req.body,
    id: `cour-${Date.now()}`,
    status: req.body.status || 'available',
    assignedOrdersCount: 0,
    rating: 5.0
  };
  store.couriers.unshift(newCourier);
  saveStore();
  broadcast('courier_added', newCourier);
  res.status(201).json(newCourier);
});

app.patch('/api/couriers/:id', (req, res) => {
  const { id } = req.params;
  const idx = store.couriers.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Courier not found' });
  store.couriers[idx] = { ...store.couriers[idx], ...req.body };
  saveStore();
  broadcast('courier_updated', store.couriers[idx]);
  res.json(store.couriers[idx]);
});

// Settings API
app.get('/api/settings', (_req, res) => {
  res.json(store.adminSettings);
});

app.put('/api/settings', (req, res) => {
  store.adminSettings = { ...store.adminSettings, ...req.body };
  saveStore();
  broadcast('settings_updated', store.adminSettings);
  res.json(store.adminSettings);
});

// Start dev or production server
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: false,
        watch: null
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`🚀 SKIP Platform server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
