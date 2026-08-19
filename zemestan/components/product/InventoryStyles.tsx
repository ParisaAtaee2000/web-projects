export function InventoryStyles() {
  return <style>{`
    .inventory-panel{margin-top:34px;border:1px solid var(--line);background:var(--card);padding:24px}
    .inventory-head{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:24px}
    .inventory-title{font-family:'Noto Naskh Arabic',serif;font-size:30px;margin:4px 0 0}
    .inventory-live{font-size:11px;color:var(--pine);white-space:nowrap}
    .inventory-grid{display:flex;flex-direction:column;gap:12px}
    .inventory-row{display:grid;grid-template-columns:70px 1fr 90px;align-items:center;gap:14px}
    .inventory-size{font-weight:700;font-size:14px}
    .inventory-bar{height:10px;background:var(--paper-2);overflow:hidden}
    .inventory-bar span{display:block;height:100%;background:var(--pine);transition:width .35s ease}
    .inventory-stock{font-size:12px;text-align:left}
    .inventory-ok{color:var(--pine)}.inventory-low{color:var(--rust)}.inventory-out{color:#8b8780}
    .inventory-note{border-top:1px solid var(--line);margin-top:20px;padding-top:14px;color:var(--ink-soft);font-size:11px}
    .inventory-color-selector{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:22px}
    .inventory-colors{display:flex;gap:8px;flex-wrap:wrap}
    .size.disabled,.size:disabled{opacity:.35;cursor:not-allowed;text-decoration:line-through}
    .product-info .btn:disabled,.qty-controls button:disabled{opacity:.45;cursor:not-allowed;transform:none}
    @media(max-width:640px){.inventory-head,.inventory-color-selector{align-items:flex-start;flex-direction:column}.inventory-row{grid-template-columns:48px 1fr 76px;gap:10px}.inventory-stock{font-size:10px}.inventory-title{font-size:26px}}
  `}</style>
}
