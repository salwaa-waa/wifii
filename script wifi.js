
const wifiNetworks = [
  { name: "HomeNet", signal: 92, security: "WPA2", frequency: "2.4 GHz" },
  { name: "Cafe_Sejahtera", signal: 78, security: "WPA2", frequency: "2.4 GHz" },
  { name: "Universitas-Guest", signal: 64, security: "Terbuka", frequency: "2.4 GHz" },
  { name: "RuangKelas_5G", signal: 58, security: "WPA2", frequency: "5 GHz" },
  { name: "Indomaret_WiFi", signal: 47, security: "WPA2", frequency: "2.4 GHz" },
  { name: "TP-Link_Office", signal: 42, security: "WPA3", frequency: "5 GHz" },
  { name: "Kost_Mawar", signal: 36, security: "WPA2", frequency: "2.4 GHz" },
  { name: "FamilyNet", signal: 28, security: "WPA2", frequency: "5 GHz" }
];

let selectedNetwork = 0;

const wifiList = document.getElementById("wifiList");
const networkDetail = document.getElementById("networkDetail");
const passwordList = document.getElementById("passwordList");
const generateButton = document.getElementById("generateButton");

// Menampilkan semua jaringan Wi-Fi dummy
function renderWifiList() {
  wifiList.innerHTML = "";

  wifiNetworks.forEach((wifi, index) => {
    const button = document.createElement("button");

    button.className =
      "wifi-item" + (index === selectedNetwork ? " active" : "");

    button.setAttribute(
      "aria-pressed",
      String(index === selectedNetwork)
    );

    const icon = document.createElement("span");
    icon.className = "wifi-icon";
    icon.textContent = "⌁";

    const info = document.createElement("span");
    info.className = "wifi-info";

    const name = document.createElement("span");
    name.className = "wifi-name";
    name.textContent = wifi.name;

    const signal = document.createElement("span");
    signal.className = "wifi-signal";
    signal.textContent =
      `${wifi.security === "Terbuka" ? "◉" : "🔒"} Sinyal: ${wifi.signal}%`;

    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "›";

    info.append(name, signal);
    button.append(icon, info, arrow);

    button.addEventListener("click", () => {
      selectedNetwork = index;
      renderWifiList();
      renderNetworkDetail();
      generatePasswords();
    });

    wifiList.appendChild(button);
  });
}

// Menampilkan detail jaringan yang dipilih
function renderNetworkDetail() {
  const wifi = wifiNetworks[selectedNetwork];

  networkDetail.innerHTML = "";

  const banner = document.createElement("div");
  banner.className = "network-banner";

  const heading = document.createElement("div");
  heading.className = "network-heading";

  const icon = document.createElement("span");
  icon.className = "large-icon";
  icon.textContent = "⌁";

  const info = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = wifi.name;

  const status = document.createElement("p");
  status.textContent = wifi.security === "Terbuka"
    ? "◉ Jaringan terbuka (simulasi)"
    : "🔒 Jaringan terlindungi (simulasi)";

  info.append(title, status);
  heading.append(icon, info);

  const meta = document.createElement("div");
  meta.className = "network-meta";

  const signal = document.createElement("span");
  signal.className = "meta-pill";
  signal.textContent = `Sinyal: ${wifi.signal}%`;

  const frequency = document.createElement("span");
  frequency.className = "meta-pill";
  frequency.textContent = `Frekuensi: ${wifi.frequency}`;

  meta.append(signal, frequency);
  banner.append(heading, meta);
  networkDetail.appendChild(banner);
}

// Menghasilkan lima contoh password acak untuk demo
function generatePasswords() {
  const wifi = wifiNetworks[selectedNetwork];

  function randomText(length = 5) {
    const chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
  }

  const baseName = wifi.name.replace(/[^a-zA-Z0-9]/g, "");

  const suggestions = [
    `${baseName}@${1000 + Math.floor(Math.random() * 9000)}`,
    `Demo_${randomText()}!${Math.floor(Math.random() * 100)}`,
    `Wifi-${randomText()}#${10 + Math.floor(Math.random() * 90)}`,
    `${randomText(4)}_${randomText(4)}2026`,
    `Sample@${randomText()}${Math.floor(Math.random() * 900 + 100)}`
  ];

  passwordList.innerHTML = "";

  suggestions.forEach((password, index) => {
    const row = document.createElement("div");
    row.className = "password-item";

    const number = document.createElement("span");
    number.className = "password-number";
    number.textContent = index + 1;

    const text = document.createElement("span");
    text.className = "password-text";
    text.textContent = password;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "▢";
    copyButton.title = "Salin contoh password";
    copyButton.setAttribute("aria-label", "Salin contoh password");

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(password);
        copyButton.textContent = "✓";
      } catch {
        window.prompt("Salin contoh password ini:", password);
      }
    });

    row.append(number, text, copyButton);
    passwordList.appendChild(row);
  });
}

// Tombol membuat contoh password baru
generateButton.addEventListener("click", generatePasswords);

// Menjalankan aplikasi
renderWifiList();
renderNetworkDetail();
generatePasswords();
