# Bahis Bülteni

Frontend case study kapsamında geliştirilen bahis bülteni ve kupon yönetim uygulaması.

## Kurulum

```bash
npm install
npm start
```

## Kullanılan Teknolojiler

- React 19
- TypeScript
- Redux Toolkit
- Webpack 5
- CSS Modules
- @tanstack/react-virtual

## Teknik Kararlar

### Neden Custom Webpack?

Talimatta Webpack kullanımı özellikle belirtildiği için, hazır bundler çözümleri (Next.js, Vite vb.) yerine proje yapılandırmasını `webpack.config.js` üzerinden manuel olarak yaptım.

### Neden Redux Toolkit?

Talimatta "Context API ya da Redux" seçeneği sunulmuştu. Context API de context value değiştiğinde o context i kullanan tüm bileşenler yeniden render olur. Bu durumda binlerce oran butonu içeren büyük listelerde gereksiz render maliyeti olabilr.

Redux Toolkit ile birlikte selector bazlı state yönetimi kullanarak sadece ilgili state parçasını kullanan bileşenlerin yeniden render olması sağladım.

### Virtualization

3000 maçı DOM'a aynı anda basmak özellikle eski Android cihazlarda tarayıcıyı dondurur. `@tanstack/react-virtual` ile sadece ekranda görünen satırları render ediyorum. Scroll performansını daha da iyileştirmek için tabloda `table-layout: fixed` kullandım. Bu sayede browser kolon genişliklerini her scroll da yeniden hesaplamıyor.

### Sepet Mantığı

Aynı maçtan yalnızca bir oran seçilebilir. Farklı bir oran seçilince önceki otomatik olarak kaldırılır.

### CSS Modules

Styled-components veya emotion gibi CSS-in-JS kütüphaneleri runtime da stil hesaplar. Eski cihazlarda bu ekstra maliyet farkı yaratır. CSS modules ile sıfır runtime overhead le scope lanmış stiller yazabildim.

## Klasör Yapısı

```
src/
├── app/          # Redux store ve type hooks
├── bulletin/     # Bülten: bileşenler, store, type
├── coupon/       # Kupon: bileşenler, store
├── components/   # Ortak ui bileşenleri
├── services/     # API
├── utils/        # Yardımcı fonksiyonlar
├── types/        # API tipleri
└── styles/       # Global stiller ve css değişkenleri
```