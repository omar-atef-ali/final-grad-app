/* dashboard.worker.js */
importScripts("https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js");

const parseNumber = (v) => {
  if (v == null) return 0;
  const n = parseFloat(String(v).replace(/[^0-9.\-]+/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const parseDateFlexible = (s) => {
  if (!s) return null;
  s = String(s).trim();
  const d1 = new Date(s);
  if (!isNaN(d1)) return d1;
  const m = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (m) {
    const day = +m[1], mon = +m[2] - 1, yr = +m[3];
    return new Date(yr, mon, day);
  }
  return null;
};

const monthKey = (date) =>
  date.toLocaleString("default", { month: "short", year: "numeric" });

onmessage = function (e) {
  const { catsCSV, subcatsCSV, prodsCSV, ordersCSV, itemsCSV } = e.data;

  const cats = Papa.parse(catsCSV, { header: true, skipEmptyLines: true }).data;
  const subcats = Papa.parse(subcatsCSV, { header: true, skipEmptyLines: true }).data;
  const prods = Papa.parse(prodsCSV, { header: true, skipEmptyLines: true }).data;
  const orders = Papa.parse(ordersCSV, { header: true, skipEmptyLines: true }).data;
  const items = Papa.parse(itemsCSV, { header: true, skipEmptyLines: true }).data;

  /* ==== Maps ==== */
  const catMap = new Map(cats.map(c => [String(c.id), c.name || "Unknown"]));
  const subMap = new Map(
    subcats.map(s => [String(s.id), { name: s.name || "Unknown", category_id: String(s.category_id) }])
  );
  const prodMap = new Map(
    prods.map(p => [String(p.id), { sub_category_id: String(p.sub_category_id), raw: p }])
  );
  const orderMap = new Map(
    orders.map(o => [String(o.id), {
      date: parseDateFlexible(o.order_date || o["Order Date"]),
      pay: (o.payment_method || o["Payment Method"] || "").toUpperCase().trim() || "UNKNOWN"
    }])
  );

  /* ==== Aggregates ==== */
  const salesMonthMap = {};
  const qtyMonthMap = {};
  const payMap = {};
  const catSales = {};
  const catSub = {};

  let totalSales = 0;
  let totalQty = 0;

  for (const it of items) {
    const orderId = String(it.order_id);
    const order = orderMap.get(orderId);
    if (!order) continue;

    const date = order.date;
    if (!date) continue;

    const mk = monthKey(date);
    const qty = parseNumber(it.quantity);
    const price = parseNumber(it.price);
    const sales = qty * price;

    salesMonthMap[mk] = (salesMonthMap[mk] || 0) + sales;
    qtyMonthMap[mk] = (qtyMonthMap[mk] || 0) + qty;
    totalSales += sales;
    totalQty += qty;

    const pay = order.pay;
    payMap[pay] = (payMap[pay] || 0) + sales;

    const pid = String(it.product_id);
    let catName = "Unknown";
    let subName = "Unknown";
    if (prodMap.has(pid)) {
      const p = prodMap.get(pid);
      const subId = p.sub_category_id;
      if (subMap.has(subId)) {
        const sub = subMap.get(subId);
        subName = sub.name;
        if (catMap.has(sub.category_id)) {
          catName = catMap.get(sub.category_id);
        }
      }
    }
    catSales[catName] = (catSales[catName] || 0) + sales;
    catSub[catName] = catSub[catName] || {};
    catSub[catName][subName] = (catSub[catName][subName] || 0) + sales;
  }

  const salesByMonth = Object.entries(salesMonthMap).map(([month, value]) => ({ month, value }));
  const qtyByMonth = Object.entries(qtyMonthMap).map(([month, value]) => ({ month, value }));
  const paymentSales = Object.entries(payMap).map(([name, value]) => ({ name, value }));
  const topCategories = Object.entries(catSales)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  const catSubcatTree = Object.entries(catSub).map(([catName, subs]) => ({
    name: catName,
    children: Object.entries(subs).map(([s, v]) => ({ name: s, value: v }))
  }));

  postMessage({
    kpis: {
      totalSales,
      totalQty,
      totalOrders: orders.length,
      bankPct: Math.round(((payMap["BANK"] || 0) / (totalSales || 1)) * 100),
      cashPct: Math.round(((payMap["CASH"] || 0) / (totalSales || 1)) * 100),
    },
    salesByMonth,
    qtyByMonth,
    paymentSales,
    topCategories,
    catSubcatTree,
  });
};
