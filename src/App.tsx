import BulletinContainer from "./bulletin/components/BulletinContainer";
import CouponSidebar from "./coupon/components/CouponSidebar";

export default function App() {
  return (
    <div className="app">
      <main>
        <BulletinContainer />
      </main>
      <CouponSidebar />
    </div>
  );
}