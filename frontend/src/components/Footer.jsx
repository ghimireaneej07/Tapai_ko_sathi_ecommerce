export default function Footer() {
  return (
    <footer className="mt-12 border-t border-herb-200/40 bg-herb-100/55 py-10">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-4 md:grid-cols-4 md:px-8 lg:px-10">
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold text-herb-800">Tapai Ko Sathi</p>
          <p className="text-sm text-herb-900/70">
            Connecting you to the finest local and herbal treasures from Nepal's heartlands.
          </p>
        </div>
        <div>
          <p className="mb-3 font-display text-lg font-bold">Quick Links</p>
          <ul className="space-y-2 text-sm text-herb-900/70">
            <li>About Us</li>
            <li>Shipping Policy</li>
            <li>Privacy</li>
            <li>Track Order</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display text-lg font-bold">Categories</p>
          <ul className="space-y-2 text-sm text-herb-900/70">
            <li>Herbal Health</li>
            <li>Daily Grains</li>
            <li>Local Crafts</li>
            <li>Fresh Produce</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-display text-lg font-bold">Contact</p>
          <ul className="space-y-2 text-sm text-herb-900/70">
            <li>hello@tapaikosathi.com</li>
            <li>+977 123456789</li>
            <li>Kathmandu, Nepal</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 w-full max-w-[1280px] border-t border-herb-200/60 px-4 pt-4 text-sm text-herb-900/60 md:px-8 lg:px-10">
        © 2024 Tapai Ko Sathi. Built for the community.
      </div>
    </footer>
  );
}
