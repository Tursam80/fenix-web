const topMenus = [
  'Tanımlar',
  'Satış İşlemleri',
  'MİY (CRM)',
  'Satın Alma',
  'Muhasebe',
  'Raporlar',
  'Bilgi İşlem',
  'Fenix POS',
  'Fenix Mobil',
  'Demirbaş'
];

const modules = [
  ['Stok Kartları', 'Mevcut stk tablosundan ürün kartları'],
  ['Cari Hesaplar', 'Mevcut car tablosundan cari bilgiler'],
  ['Satış ve Fatura', 'fat ve fatAyr tabloları'],
  ['Sipariş Yönetimi', 'sip ve sipAyr tabloları'],
  ['POS ve Mağazalar', 'Fenix POS tabloları'],
  ['Kullanıcı ve Yetki', 'usr, UsrPrg ve UsrYetki tabloları']
];

export default function Home() {
  return (
    <main className="shell">
      <header className="titlebar">
        <span className="brand">Fenix Web</span>
        <span>Mevcut Fenix Veritabanı</span>
      </header>

      <nav className="menu" aria-label="Fenix ana menüsü">
        {topMenus.map((menu) => <button key={menu} type="button">{menu}</button>)}
      </nav>

      <section className="workspace">
        <div className="panel">
          <aside className="sidebar">
            <h2>Hızlı Erişim</h2>
            <a href="/api/fenix/connection-test">SQL Bağlantı Testi</a>
            <a href="/api/fenix/schema">Fenix Şema Bilgisi</a>
            <a href="#modules">Modüller</a>
          </aside>

          <div className="content">
            <div className="hero">
              <h1>FENIX</h1>
              <p>Yeni bir ERP değil; mevcut Fenix SQL Server veritabanının web istemcisi.</p>
            </div>

            <div className="cards" id="modules">
              {modules.map(([title, description]) => (
                <article className="card" key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="status">
        <span>Fenix Web v0.1</span>
        <span>SQL Server bağlantısı Vercel ortam değişkenlerinden alınır</span>
      </footer>
    </main>
  );
}
