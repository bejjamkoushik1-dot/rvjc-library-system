# Open Library from Other Devices

If other phones/laptops **cannot** open the library (e.g. http://10.153.148.72:3000), do these steps **on the PC where the server runs**.

---

## Step 1: Allow the port in Windows Firewall

**Option A – Script (easiest)**  
1. Right-click **`allow-port-firewall.bat`** in this folder.  
2. Click **Run as administrator**.  
3. If Windows asks, click Yes.

**Option B – Manual**  
1. Press **Win + R**, type **wf.msc**, press Enter.  
2. Click **Inbound Rules** → **New Rule…**  
3. Select **Port** → Next.  
4. Select **TCP**, enter **3000** (or 3001 if you use that port) → Next.  
5. Select **Allow the connection** → Next.  
6. Leave all (Domain, Private, Public) checked → Next.  
7. Name: **Library app** → Finish.

---

## Step 2: Same network

- Other devices must use the **same Wi‑Fi** (or same network) as the PC.  
- Guest Wi‑Fi often cannot see the main network; use the main Wi‑Fi.

---

## Step 3: Start the server and use your IP

On the PC:

```cmd
cd "c:\Users\bejja\OneDrive\Desktop\NEW"
npm start
```

On the other device’s browser open: **http://10.153.148.72:3000**  
(Replace with your PC’s IPv4 if different; find it with `ipconfig`.)

---

## Step 4: If it still doesn’t work

- Turn off **VPN** on the PC or the other device and try again.  
- Temporarily turn off **Windows Firewall** (or only the “Private” profile) to test; if it works, the firewall was blocking it—use Step 1 to allow the port instead of leaving the firewall off.
