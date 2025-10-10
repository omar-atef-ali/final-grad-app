
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import ReactECharts from "echarts-for-react";
import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1Wave, faMoneyBill, faCreditCard, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import './dashboard.css'

export default function Dashboard() {
  const [kpis, setKpis] = useState({});
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [qtyByMonth, setQtyByMonth] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [treemapData, setTreemapData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [salesByYear, setSalesByYear] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [repeatVsNew, setRepeatVsNew] = useState([]);
  const [avgOrderValueByMonth, setAvgOrderValueByMonth] = useState([]);
  const [totalOrdersByMonth, setTotalOrdersByMonth] = useState([]);
  const [customersByMonth, setCustomersByMonth] = useState([]);
  const [customerSegments, setCustomerSegments] = useState([]);
  const [categoryRevenueByCustomer, setCategoryRevenueByCustomer] = useState([]);
  const [salesBySegment, setSalesBySegment] = useState([]);
  const [loading, setLoading] = useState("loading....");

  const [selectedYear, setSelectedYear] = useState("2025"); // القيمة الافتراضية

  useEffect(() => {
    let salesMap = {};
    let qtyMap = {};
    let categoryMap = {};
    let paymentMap = { CASH: 0, BANK: 0 };
    let totalSales = 0;
    let totalItems = 0;
    let totalOrders = 0;

    let catMap = {};
    let subMap = {};
    let prodMap = {};
    let productSalesMap = {};
    let customerOrders = {};
    let customerRevenue = {};
    let monthlyOrderTotals = {};

    Promise.all([
      fetch("/categories.csv").then(res => res.text()),
      fetch("/sub_categories.csv").then(res => res.text()),
      fetch("/products.csv").then(res => res.text()),
      fetch("/orders.csv").then(res => res.text()),
    ]).then(([catText, subText, prodText, ordersText]) => {
      Papa.parse(catText, { header: true, complete: (res) => res.data.forEach(c => { if (c.id) catMap[c.id] = c.name; }) });
      Papa.parse(subText, { header: true, complete: (res) => res.data.forEach(s => { if (s.id) subMap[s.id] = { name: s.name, category_id: s.category_id }; }) });
      Papa.parse(prodText, { header: true, complete: (res) => res.data.forEach(p => { if (p.id) prodMap[p.id] = { sub_id: p.sub_category_id, name: p.name }; }) });

      Papa.parse(ordersText, {
        header: true,
        complete: (res) => {
          let ordersInfo = {};
          res.data.forEach(o => {
            if (o.id) ordersInfo[o.id] = { payment: o.payment_method || "CASH", date: o.order_date, customer_id: o.customer_id };
          });

          Papa.parse("/order_items.csv", {
            download: true,
            header: true,
            step: (row) => {
              const item = row.data;
              const price = parseFloat(item.price || 0);
              const qty = parseInt(item.quantity || 1);
              const total = price * qty;

              const order = ordersInfo[item.order_id];
              if (!order) return;

              const date = new Date(order.date);
              const year = date.getFullYear().toString();
              if (year !== selectedYear) return; // الفلترة حسب السنة

              const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

              // المبيعات الشهرية
              if (!salesMap[month]) salesMap[month] = 0;
              if (!qtyMap[month]) qtyMap[month] = 0;
              salesMap[month] += total;
              qtyMap[month] += qty;

              // مبيعات المنتجات
              productSalesMap[item.product_id] = (productSalesMap[item.product_id] || 0) + total;

              // بيانات الفئة والإيرادات لكل منتج
              const prod = prodMap[item.product_id];
              if (prod) {
                const prodName = prod.name;
                const sub = subMap[prod.sub_id];
                const catName = catMap[sub?.category_id] || "Unknown";
                if (!categoryMap[catName]) categoryMap[catName] = 0;
                categoryMap[catName] += total;

                if (!customerRevenue[order.customer_id]) customerRevenue[order.customer_id] = {};
                if (!customerRevenue[order.customer_id][prodName]) customerRevenue[order.customer_id][prodName] = 0;
                customerRevenue[order.customer_id][prodName] += total;
              }

              // طريقة الدفع
              paymentMap[order.payment] = (paymentMap[order.payment] || 0) + total;

              // KPIs
              totalSales += total;
              totalItems += qty;
              totalOrders += 1;

              // بيانات العملاء
              if (!customerOrders[order.customer_id]) customerOrders[order.customer_id] = { orders: [], total: 0 };
              customerOrders[order.customer_id].orders.push(month);
              customerOrders[order.customer_id].total += total;

              // avg order value
              if (!monthlyOrderTotals[month]) monthlyOrderTotals[month] = { total: 0, orders: new Set() };
              monthlyOrderTotals[month].total += total;
              monthlyOrderTotals[month].orders.add(item.order_id);
            },
            complete: () => {
              setAvgOrderValueByMonth(Object.entries(monthlyOrderTotals).map(([month, data]) => ({ month, avg: data.total / data.orders.size })));
              setTotalOrdersByMonth(Object.entries(monthlyOrderTotals).map(([month, data]) => ({ month, totalOrders: data.orders.size })));

              // العملاء لكل شهر
              let customersByMonthMap = {};
              Object.entries(customerOrders).forEach(([cid, data]) => {
                data.orders.forEach(m => {
                  if (!customersByMonthMap[m]) customersByMonthMap[m] = new Set();
                  customersByMonthMap[m].add(cid);
                });
              });
              setCustomersByMonth(Object.entries(customersByMonthMap).sort((a, b) => a[0].localeCompare(b[0])).map(([month, set]) => ({ month, count: set.size })));

              const colors = ["#007bff", "#6c757d", "#17a2b8", "#ffc107", "#28a745"];
              const treemap = Object.entries(categoryMap).map(([catName, catTotal], index) => {
                const mainColor = colors[index % colors.length];
                const subCats = Object.entries(subMap)
                  .filter(([subId, sub]) => catMap[sub.category_id] === catName)
                  .map(([subId, sub]) => {
                    let subTotal = 0;
                    Object.entries(prodMap).forEach(([prodId, prod]) => {
                      if (prod.sub_id === subId) subTotal += productSalesMap[prodId] || 0;
                    });
                    return {
                      name: sub.name,
                      value: subTotal,
                      itemStyle: { color: `${mainColor}80` }
                    };
                  });
                return {
                  name: catName,
                  value: catTotal,
                  children: subCats,
                  itemStyle: { color: mainColor + "cc" }
                };
              });
              setTreemapData(treemap);

              // تصنيف العملاء
              let segments = { Champions: 0, Loyal: 0, Regular: 0, "At Risk": 0 };
              let salesSegments = { Champions: 0, Loyal: 0, Regular: 0, "At Risk": 0 };
              const totals = Object.values(customerOrders).map(c => c.total);
              const threshold = totals.sort((a, b) => b - a)[Math.floor(totals.length * 0.2)] || 0;
              Object.entries(customerOrders).forEach(([cid, data]) => {
                const orderCount = data.orders.length;
                const revenue = data.total;
                let type = revenue >= threshold ? "Champions" : orderCount >= 3 ? "Loyal" : orderCount === 2 ? "Regular" : "At Risk";
                segments[type]++;
                salesSegments[type] += revenue;
              });
              setCustomerSegments(Object.entries(segments).map(([name, value]) => ({ name, value })));
              setSalesBySegment(Object.entries(salesSegments).map(([name, value]) => ({ name, value })));

              // الإيرادات لكل منتج مع الشريحة
              let catRev = [];
              Object.entries(customerRevenue).forEach(([cid, products]) => {
                const orderCount = customerOrders[cid].orders.length;
                const revenue = customerOrders[cid].total;
                const segment = revenue >= threshold ? "Champions"
                  : orderCount >= 3 ? "Loyal"
                    : orderCount === 2 ? "Regular"
                      : "At Risk";

                Object.entries(products).forEach(([prodName, value]) => {
                  const prod = Object.values(prodMap).find(p => p.name === prodName);
                  const sub = subMap[prod?.sub_id];
                  const catName = catMap[sub?.category_id] || "Unknown";
                  catRev.push({ customer: cid, category: catName, value, segment });
                });
              });
              setCategoryRevenueByCustomer(catRev);

              // repeat vs new
              let customerTypeByMonth = {};
              Object.entries(customerOrders).forEach(([cid, data]) => {
                const months = data.orders.sort();
                months.forEach((month, index) => {
                  if (!customerTypeByMonth[month]) customerTypeByMonth[month] = { new: 0, repeat: 0 };
                  if (index === 0) customerTypeByMonth[month].new += 1;
                  else customerTypeByMonth[month].repeat += 1;
                });
              });
              setRepeatVsNew(Object.entries(customerTypeByMonth).sort((a, b) => a[0].localeCompare(b[0])).map(([month, counts]) => ({ month, ...counts })));

              // تحديث باقي البيانات
              setKpis({ totalSales, totalItems, totalOrders, avgOrderValue: totalSales / totalOrders });
              setSalesByMonth(Object.entries(salesMap).map(([month, value]) => ({ month, value })));
              setQtyByMonth(Object.entries(qtyMap).map(([month, value]) => ({ month, value })));
              setSalesByYear(Object.entries(salesMap).map(([year, value]) => ({ year, value })));
              setTopProducts(Object.entries(productSalesMap).map(([id, value]) => ({ name: prodMap[id]?.name || "Unknown", value })).sort((a, b) => b.value - a.value).slice(0, 10));
              setTopCategories(Object.entries(categoryMap).map(([cat, val]) => ({ name: cat, value: val })));
              setPaymentData(Object.entries(paymentMap).map(([name, value]) => ({ name, value })));

              setLoading(null);
            }
          });
        }
      });
    });
  }, [selectedYear]); // إعادة التحميل عند تغيير السنة

  // اختيار السنة
  const handleYearChange = (e) => setSelectedYear(e.target.value);

  // باقي الـ charts تبقى مثل ما هي، بس كل البيانات مرتبطة بـ selectedYear

  // تحديد الكاتيجوريز والـ segments
  const categories = [...new Set(categoryRevenueByCustomer.map(d => d.category))];
  const segments = ["Champions", "Loyal", "Regular", "At Risk"];
  const series = segments.map(seg => ({
    name: seg,
    type: "bar",
    stack: "total",
    emphasis: { focus: "series" },
    barWidth: 40,
    itemStyle: {
      borderRadius: [4, 4, 0, 0],
      color: {
        Champions: "#1abc9c",
        Loyal: "#3498db",
        Regular: "#f1c40f",
        "At Risk": "#e74c3c",
      }[seg],
    },
    data: categories.map(catName => {
      const entry = categoryRevenueByCustomer.find(d => d.category === catName && d.segment === seg);
      return entry ? entry.value : 0;
    }),
  }));

  const categorySegmentChart = {
    title: { text: "Revenue by Category & Customer Segment", left: "center", textStyle: { color: "#fff", fontSize: 18, fontWeight: "bold" } },
    tooltip: {
      trigger: "axis", axisPointer: { type: "shadow" }, formatter: params => {
        let total = params.reduce((sum, p) => sum + p.value, 0);
        let text = `<b>${params[0].axisValue}</b><br/>`;
        params.forEach(p => {
          const percent = ((p.value / total) * 100).toFixed(1);
          text += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:${p.color};"></span>${p.seriesName}: <b>${p.value.toLocaleString()}</b> (${percent}%)<br/>`;
        });
        text += `<hr style="margin:4px 0;border-color:#555"/>Total: <b>${total.toLocaleString()}</b>`;
        return text;
      }
    },
    legend: { data: segments, top: 50, textStyle: { color: "#ccc" } },
    grid: { top: "20%", left: "5%", right: "5%", bottom: "10%", containLabel: true },
    xAxis: { type: "category", data: categories, axisLabel: { fontSize: 13, color: "#ccc", interval: 0, rotate: 0, formatter: val => val.length > 25 ? val.slice(0, 25) + "…" : val } },
    yAxis: { type: "value", axisLabel: { color: "#ccc" } },
    series,
  };

  return (
    <div className="dashboard-bg p-4">
       <h1 className="mt-5 mb-3 text-white text-center text-white">Sales Analytics Dashboard</h1>

      <p className="mb-4 text-center text-white">Comprehensive overview of your business performance</p>
      <Row className="mb-4 align-items-center">
        <Col md="auto">
          <h5 style={{ color: "#fff", margin: 0 }}>Filter by Year:</h5>
        </Col>
        <Col md="auto">
          <Form.Select
            value={selectedYear}
            onChange={handleYearChange}
            style={{
              backgroundColor: "#1a1a1aff",
              color: "#ffffff",
              border: "1px solid #007bff",
              borderRadius: "8px",
              padding: "8px 12px",
              fontWeight: "500",
              fontSize: "16px",
              width: "200px",
              cursor: "pointer",
            }}
          >
            <option value="" disabled hidden>Filter by Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Form.Select>
        </Col>

        <Col md="auto" className="ms-auto">
          <Link to={'/profile'}
            style={{
              backgroundColor: "#1a1a1aff",
              color: "#ffffff",
              border: "1px solid #007bff",
              borderRadius: "8px",
              padding: "8px 50px",
              fontWeight: "500",
              fontSize: "16px",
              cursor: "pointer",
              textDecoration:"none"
            }}

          >
            Profile
          </Link>
        </Col>
      </Row>


      {loading && <p>{loading}</p>}
      {!loading && (
        <>



          {/* KPI Cards */}
          <Row className="mb-4">
            {[
              {
                title: (
                  <span>
                    Total Sales <FontAwesomeIcon icon={faMoneyBill1Wave} className="ms-2" style={{ color: "#28a745" }} />
                  </span>
                ),
                value: `${kpis.totalSales.toLocaleString()} JOD`,
                color: "dark",
              },
              {
                title: (
                  <span>
                    Total Quantity <FontAwesomeIcon icon={faBoxOpen} className="ms-3" style={{ color: "#c09e6fff" }} />
                  </span>
                ), value: kpis.totalItems.toLocaleString(), color: "dark"


              },
              {
                title: (
                  <span>
                    Cash Sales<FontAwesomeIcon icon={faMoneyBill} className="ms-3" style={{ color: "#28a745" }} />
                  </span>
                ), value: paymentData.find((d) => d.name === "CASH")?.value.toLocaleString() || 0, color: "dark"
              },
              {
                title: (
                  <span>
                    Bank Sales  <FontAwesomeIcon icon={faCreditCard} className="ms-3" style={{ color: "#007bff" }} />
                  </span>
                ), value: paymentData.find((d) => d.name === "BANK")?.value.toLocaleString() || 0, color: "dark"
              },
            ].map((card, i) => (
              <Col key={i} md={3}>
                <Card className="text-center shadow-sm p-4">
                  <Card.Body>
                    <Card.Title className="fs-6 fw-normal">{card.title}</Card.Title>
                    <Card.Text className={`text-${card.color} fs-6 fw-bold mt-3`}>
                      {card.value}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Sales by Month */}

          <div className='cardd'>
            <Row className="my-5">
              <Col md={12}> {/* بدل md={6}، هيبقى أعرض */}
                <ReactECharts
                  style={{ height: 400, width: '100%', marginBottom: 30 }} // full width للعمود
                  option={{

                    title: {
                      text: "Sales & Quantity by Month",
                      left: "center",
                      top: 10,
                      textStyle: {
                        color: "#fff", // العنوان أبيض
                      },
                    },
                    tooltip: { trigger: "axis" },
                    legend: {
                      data: ["Total Sales", "Total Quantity"],
                      top: 50,
                      textStyle: {
                        color: "#fff", // العنوان أبيض
                      },
                    },
                    textStyle: {
                      color: "#fff", // الكتابة في legend أبيض
                    },
                    grid: {
                      left: '5%',   // خلى الجراف يستغل مساحة أكبر
                      right: '5%',
                      bottom: '10%',
                      top: '20%',
                      containLabel: true,
                      backgroundColor: '#ffffffff',
                      borderWidth: 0.7,
                      borderColor: '#ebebebff',
                      show: true,
                    },
                    xAxis: {
                      type: "category",
                      data: salesByMonth.map((d) => d.month),

                      axisLabel: { rotate: 0 },
                      axisLine: { lineStyle: { color: "#333" } },
                      splitLine: { show: false },
                      axisLabel: { color: "#fff" }, // الأرقام / النصوص على المحور X
                      axisLine: { lineStyle: { color: "#fff" } }, // لون خط المحور
                    },
                    yAxis: [
                      {
                        type: "value",
                        name: "Sales (JOD)",
                        splitLine: { show: false },
                        axisLabel: { color: "#fff" }, // الأرقام / النصوص على المحور X
                        axisLine: { lineStyle: { color: "#fff" } }, // لون خط المحور

                      },
                      {
                        type: "value",
                        name: "Quantity",
                        splitLine: { show: true },
                        axisLabel: { color: "#fff" }, // الأرقام / النصوص على المحور X
                        axisLine: { lineStyle: { color: "#fff" } }, // لون خط المحور

                      },

                    ],
                    series: [
                      {
                        name: "Total Sales",
                        type: "line",
                        data: salesByMonth.map((d) => d.value),
                        yAxisIndex: 0,
                        smooth: true,
                        color: "#007bff",
                      },
                      {
                        name: "Total Quantity",
                        type: "line",
                        data: qtyByMonth.map((d) => d.value),
                        yAxisIndex: 1,
                        smooth: true,
                        color: "#16b242ff",
                      },
                    ],
                  }}
                />
              </Col>
            </Row>




            <Row className="mb-4">
              {/* Top Categories - Vertical Bar */}
              <Col md={9}>
                <ReactECharts
                  style={{ height: 500, marginBottom: 30 }} // زيادة الارتفاع
                  option={{
                    title: {
                      text: "Top 10 Categories in Sales",
                      left: "center",
                      textStyle: {
                        color: "#fff", // العنوان أبيض
                      },
                    },
                    tooltip: { trigger: "axis" },
                    grid: {
                      bottom: 80,   // أقل شويه من قبل
                      left: '10%',
                      right: '5%',
                      containLabel: true,
                    },
                    xAxis: {

                      type: "category",

                      data: topCategories.map((d) => d.name),
                      axisLabel: {
                        rotate: 45,
                        fontSize: 12,
                        interval: 0,
                        color: "#fff", // الأرقام / النصوص على المحور X
                        lineStyle: { color: "#fff" }, // لون خط المحور
                      },
                    },
                    yAxis: {
                      type: "value",
                      axisLabel: { color: "#fff" }, // الأرقام / النصوص على المحور X
                      axisLine: { lineStyle: { color: "#fff" } }, // لون خط المحور
                    },
                    series: [
                      {
                        data: topCategories.map((d) => d.value),
                        type: "bar",
                        itemStyle: { color: "#007bff" },
                        barWidth: "40%",
                        barGap: '30%',
                        barCategoryGap: '30%',
                        label: {
                          show: true,
                          position: "top",
                          distance: 2,
                          fontSize: 13,
                          fontWeight: "bold",
                          color: "#ffffffff",
                          formatter: (val) => {
                            const value = val.value;
                            if (value >= 1000) return (value / 1000).toFixed(1) + "K";
                            return value.toLocaleString();
                          },
                        },
                      },
                    ],
                  }}
                />
              </Col>
              <Col md={3}>
                <ReactECharts
                  style={{ height: 400, marginBottom: 50 }}
                  option={{
                    title: {
                      text: "Sales by Payment Method",
                      left: "center",
                      textStyle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
                    },
                    tooltip: { trigger: "item" },
                    legend: { bottom: 55, textStyle: { color: "#fff" } },
                    color: ["#FFA500", "#3498db"], // Cash برتقالي، Bank أزرق فاتح
                    series: [
                      {
                        name: "Sales",
                        type: "pie",
                        radius: ["40%", "70%"],
                        data: paymentData,
                        label: {
                          show: true,
                          position: "inside", // داخل الـ slice
                          fontSize: 14,
                          fontWeight: "bold",
                          color: "#fff",
                          formatter: (params) => {
                            // الاسم فوق القيمة والنسبة
                            return `${params.name}`;
                          },
                        },
                        labelLine: { show: true, length: 15, length2: 10 },
                      },
                    ],
                  }}
                />
              </Col>



            </Row>





            <div className="row">
              {/* New: Sales Over Years */}
              <Col md={6}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Sales Over Years", left: "center", textStyle: { color: "#fff" } },
                    xAxis: { type: "category", data: salesByYear.map((d) => d.year), axisLabel: { color: "#fff" } },
                    yAxis: { type: "value", axisLabel: { color: "#fff" } },
                    series: [{ type: "bar", data: salesByYear.map((d) => d.value), itemStyle: { color: "#007bff" } }],
                  }}
                />
              </Col>
              {/* Total Orders by Month chart */}
              <Col md={6}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Total Orders by Month", left: "center", textStyle: { color: "#fff" } },
                    tooltip: { trigger: "axis" },
                    xAxis: { type: "category", data: totalOrdersByMonth.map(d => d.month), axisLabel: { color: "#fff" } },
                    yAxis: { type: "value", axisLabel: { color: "#fff" } },
                    series: [{ name: "Total Orders", type: "line", data: totalOrdersByMonth.map(d => d.totalOrders), smooth: true, color: "#ff5733" }]
                  }}
                />
              </Col>

            </div>

            {/* New: Top 10 Products */}
            <Row className="my-5">
              <Col md={12}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Top 10 Products", left: "center", textStyle: { color: "#fff" } },
                    xAxis: { type: "category", data: topProducts.map((d) => d.name), axisLabel: { rotate: 30, color: "#fff" } },
                    yAxis: { type: "value", axisLabel: { color: "#fff" } },
                    series: [{ type: "bar", data: topProducts.map((d) => d.value), itemStyle: { color: "#4caf50" } }],
                  }}
                />
              </Col>
            </Row>

            {/* New: Repeat vs New Customers */}
            <Row className="my-5">
              <Col md={12}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Customer Retention", left: "center", textStyle: { color: "#fff" } },
                    tooltip: { trigger: "axis" },
                    legend: { data: ["New", "Repeat"], textStyle: { color: "#fff" } },
                    xAxis: { type: "category", data: repeatVsNew.map((d) => d.month), axisLabel: { color: "#fff" } },
                    yAxis: { type: "value", axisLabel: { color: "#fff" } },
                    series: [
                      { name: "New", type: "bar", stack: "customers", data: repeatVsNew.map((d) => d.new), itemStyle: { color: "#ffb01cff" } },
                      { name: "Repeat", type: "bar", stack: "customers", data: repeatVsNew.map((d) => d.repeat), itemStyle: { color: "#5ba4f1ff" } },
                    ],
                  }}
                />
              </Col>
            </Row>
            {/* Average Order Value by Month */}
            <Row className="my-5">
              <Col md={12}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Average Order Value by Month", left: "center", textStyle: { color: "#fff" } },
                    tooltip: { trigger: "axis" },
                    xAxis: { type: "category", data: avgOrderValueByMonth.map(d => d.month), axisLabel: { color: "#fff" } },
                    yAxis: { type: "value", axisLabel: { color: "#fff" } },
                    series: [{ name: "Average Order Value", type: "line", data: avgOrderValueByMonth.map(d => d.avg), smooth: true, color: "#ff5733" }]
                  }}
                />
              </Col>
            </Row>
            {/* Treemap */}
            <ReactECharts
              style={{ height: 600 }}
              option={{
                title: {
                  text: "Sub-Categories by Sales",
                  textStyle: { color: "#fff" }
                },
                tooltip: {
                  trigger: "item",
                  formatter: ({ name, value }) => `${name}: ${value.toLocaleString()}`
                },
                series: [{
                  type: "treemap",
                  roam: true,
                  nodeClick: false,
                  breadcrumb: { show: false },
                  data: treemapData.map(cat => ({
                    ...cat,
                    // Label للفئة الرئيسية داخل المربع وفي الوسط
                    label: {
                      show: true,
                      position: 'inside',
                      align: 'center',
                      verticalAlign: 'middle',
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#000000ff',
                      formatter: '{b}', // اسم الفئة الرئيسي كامل
                    },
                    children: cat.children.map(sub => ({
                      ...sub,
                      // Label للفئات الفرعية
                      label: {
                        show: true,
                        position: 'inside',
                        align: 'center',
                        verticalAlign: 'middle',
                        fontSize: 11,
                        color: '#000000ff',
                        formatter: (params) => {
                          const maxLength = 1;
                          const words = params.name.split(" ");
                          let lines = [], currentLine = "";
                          words.forEach(word => {
                            if ((currentLine + " " + word).trim().length <= maxLength) {
                              currentLine += " " + word;
                            } else {
                              lines.push(currentLine.trim());
                              currentLine = word;
                            }
                          });
                          if (currentLine) lines.push(currentLine.trim());
                          return lines.join("\n");
                        }
                      }
                    }))
                  })),
                  label: {
                    // fallback عام لو في أي نص بدون children

                    show: true,
                    position: 'inside',
                    align: 'center',
                    verticalAlign: 'middle',
                    fontSize: 15,
                    color: '#000000ff',
                  }
                }]
              }}
            />




            {/* Customers Over Time by Month */}
            <Row className="my-5">
              <Col md={12}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Customers Over Months", left: "center", textStyle: { color: "#fff" } },
                    tooltip: { trigger: "axis", formatter: (params) => `${params[0].axisValue}<br/>Count of Customers: ${params[0].data}` },
                    xAxis: { type: "category", data: customersByMonth.map(d => d.month), axisLabel: { color: "#fff" } },
                    yAxis: { type: "value", axisLabel: { color: "#fff" } },
                    series: [{
                      type: "line",
                      data: customersByMonth.map(d => d.count),
                      smooth: true,
                      symbol: 'circle',
                      symbolSize: 8,
                      itemStyle: { color: "#f39c12" }
                    }]
                  }}
                />
              </Col>
            </Row>

            {/* Customer Category Distribution */}
            <Row className="my-5">
              {/* Customer Segments */}
              <Col md={6}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Customer Segments", left: "center", top: 0, textStyle: { color: "#fff", fontSize: 20 } },
                    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
                    legend: { bottom: 7, textStyle: { color: "#fff" } },
                    series: [{
                      type: "pie",
                      radius: ["45%", "70%"],
                      data: ["Champions", "Loyal", "Regular", "At Risk"].map(name => {
                        const seg = customerSegments.find(s => s.name === name) || { value: 0 };
                        return {
                          name,
                          value: seg.value || 0,
                          itemStyle: {
                            color: {
                              Champions: "#1abc9c",
                              Loyal: "#3498db",
                              Regular: "#f1c40f",
                              "At Risk": "#e74c3c",
                            }[name]
                          }
                        };
                      }),
                      label: { formatter: "{b}: {c} ({d}%)", color: "#fff" },
                      emphasis: { itemStyle: { shadowBlur: 0, shadowOffsetX: 0, shadowColor: "transparent" } }
                    }]
                  }}
                />
              </Col>

              {/* Sales by Customer Type */}

              <Col md={6}>
                <ReactECharts
                  style={{ height: 400 }}
                  option={{
                    title: { text: "Sales by Customer Type", left: "center", top: 0, textStyle: { color: "#fff", fontSize: 20 } },
                    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
                    legend: { bottom: 7, textStyle: { color: "#fff" } },
                    series: [{
                      type: "pie",
                      radius: ["45%", "70%"],
                      data: ["Champions", "Loyal", "Regular", "At Risk"].map(name => {
                        const seg = salesBySegment.find(s => s.name === name) || { value: 0 };
                        return {
                          name,
                          value: seg.value || 0,
                          itemStyle: {
                            color: {
                              Champions: "#1abc9c",
                              Loyal: "#3498db",
                              Regular: "#f1c40f",
                              "At Risk": "#e74c3c",
                            }[name]
                          }
                        };
                      }),
                      label: { formatter: "{b}: {c} ({d}%)", color: "#fff" },
                      emphasis: { itemStyle: { shadowBlur: 0, shadowOffsetX: 0, shadowColor: "transparent" } }
                    }]

                  }}
                />
              </Col>

            </Row>



            {/* Category Revenue by Customer Segment */}
            <Row className="my-5">
              <Col md={12}>
                <ReactECharts
                  style={{ height: 500 }}
                  option={categorySegmentChart}
                />
              </Col>
            </Row>
          </div>












        </>
      )}
    </div>
  );
}
